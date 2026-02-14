# Project Name

> Add a brief description of what your project does here

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/deepesh-np/blog_api.git
cd blog_api
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
npm run install:all
```

Or install them separately:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Environment Variables Setup

#### Frontend Environment Variables

Create a `.env` file in the `frontend` folder:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000
# or REACT_APP_API_URL=http://localhost:5000 (for Create React App)

# Add other frontend environment variables below:
# VITE_SOME_KEY=your_value_here
```

#### Backend Environment Variables

Create a `.env` file in the `backend` folder:

```env
# Backend Environment Variables
MONGO_URI=mongodb://localhost:27017/your_database_name
port=3000
TOKEN_KEY=your_random_secret_token_key_here```

> ⚠️ **Important**: Never commit `.env` files to version control. They contain sensitive information.

### 4. Run the Application

Start both frontend and backend servers simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend** on `http://localhost:5173`
- **Backend** on `http://localhost:5000` (or your configured port)

## 📁 Project Structure

```
project-root/
├── frontend/           # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
├── backend/           # Backend application
│   ├── src/
│   ├── package.json
│   └── .env           # Backend environment variables (create this)
├── package.json       # Root package.json for running both servers
└── README.md
```

## 🛠️ Available Scripts

### Root Level Scripts

```bash
npm run install:all      # Install dependencies for both frontend and backend
npm run dev             # Run both frontend and backend concurrently
npm run dev:frontend    # Run only frontend
npm run dev:backend     # Run only backend
```

### Frontend Scripts

```bash
cd frontend
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
```

### Backend Scripts

```bash
cd backend
npm start              # Start backend server
npm run dev            # Start backend with nodemon (if configured)
```

## 🔧 Configuration

### Frontend Configuration

- The frontend is configured to connect to the backend API using the `VITE_API_URL` environment variable

### Backend Configuration

- The backend server runs on the port specified in `backend/.env`
- Configure database connections and other services in the `.env` file

## 🌐 API Endpoints

> Document your main API endpoints here

```
GET    /api/endpoint1          - Description
POST   /api/endpoint2          - Description
PUT    /api/endpoint3/:id      - Description
DELETE /api/endpoint4/:id      - Description
```

## 🗄️ Database Setup

> Add instructions for setting up your database

```bash
# Example commands for database setup
# createdb your_database_name
# npm run migrate
# npm run seed
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 🚢 Deployment

> Add deployment instructions here

### Frontend Deployment

```bash
cd frontend
npm run build
# Deploy the 'dist' or 'build' folder to your hosting service
```

### Backend Deployment

```bash
cd backend
# Set production environment variables
# Deploy to your hosting service (Heroku, AWS, etc.)
```

## 📞 Support

For any questions or issues, please open an issue in the repository or contact me directly.

---

⭐ If you find this project useful, please consider giving it a star!
