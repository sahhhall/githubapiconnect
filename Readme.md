# GitHub User Management System

## Tech Stack

### Backend:
- Node.js (Express.js)
- PostgreSQL
- TypeORM
- GitHub API
- TypeScript

### Frontend:
- React.js (with Hooks)
- Redux
- CSS

## Features

### Backend Features
1. **Fetch and Store GitHub User Data**
   - Store GitHub user details in PostgreSQL
   - Prevent redundant data fetching

2. **Find Mutual Friends**
   - Identify mutual followers
   - Save connections in database

3. **User Management**
   - Search users
   - Soft delete functionality
   - Partial user detail updates
   - Sort users by various attributes

### Frontend Features
1. **GitHub Profile Search**
   - Search and display user profiles
   - List user repositories
   - Repository details page
   - Followers exploration
   - Seamless user navigation

## 🔗 API Endpoints

- `GET /api/users/all` - Fetch all users
- `PATCH /api/users/:username` - Update user
- `GET /api/users/sort?sort=followers` - Sort users
- `DELETE /api/users/:username` - Soft delete user
- `GET /api/users?search=xyz` - Search users
- `GET /api/users/:username/friends` - Get mutual friends
- `POST /api/users` - Create new user

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/githubapiconnect
cd githubapiconnect
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Configuration
Create `.env` in backend:
```
PORT=3001
DB_HOST=localhost
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=""
FRONTEND_URL=http://localhost:5173
GITHUB_API=https://api.github.com/users
```

Frontend `.env`:
```
VITE_BASE_URL=backendapi
```

### 4. Run Application
```bash
# B