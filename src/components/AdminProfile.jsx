import { useState } from "react";
import { updateUserProfile, getUserInfo } from "../services/api";
import { ProfilePanel } from "./ProfilePanel";
import { ListUsersPanel } from "./ListUsersPanel";
import { AddCsvPanel } from "./AddCsvPanel";

export default function AdminProfile({ userDetails }) {
  const [selectedOption, setSelectedOption] = useState("perfil");
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });
  const [currentDetails, setCurrentDetails] = useState({ ...userDetails });

  const isSuperAdmin = userDetails.is_superuser;

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

  const renderPanelContent = () => {
    switch (selectedOption) {
      case "perfil":
        return (
          <ProfilePanel
            className="profile-container" 
            isEditing={isEditing}
            currentDetails={currentDetails}
            editedDetails={editedDetails}
            handleInputChange={handleInputChange}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        );
    // case "listarUsuarios":
    //   return <ListUsersPanel />;
      case "añadirCsv":
        return <AddCsvPanel />;
    //   case "adminPanel":
    //     console.log("Admin Panel Clicado");
    //     return ;
      default:
        return (
          <div>
            <h3>Opción actualmente en desarrollo</h3>
          </div>
        );
    }
  };

  return (
    <div className="adminProfile">
      <aside className="adminAside">
        <ul>
          <li
            className={selectedOption === "perfil" ? "selected" : ""}
            onClick={() => setSelectedOption("perfil")}
          >
            Perfil
          </li>
          <li
            className={selectedOption === "listarUsuarios" ? "selected" : ""}
            onClick={() => setSelectedOption("listarUsuarios")}
          >
            Llistar usuaris
          </li>
          <li
            className={selectedOption === "añadirCsv" ? "selected" : ""}
            onClick={() => setSelectedOption("añadirCsv")}
          >
            Afegir CSV
          </li>
          {isSuperAdmin && (
            <li
              className={selectedOption === "adminPanel" ? "selected" : ""}
              onClick={() => setSelectedOption("adminPanel")}
            >
              Admin Panel
            </li>
          )}
        </ul>
      </aside>
      <main className="adminMain">{renderPanelContent()}</main>
    </div>
  );
}
