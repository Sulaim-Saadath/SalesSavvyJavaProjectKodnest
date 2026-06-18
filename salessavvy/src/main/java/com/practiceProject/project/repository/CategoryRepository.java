package com.practiceProject.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practiceProject.project.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	Optional<Category> findByCategoryName(String categoryName);
}
