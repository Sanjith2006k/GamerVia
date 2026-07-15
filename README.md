# GamerVia

GamerVia is a modern web application designed for gaming enthusiasts to explore, search, and track their favorite video games. The platform provides real-time information about trending releases, popular games, and detailed game specifications, along with personalized features like user authentication and wishlist management.

## Features

- **Game Discovery**: Explore lists of trending games, popular titles, and new releases.
- **Search Functionality**: Search for specific games across a large database.
- **Detailed Game Profiles**: View detailed information about individual games, including descriptions, ratings, genres, platforms, screenshots, and more.
- **User Authentication**: Secure signup and login functionality using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Wishlist Management**: Save and track games you want to play.

## Technology Stack

### Client

- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **State Management & Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)

### Server

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) and bcryptjs

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB instance (local or Atlas cluster)

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server directory and configure your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the client directory and set the API base URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the client development server:
   ```bash
   npm run dev
   ```

---

Developed by S Sanjith Kumar
