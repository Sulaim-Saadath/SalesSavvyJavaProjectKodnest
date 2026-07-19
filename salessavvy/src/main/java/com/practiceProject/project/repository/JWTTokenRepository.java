package com.practiceProject.project.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.practiceProject.project.entity.JWTToken;

import jakarta.transaction.Transactional;

public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {
	// Custom query to find by user ID
	@Query("SELECT t FROM JWTToken t WHERE t.user.userId = :userId")
	// Method to return JWTToken object using userId	
	JWTToken findByUserId(@Param("userId") int userId);
	Optional<JWTToken> findByToken(String token);
// @Query() -> this is to write our own custom query
// SELECT t FROM JWTToken t -> “Go to the JWTToken table/entity”
// WHERE t.user.userId = :userId -> Find the token whose user ID matches the given ID.
// t.user.userId
/*
 *  go to token
        access its user
        access that user’s ID
 * */

// :userId -> This is a parameter placeholder
	@Modifying
	@Transactional
	@Query("DELETE FROM JWTToken t WHERE t.user.userId = :userId")
	void deleteByUserId(@Param("userId") int userId);
	
}