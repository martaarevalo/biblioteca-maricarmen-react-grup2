import { useState } from "react";
import { updateUserProfile, getUserInfo } from "../services/api";
import { ProfilePanel } from "./ProfilePanel";

export default function UserProfile({ userDetails }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });
  const [currentDetails, setCurrentDetails] = useState({ ...userDetails });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDetails({ ...currentDetails });
  };

  const handleSave = async () => {
    const success = await updateUserProfile(editedDetails);
    if (success) {
      alert("Perfil actualizado correctamente.");
      setIsEditing(false);
      const token = localStorage.getItem("token");
      const updatedDetails = await getUserInfo(token);
      setCurrentDetails(updatedDetails);
    } else {
      alert("Error al actualizar el perfil.");
    }
  };

  return (
    <ProfilePanel
      className="user-profile-panel" 
      isEditing={isEditing}
      currentDetails={currentDetails}
      editedDetails={editedDetails}
      handleInputChange={handleInputChange}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleSave={handleSave}
    />
  );
}