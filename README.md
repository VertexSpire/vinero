# Project Name

## Description

This project is designed to provide a robust authentication system using various social media platforms and JWT authentication. It also includes a logging service using the `winston` library for logging to console, files, HTTP, and MongoDB.

## Table of Contents

- [Project Name](#project-name)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Running the Application](#running-the-application)
    - [Authentication Endpoints](#authentication-endpoints)
  - [Project Structure](#project-structure)
  - [Logging Service](#logging-service)
    - [Console Transporter](#console-transporter)
    - [File Transporter](#file-transporter)
    - [HTTP Transporter](#http-transporter)
    - [MongoDB Transporter](#mongodb-transporter)
  - [License](#license)

## Features

- Local, Google, Facebook, Twitter, GitHub, and JWT authentication
- Robust logging system using `winston` with support for console, file, HTTP, and MongoDB
- Configurable settings for different environments
- User role and permission management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (for logging)
- AWS (for S3 storage if required)
- Docker (optional for containerization)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/VertexSpire/vinero.git
    cd vinero
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Copy the `.env.example` file to `.env` and fill in the required environment variables:
    ```sh
    cp .env.example .env
    ```

## Configuration

The configuration is managed using environment variables defined in the `.env` file. The following variables are required:

- `LOG_LEVEL`: The level of logging (e.g., `info`, `warn`, `error`)
- `ENABLE_LOGGING`: Enable or disable logging (`true` or `false`)
- `ENABLE_CONSOLE_LOGGING`: Enable or disable console logging (`true` or `false`)
- `ENABLE_FILE_LOGGING`: Enable or disable file logging (`true` or `false`)
- `ENABLE_HTTP_LOGGING`: Enable or disable HTTP logging (`true` or `false`)
- `ENABLE_MONGO_LOGGING`: Enable or disable MongoDB logging (`true` or `false`)
- `MONGO_URI`: MongoDB connection string
- `MONGO_COLLECTION`: MongoDB collection for logging

Other environment variables include credentials and endpoints for authentication providers like Google, Facebook, Twitter, and GitHub.

## Usage

### Running the Application

To run the application locally, use the following command:

```sh
npm start

