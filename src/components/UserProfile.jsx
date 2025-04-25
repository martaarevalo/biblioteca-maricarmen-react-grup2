import { useState } from "react";
import { updateUserProfile, getUserInfo } from "../services/api";
import { ProfilePanel } from "./ProfilePanel";

export default function UserProfile({ userDetails }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });
  const [currentDetails, setCurrentDetails] = useState({ ...userDetails });

  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);

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
      setStatusMessage("Dades canviades correctament");
      setStatusType("success");
      setIsEditing(false);
      const token = localStorage.getItem("token");
      const updatedDetails = await getUserInfo(token);
      setCurrentDetails(updatedDetails);
    } else {
      setStatusMessage("S'ha produït algun error");
      setStatusType("error");
      setIsEditing(false);
    }

    setTimeout(() => {
      setStatusMessage(null);
      setStatusType(null);
    }, 3000);
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
      statusMessage={statusMessage}
      statusType={statusType}
    />
  );
}