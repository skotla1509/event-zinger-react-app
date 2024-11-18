# Event Zinger React Frontend

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Routing](#routing)
- [API Communication](#api-communication)
- [Setting Up and Running Locally](#setting-up-and-running-locally)

---

## Overview
The React frontend for **Event Zinger** is the user-facing component of the ticketing platform. It provides an intuitive and responsive interface for users to browse and purchase event tickets, manage their profiles, and interact with dynamic content fetched from the backend.

- The application is directly connected to the **Node.js server**, leveraging its APIs to fetch and display dynamic content such as event details, comments, and user profiles.

---

## Technologies Used
- **React**: Framework used to build the frontend.
- **Redux**: For state management, ensuring efficient data flow across components.
- **Axios**: For making HTTP requests to the backend Node server.
- **CSS and Bootstrap**: Used for responsive design, ensuring compatibility across different screen sizes and devices.

---

## Folder Structure

The project is organized into modular directories to ensure scalability and maintainability:

```
src/
├── reducers/                  # Manages Redux state for different features of the application, ensuring a centralized and consistent state management approach.
├── services/                  # Handles API interactions with the backend using Axios. Each file corresponds to a specific feature or resource (e.g., users, events).
├── thunks/                    # Implements asynchronous logic for API calls and integrates them into Redux actions.
├── views/                     # Contains React components for different screens and routes. Each screen is implemented as a standalone file, ensuring modularity.
└── App.js                     # Entry point for the React application
```
---

### Detailed Folder Overview

#### **Reducers (`src/reducers/`)**
The `reducers` directory contains Redux reducers that handle state updates for each major feature of the application. Each file corresponds to a specific feature, making state management modular and easy to maintain.

Files in `reducers`:
- `comments-reducer.js`: Manages state for comments, such as adding or fetching comments.
- `events-reducer.js`: Handles state for events, including fetching event lists or details.
- `people-interested-reducer.js`: Tracks the users who have expressed interest in events.
- `search-reducer.js`: Manages state for search functionality.
- `tickets-reducer.js`: Tracks ticket availability and user purchases.
- `users-reducer.js`: Manages state for user authentication and profiles.

Each file defines:
- The initial state for the feature.
- Reducer functions to handle different actions (e.g., fetching data, updating state).
- Action types that correspond to specific state changes.

#### Other Folders (Similar Structure)
The **services**, **thunks**, and **views** directories follow a similar structure. This consistent structure ensures clarity and modularity, making it easy to extend or maintain the application as new features are added.

---
## Routing
Routing is managed using **React Router** and defined in `src/views/index.js`. Below are the routes and their corresponding components:

| **Route**            | **Component**        | **Description**                                                                 |
|-----------------------|----------------------|---------------------------------------------------------------------------------|
| `/`                  | `<Home/>`           | Displays the homepage with event categories.                                   |
| `/profile`           | `<Profile/>`        | Shows the logged-in user's profile.                                            |
| `/profile/:userId`   | `<Profile/>`        | Shows another user's profile based on their ID.                                |
| `/search`            | `<Search/>`         | Allows users to search for events.                                             |
| `/details/:eventId`  | `<Details/>`        | Displays detailed information about a specific event.                          |
| `/login`             | `<Login/>`          | Allows users to log in to their accounts.                                      |
| `/register`          | `<Register/>`       | Allows new users to register an account.                                       |
| `/users`             | `<Users/>`          | Displays a list of all users (admin-only access).                              |

---

## API Communication
The React frontend communicates with the **Node.js backend server** using **Axios** for HTTP requests. Each service file in `src/services` corresponds to a specific feature or resource, managing all API calls for that feature. For example:
- `comments-service.js`: Handles API calls related to comments.
- `events-service.js`: Fetches event data from the backend.
- `users-service.js`: Manages user-related API requests (e.g., login, profile updates).

---

## Setting Up and Running Locally

### 1. Clone the Repositories
Clone both the React frontend and the Node.js backend repositories.

Link to Node.js repository: [Event Zinger Node App](https://github.com/skotla1509/event-zinger-node-app)

### 2. Set Up the Backend Server
Ensure the **Node.js backend server** is set up and running by following the instructions in its [README file](https://github.com/skotla1509/event-zinger-node-app/blob/main/README.md).


### 3. Navigate to the React Directory
```bash
cd event-zinger-react
```

### 4. Install Dependencies
Install all required dependencies using npm:
```bash
npm install
```

### 5. Start the React Development Server
Start the React frontend server:
```bash
npm start
```

The development server will run at:
```bash
http://localhost:3000
```

### 6. Access the Application
Open your browser and navigate to `http://localhost:3000` to access the application. Ensure the backend server is running at `http://localhost:5000` for API communication.

---
