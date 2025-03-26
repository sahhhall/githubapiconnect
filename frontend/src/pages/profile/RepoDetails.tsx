import { Repo } from "../../types/types";
import "./repo.css";

type RepoProps = {
  repo: Repo;
};

const RepoDetails: React.FC<RepoProps> = ({ repo }) => {
  const handleRedirect = () => {
    window.open(repo.html_url, "_blank");
  };

  return (
    <div className="application-card">
      <div className="repo-container-logo">
        <img className="repo-profile" src={repo.owner.avatar_url} alt={repo.owner.login} />
      </div>

      <div className="app-details">
        <h2>Application</h2>
        <h1>{repo.name}</h1>
        <p className="description">{repo.description}</p>

        <div className="app-meta">
          <div className="topics">
            {repo.topics.map((topic, index) => (
              <span key={index} className="topic">{topic}</span>
            ))}
          </div>
        </div>

        <div className="repo-info">
          <p><strong>Owner:</strong> <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer">{repo.owner.login}</a></p>
          <p><strong>Stars:</strong> {repo.stargazers_count}</p>
          <p><strong>Watchers:</strong> {repo.watchers_count}</p>
          <p><strong>Forks:</strong> {repo.forks_count}</p>
          <p><strong>Language:</strong> {repo.language}</p>
          <p><strong>Homepage:</strong> {repo.homepage ? <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Visit</a> : "N/A"}</p>
          <p><strong>Last Updated:</strong> {new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>

        <button className="checkout-btn" onClick={handleRedirect}>
          Check out Repository
        </button>
      </div>
    </div>
  );
};

export default RepoDetails;
