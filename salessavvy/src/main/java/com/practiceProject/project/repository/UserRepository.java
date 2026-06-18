package com.practiceProject.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practiceProject.project.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    // Find user by username
    Optional<User> findByUsername(String username);

    // Find user by email
    Optional<User> findByEmail(String email);
}
