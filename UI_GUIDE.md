# UI Guide for GitHub User Search App

## Home Page
- Users can enter a GitHub username.
- Clicking "Search" fetches data from the backend.

![Home Page Screenshot](screenshots/home.png)

## User Profile Page
- Displays user details (avatar, username, bio).
- Lists repositories fetched from the API.

![User Profile Screenshot](screenshots/profile.png)

## Repository Details Page
- Clicking a repository shows its description.

![Repo Details Screenshot](screenshots/repo.png)

## Followers Page
- Clicking "View Followers" lists all followers.

![Followers Screenshot](screenshots/followers.png)

## Delete User
- Clicking "Expolres" lists all users.

![Followers Screenshot](screenshots/soft-delete.png)

## Navigation Flow
- Users can go back to the search page anytime.

---

## Notes
- The UI follows a minimal design without CSS frameworks.
- All API calls avoid redundancy (cached results where possible).
