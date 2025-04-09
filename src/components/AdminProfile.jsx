import { useState } from "react";
import { updateUserProfile, getUserInfo } from "../services/api";

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

      // Llamada para obtener los datos actualizados del usuario
      const token = localStorage.getItem("token");
      const updatedDetails = await getUserInfo(token);
      setCurrentDetails(updatedDetails); // Actualiza los datos mostrados
    } else {
      alert("Error al actualizar el perfil.");
    }
  };

  const renderPanelContent = () => {
    switch (selectedOption) {
      case "perfil":
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
      case "listarUsuarios":
        return <div><h3>Listar Usuarios</h3><p>Aquí se mostrarán los usuarios.</p></div>;
      case "añadirCsv":
        return <div><h3>Añadir CSV</h3><p>Aquí se podrá subir un archivo CSV.</p></div>;
      case "adminPanel":
        return <div><h3>Admin Panel</h3><p>Opciones avanzadas para superadministradores.</p></div>;
      default:
        return <div><h3>Opción no válida</h3></div>;
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
      <main className="adminMain">
        {renderPanelContent()}
      </main>
    </div>
  );
}