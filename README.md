# MoviesApp

## Table of contents

- [Development server](#development-server)
  * [1 - Install dependencies](#1-install-dependencies)
  * [2 - Run API server](#2-run-api-server)
  * [3 - Start the application](#3-start-the-application)
  * [4 - Navigate](#4-navigate)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Docker](#docker)
  * [1 - Run API server](#1-run-api-server)
  * [2 - Build the image](#2-build-the-image)
  * [3 - Run the image](#3-run-the-image)
  * [4 - Navigate](#4-navigate-1)
  

## Development server

### 1 - Install dependencies

Run `npm install`

### 2 - Run API server

`npm run start-server`

### 3 - Start the application

Run `npm run start` for a dev server.

The application will automatically reload if you change any of the source files.

### 4 - Navigate

`http://localhost:4200/`

## Build

Run `npm run build` to build the project.

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests.

## Docker

### 1 - Run API server

`npm run start-server`

Please, be sure the dependencies are installed.

### 2 - Build the image

`docker build -t movies-app-image .`

### 3 - Run the image

`docker run --name movies-app-container -d -p 8080:80 movies-app-image`

### 4 - Navigate

`http://localhost:8080/`
