# SalesSavvy

SalesSavvy is a full-stack sales demo application: a Spring Boot Java backend (REST controllers, services, JPA-style repositories and entities) paired with a React + Vite frontend. It demonstrates a typical layered architecture (controllers → services → repositories) and provides a starting point for further development, testing, and deployment.

## Table of contents
- [Features](#features)
- [Stack](#stack)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
  - [Run backend (development)](#run-backend-development)
  - [Run frontend (development)](#run-frontend-development)
  - [Build and run production jar](#build-and-run-production-jar)
  - [Run with Docker (example)](#run-with-docker-example)
- [Configuration](#configuration)
- [Testing](#testing)
- [API docs & health](#api-docs--health)
- [Development notes & recommendations](#development-notes--recommendations)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- Spring Boot backend with layered architecture (controller, service, repository, entity, dto).
- React frontend built with Vite.
- Maven wrapper included for consistent builds.
- Dockerfile included for container builds.

## Stack
- Languages: Java (backend), JavaScript / React (frontend)
- Backend: Spring Boot (Maven)
- Frontend: React + Vite
- Build tools: Maven (mvnw), npm / yarn for frontend

## Repository layout
