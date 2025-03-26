import { useState } from "react";
import {
  useFetchAllUsersQuery,
  useSoftDeleteUserMutation,
} from "../../services/api/userApi";
import "./explore.css";
import Modal from "../../components/ui/Modal";
const Explore = () => {
  const {
    data: users,
    isLoading,
    isError,
    refetch: refetchUserData,
  } = useFetchAllUsersQuery({});
  const [softDeleteUser] = useSoftDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  const handleDeleteConfirmation = (username: string) => {
    setSelectedUser(username);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await softDeleteUser(selectedUser).unwrap();
      alert("User soft deleted successfully.");
      refetchUserData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Deletion"
        onConfirm={handleDelete}
        confirmText="Delete"
      >
        <p className="modal-body">
          Are you sure you want to soft delete {selectedUser}?
        </p>
        <p className="modal-body">
          This action can be reversed by an administrator.
        </p>
      </Modal>
      <div className="explore-container">
        <h2>Explore Users</h2>
        <ul className="user-list">
          {users?.map((user: any) => (
            <li key={user.username} className="user-item">
              <div className="user-row-avatar">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-details">
                  <h3 style={{ margin: "0" }}>{user.name}</h3>
                  <p>{user.login}</p>
                  <p style={{ margin: "0" }}>
                    {user.bio || "No bio available"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDeleteConfirmation(user.login)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Explore;
