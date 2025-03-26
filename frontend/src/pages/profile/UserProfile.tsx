import { useState } from "react";
import { BadgeCheck, LoaderIcon, ArrowLeft } from "lucide-react";
import "./userprofile.css";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppStore";
// import { dummyUser } from "../../utill/test.data";
import RepoDetails from "./RepoDetails";
import { useFetchUserMutation } from "../../services/api/userApi";
import {
  setCurrentUser,
  setError,
  setLoading,
} from "../../redux/slices/curruserSlice";

type ProfileSection = "overview" | "followers" | "repo-details";

const UserProfile = () => {
  const [searchUser] = useFetchUserMutation();

  const { currentUser, isLoading } = useAppSelector((state) => ({
    isLoading: state.user.isLoading,
    currentUser: state.user.currentUser,
  }));
  const dispatch = useAppDispatch();

  const [activeSection, setActiveSection] =
    useState<ProfileSection>("overview");
  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  if (!currentUser) {
    return (
      <div className="user-profile-container">
        <p>No user selected. Please search for a GitHub username.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="user-profile-container loading">
        <LoaderIcon className="spinner" size={48} />
        <p>Loading user profile...</p>
      </div>
    );
  }
  const handleUserClick = async (username: string) => {
    try {
      dispatch(setLoading(true));
      const userData = await searchUser({ username }).unwrap();
      dispatch(setCurrentUser(userData));
      setActiveSection("overview");
    } catch (error) {
      dispatch(setError("User not found"));
      console.error("Failed to fetch user:", error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "repo-details":
        return renderRepoDetails();
      case "followers":
        return renderFollowers();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="side-2">
      <div className="marketplace-repos">
        {(currentUser.repos || []).map((repo, index) => (
          <div
            key={index}
            className="marketplace-repo-card"
            onClick={() => {
              setSelectedRepo(repo);
              setActiveSection("repo-details");
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="repo-icon">📂</div>
            <div className="repo-card-header">
              <div className="repo-title">
                <h3 className="repo-name">{repo.name}</h3>
                <BadgeCheck size={16} color="green" />
              </div>
              <p className="repo-description">
                {repo.description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRepoDetails = () => (
    <div className="side-2">
      <button
        className="back-button"
        onClick={() => setActiveSection("overview")}
      >
        <ArrowLeft size={20} />
      </button>
      <RepoDetails repo={selectedRepo as any} />
    </div>
  );

  const renderFollowers = () => (
    <div className="side-2">
      <button
        className="back-button"
        onClick={() => setActiveSection("overview")}
      >
        <ArrowLeft size={20} />
      </button>
      <h2>Followers ({currentUser.user.followers || 0})</h2>
      {currentUser &&
        currentUser.followersList.map((follower, index) => (
          <div
            key={index}
            className="follower-card"
            onClick={() => handleUserClick(follower.login)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={follower.avatar_url}
              alt={`${follower.login}'s avatar`}
              className="follower-avatar"
            />
            <div className="follower-info">
              <h3 style={{ margin: 0 }}>{follower.login}</h3>
              <p style={{ margin: 0 }}>{follower.login || "GitHub User"}</p>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="user-profile-container">
      <div className="side-1">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={currentUser.user.avatar as string}
              alt={`${currentUser.user.name}'s avatar`}
            />
          </div>
          <div className="profile-info">
            <h1>{currentUser.user.name}</h1>
            <p style={{ margin: 0 }}>@{currentUser.user.login}</p>
            <p className="bio">{currentUser.user.bio}</p>
            <div className="profile-stats">
              <div
                className="stat"
                onClick={() => setActiveSection("followers")}
                style={{ cursor: "pointer" }}
              >
                <span style={{ fontSize: "10px" }}>
                  {currentUser.user.followers || 0}
                </span>
                <span style={{ fontSize: "10px", padding: "0 2px" }}>
                  Followers
                </span>
              </div>
            </div>
            <div className="profile-actions">
              <button className="edit-profile">Edit profile</button>
            </div>
          </div>
        </div>
      </div>

      {renderSection()}
    </div>
  );
};

export default UserProfile;
