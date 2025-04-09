import { useState } from "react";
import { updateUserProfile, getUserInfo } from "../services/api";

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

      // Llamada para obtener los datos actualizados del usuario
      const token = localStorage.getItem("token");
      const updatedDetails = await getUserInfo(token);
      setCurrentDetails(updatedDetails); // Actualiza los datos mostrados
    } else {
      alert("Error al actualizar el perfil.");
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <label>
            <strong>Nombre de usuario:</strong>
            <input
              type="text"
              name="username"
              value={editedDetails.username}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={editedDetails.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="first_name"
              value={editedDetails.first_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Apellido:</strong>
            <input
              type="text"
              name="last_name"
              value={editedDetails.last_name}
              onChange={handleInputChange}
            />
          </label>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button className="buttonCancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="button" onClick={handleSave}>
              Aceptar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="button"
            onClick={handleEdit}
          >
            Editar
          </button>
          <p>
            <strong>Nombre de usuario:</strong> {currentDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {currentDetails.email}
          </p>
          <p>
            <strong>Nombre:</strong> {currentDetails.first_name}
          </p>
          <p>
            <strong>Apellido:</strong> {currentDetails.last_name}
          </p>
        </div>
      )}
    </div>
  );
}