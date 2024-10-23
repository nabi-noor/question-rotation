# Dynamic Question Assignment System

## Overview
This project implements a dynamic question assignment system using NestJS, TypeORM, Redis, and MySQL. The system assigns questions to users based on their geographical region and a configurable cycle duration. The application is designed to handle scalability for thousands of daily active users (DAU) while ensuring efficient question retrieval and assignment.

### Problem Statement
The goal is to create a question rotation system where:
- Questions are assigned based on a weekly cycle.
- Each region receives a specific set of questions.
- The duration of each cycle is configurable.

## Dependencies

### 1. NestJS
- **Description:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Installation:** 
    ```bash
    npm install @nestjs/core @nestjs/common @nestjs/platform-express
    ```

### 2. TypeORM
- **Description:** An ORM for TypeScript and JavaScript (ES7, ES6, ES5) that supports various SQL databases, including MySQL.
- **Installation:** 
    ```bash
    npm install @nestjs/typeorm typeorm mysql2
    ```

### 3. Redis Cache
- **Description:** Redis is an in-memory data structure store, used as a database, cache, and message broker.
- **Installation:** 
    ```bash
    npm install @nestjs/cache-manager cache-manager-redis-store
    ```

### 4. Schedule Module
- **Description:** A module to schedule tasks in your application (e.g., question assignments).
- **Installation:**
    ```bash
    npm install @nestjs/schedule
    ```

## Solution Overview
The architecture of this application consists of several modules:

- **Question Module:** Responsible for managing questions and their assignments to regions.
- **Region Module:** Handles different user regions and their specific question sets.
- **Cycle Module:** Manages the configuration of the question assignment cycles.
- **Question Assignment Module:** Contains logic to assign questions to users based on the defined cycles and regions.
- **Cron Service:** Used to execute scheduled tasks for question assignment.

The caching layer uses Redis to store the currently assigned question for each region, improving performance by reducing database queries.

### Key Features
- Configurable question assignment cycles.
- Caching for efficient question retrieval.
- Region-specific question sets.
- Scalable design to accommodate thousands of users.

## API Endpoints

### 1. Get Current Question for Region
- **Endpoint:** `GET /questions/current`
- **Description:** Fetches the current question assigned to the specified region.
- **Query Parameters:**
  - `regionId` (number): The ID of the region for which to fetch the question.
- **Response:**
  ```json
  {
    "id": 1,
    "text": "What is the capital of Singapore?",
    "regionId": 1,
    "assignedAt": "2023-10-23T19:00:00Z"
  }


npm install

npm run start
