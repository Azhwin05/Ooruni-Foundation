# Ooruni Foundation Platform

A complete full-stack web platform for Ooruni Foundation, featuring a public React website, a Node.js/Express backend API, and a React-based Admin CMS.

## Project Structure

- **`/backend`**: Node.js Express API with MongoDB.
- **`/frontend`**: Public React application (Vite).
- **`/cms`**: Admin Dashboard React application (Vite).

## Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or Atlas URI)

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
# Create .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/ooruni
# JWT_SECRET=your_secret_key
npm run dev
```

Server will start on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Website will start on `http://localhost:5173`.

### 3. CMS Setup

```bash
cd cms
npm install
npm run dev
```

Admin Panel will start on `http://localhost:5174` (or similar port).

## Deployment

### Frontend & CMS (Vercel/Netlify)

1. Build the projects: `npm run build` inside respective folders.
2. Deploy the `dist` folder.
3. Ensure to set environment variables if needed.

### Backend (Render/Railway)

1. Deploy the `backend` folder.
2. Set environment variables (`MONGO_URI`, `JWT_SECRET`).
3. Ensure build command is `npm install` and start command is `node index.js`.

## Features

- **Dynamic Content**: News, Events, and Gallery updated via CMS.
- **Scholarships**: Online application form with Admin review.
- **Donations**: Static payment details page.
- **Environment & Education**: Dedicated pages with detailed initiative info.
- **Bilingual Support**: Basic Tamil headers and content integration.
