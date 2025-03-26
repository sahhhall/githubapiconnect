# 🚀 GitHub User Management System

This is a **Web App** that interacts with the **GitHub API** to fetch and manage user data. It allows users to search GitHub profiles, store details in a database, find mutual followers, and perform CRUD operations.

## 🛠️ Tech Stack

### Backend:
- **Node.js** (Express.js)
- **PostgreSQL** (Database)
- **TypeORM** (ORM)
- **GitHub API** (Data Source)
- **TypeScript** (for better type safety)

### Frontend:
- **React.js** (with Hooks)
- **Redux** (State Management)
- **CSS** (No UI frameworks used)

---

## ✨ Features

### ✅ **Backend Features**
1. **Fetch and Store GitHub User Data**  
   - Accepts a GitHub username and stores details in PostgreSQL.  
   - If the user already exists in the database, the API doesn’t fetch data again.

2. **Find Mutual Friends (Mutual Followers)**  
   - Identifies users who follow and are followed back by a given user.  
   - Saves them as "friends" in the database.

3. **Search Users**  
   - Search by `username`, `location`, or other profile fields.

4. **Soft Delete a User**  
   - Removes a user from the database without permanently deleting their data.

5. **Update User Details**  
   - Allows partial updates for fields like `location`, `bio`, `blog`.

6. **Sort Users**  
   - Retrieves users sorted by attributes like `followers`, `public_repos`, etc.

### ✅ **Frontend Features**
1. **Search for a GitHub Profile**  
   - A simple input box allows users to search for a GitHub profile.

2. **Display Repositories**  
   - Lists all repositories of a user.

3. **Repository Details Page**  
   - Clicking a repository shows its detailed information.

4. **Followers Page**  
   - Shows followers of the searched user.

5. **Navigate Between Users**  
   - Clicking a follower shows their repositories and profile.

6. **Data Optimization**  
   - No redundant API calls for already-fetched data.

---

## 🔗 API Endpoints

###  Fetch All Users  
`GET /api/users/all` – Get all users from the database.

###  Update User (Partial)  
`PATCH /api/users/:username` – Update fields like `location`, `bio`, etc.

###  Get Sorted Users  
`GET /api/users/sort?sort=followers` – Sort users by followers, public repos, etc.

###  Soft Delete User  
`DELETE /api/users/:username` – Soft delete a user.

###  Search Users  
`GET /api/users?search=xyz` – Search users by username, location, etc.

###  Get Mutual Friends  
`GET /api/users/:username/friends` – Get mutual followers.

###  Create a New User  
`POST /api/users` – Save GitHub user data in the database.

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/githubapiconnect
cd githubapiconnect
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install


Create a .env file in the backend folder:

PORT=3001


DB_HOST=localhost
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=""
FRONTEND_URL=http://localhost:5173
GITHUB_API=https://api.github.com/users


Frontend
VITE_BASE_URL=http://localhost:3001/api/users

4️⃣ Run the Backend
cd backend
npm run dev
5️⃣ Run the Frontend
cd frontend
npm start
---