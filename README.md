# SalesSavvy

SalesSavvy is a full-stack sales demo application: a Spring Boot Java backend (REST controllers, services, JPA-style repositories and entities) paired with a React + Vite frontend. It provides a layered example app you can run locally, containerize, test, and extend.

Table of contents
- [Features](#features)
- [Stack](#stack)
- [Repository layout](#repository-layout)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
  - [Run backend (development)](#run-backend-development)
  - [Run frontend (development)](#run-frontend-development)
  - [Build and run production jar](#build-and-run-production-jar)
  - [Run with Docker and docker-compose (example)](#run-with-docker-and-docker-compose-example)
- [Configuration & example files](#configuration--example-files)
  - [Example application.properties (backend)](#example-applicationproperties-backend)
  - [Example .env (frontend)](#example-env-frontend)
- [Testing](#testing)
- [API docs & health endpoints](#api-docs--health-endpoints)
- [CI / GitHub Actions (example)](#ci--github-actions-example)
- [Recommended improvements](#recommended-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features
- Spring Boot backend with layered architecture (controller → service → repository → entity → dto).
- React frontend using Vite for fast development and HMR.
- Maven wrapper included for consistent Java builds.
- Dockerfile included for building a container image.
- Opinionated starting points for validation, mapping, and persistence patterns.

## Stack
- Languages: Java (backend), JavaScript / React (frontend)
- Backend: Spring Boot (Maven)
- Frontend: React + Vite
- Build tools: Maven (mvnw), npm / yarn for frontend
- (Suggested) Observability: Spring Boot Actuator + Micrometer; API docs via springdoc-openapi

## Repository layout
