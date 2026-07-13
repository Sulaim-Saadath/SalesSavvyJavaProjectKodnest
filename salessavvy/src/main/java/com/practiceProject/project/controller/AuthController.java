package com.practiceProject.project.controller;


import java.util.HashMap;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.practiceProject.project.dto.LoginRequest;
import com.practiceProject.project.entity.User;
import com.practiceProject.project.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            User user = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
            String token = authService.generateToken(user);

            Cookie cookie = new Cookie("authToken", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // true in production with HTTPS
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60); // 1 hour

            response.addCookie(cookie);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Login successful");
            responseBody.put("role", user.getRole().name());
            responseBody.put("username", user.getUsername());

            return ResponseEntity.ok(responseBody);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request, HttpServletResponse response) {
    	try {
//    		User user = (User) request.getAttribute("authenticatedUser");
//    	System.out.println(user);
//    		authService.logout(user);
    		
    		User user = (User) request.getAttribute("authenticatedUser");

    		if (user == null) {
    		    System.out.println("User is NULL");
    		    return ResponseEntity.status(401)
    		            .body(Map.of("Message", "User not authenticated"));
    		}

    		System.out.println("Authenticated user: " + user.getUsername());

    		authService.logout(user);
    	
    		Cookie cookie = new Cookie("Message", "Logout_Succesfull");
    		cookie.setHttpOnly(true);
    		cookie.setMaxAge(0);
    		cookie.setPath("/");
    		response.addCookie(cookie);
    		
    		Map<String, String> responseBody = new HashMap<String, String>();
    		responseBody.put("Message", "Logout Successful");
    		return ResponseEntity.ok(responseBody);
    	} catch (RuntimeException e) {
    		e.printStackTrace();
    		Map<String, String> errorResponse = new HashMap<String, String>();
    		errorResponse.put("Message", "Logout failed");
    		return ResponseEntity.status(500).body(errorResponse);
    	}
    }
}
