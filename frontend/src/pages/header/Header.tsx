import React, { useState } from "react";
import "./header.css";
import { useFetchUserMutation } from "../../services/api/userApi";
import {
  setCurrentUser,
  setError,
  setLoading,
} from "../../redux/slices/curruserSlice";
import { useAppDispatch } from "../../hooks/useAppStore";

const Header = ({ setExplore }: { setExplore: (value: boolean) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const [searchUser, { isLoading: isSearching, error }] =
    useFetchUserMutation();
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    try {
      dispatch(setLoading(true));
      setExplore(false);
      const userData = await searchUser({ username: trimmedQuery }).unwrap();
      setSearchQuery("");
      dispatch(setCurrentUser(userData));
    } catch (error) {
      dispatch(setError("User not found"));

      console.error("Failed to fetch user:", error);
    }
  };

  return (
    <header className="github-header">
      <div className="header-content">
        <div className="logo-search">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
            className="github-logo"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.04-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search GitHub username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
              style={{
                border: error ? ".7px solid red" : "1px solid #ccc",
                outline: "none",
                padding: "8px",
                borderRadius: "4px",
              }}
            />
            {/* {error && (
              <span style={{ color: "red" }}>
                {"data" in error && error.data
                  ? (error.data as { errors?: { message: string }[] })
                      .errors?.[0]?.message
                  : "An error occurred"}
              </span>
            )} */}
            <button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        <div className="header-actions">
          <button>Pull requests</button>
          <button>Issues</button>
          <button>Marketplace</button>
          <button onClick={() => setExplore(true)}>Explore</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
