# Threat Intelligence Dashboard

This project is a comprehensive Threat Intelligence Dashboard, featuring a **Node.js backend** and a **React + TypeScript frontend**. It enables users to visualize and analyze threat intelligence data efficiently.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [1. Backend Setup (Node.js)](#1-backend-setup-nodejs)
  - [2. Frontend Setup (React + TypeScript)](#2-frontend-setup-react--typescript)
  - [3. API Key Configuration](#3-api-key-configuration)
- [Usage](#usage)
- [License](#license)

---

## Features

- Aggregates and visualizes threat intelligence data.
- Interactive dashboard.
- Modular codebase: Node.js backend, React + TypeScript frontend.
- Secure configuration with `.env` for sensitive data such as API keys.

---

## Project Structure

```
checkpoint_project/
├── backend/           # Node.js backend source
├── frontend/          # React + TypeScript frontend source
├── README.md          # This file
```

---

## Setup Instructions

### 1. Backend Setup (Node.js)

1. **Navigate to Backend Directory:**

   ```bash
   cd checkpoint_project/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   - create `.env` in the `backend` folder and add the following variables:
     ```bash
     # abuseipdb.com
     ABUSEIPDB_API_KEY=<YOUR_API_KEY>
     # ipqualityscore.com
     IPQS_API_KEY=<YOUR_API_KEY>
     ```

4. **Start the Backend Server:**
   ```bash
   # REGULAR RUN
   node server.js
   # in DEBUG MODE
   node --inspect server.js
   ```
   The backend will typically run on `http://localhost:5000` (or as specified in `.env`).

---

### 2. Frontend Setup (React + TypeScript)

1. **Navigate to Frontend Directory:**

   ```bash
   cd checkpoint_project/frontend/src
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend Development Server:**
   ```bash
   npm start
   ```
   The frontend will typically run on `http://localhost:3000`.

---

### 3. API Key Configuration

- **API keys** (such as for threat intelligence feeds or third-party services) should be placed in the `.env` file in the **backend**.
- Never commit your real `.env` file or API keys to version control.
- Example:
  ```
  # abuseipdb.com
  ABUSEIPDB_API_KEY=<YOUR_API_KEY>
  # ipqualityscore.com
  IPQS_API_KEY=<YOUR_API_KEY>
  ```

---

## Usage

Once both the backend and frontend servers are running:

- Access the dashboard at [http://localhost:3000](http://localhost:3000)

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**For any issues or feature requests, please open an issue on the repository.**
