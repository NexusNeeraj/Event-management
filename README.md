```markdown
# Event Management System - Backend

## Overview

This backend implementation supports the Event Management System, allowing for event creation, user participation management, and waitlist handling. Built with Node.js and Express, it utilizes MongoDB for data storage and provides a RESTful API for interaction.

## Objectives

- Facilitate the creation of events with essential details.
- Manage user participation, including confirmed attendees and waitlisted users.
- Provide endpoints to view participant lists and handle cancellations.

## Technology Stack

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to manage routing and middleware.
- **MongoDB**: NoSQL database for storing event and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB to define schemas and interact with the database.

## API Endpoints

### 1. **Create Event**

- **Endpoint**: `POST /api/events`
- **Request Body**:
  ```json
  {
    "title": "Event Title",
    "description": "Event Description",
    "date": "YYYY-MM-DD",
    "time": "HH:mm",
    "location": "Event Location",
    "maxParticipants": 100
  }
  ```
- **Response**:
  - **Success**: `201 Created` with event details.
  - **Error**: Validation errors with appropriate messages.

### 2. **Join Event**

- **Endpoint**: `POST /api/events/:eventId/join`
- **Request Body**:
  ```json
  {
    "userId": "User ID"
  }
  ```
- **Response**:
  - **Success**: User added to confirmed or waitlist.
  - **Error**: Messages for full events or missing users.

### 3. **Get Event Participants**

- **Endpoint**: `GET /api/events/:eventId/participants`
- **Response**:
  - Returns confirmed list and waitlist for the specified event.

### 4. **Cancel Participation**

- **Endpoint**: `DELETE /api/events/:eventId/participants`
- **Request Body**:
  ```json
  {
    "userId": "User ID"
  }
  ```
- **Response**:
  - **Success**: Confirmation of cancellation.
  - **Error**: Messages if the user is not on the list.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NexusNeeraj/event-management-system-backend.git
   cd event-management-system-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** for your environment variables (e.g., MongoDB connection string).

4. **Start the server**:
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can interact with the API using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/). 

## Challenges

- **Error Handling**: Ensuring proper error messages are returned for various scenarios.
- **Concurrency**: Managing multiple users trying to join or cancel participation simultaneously.
