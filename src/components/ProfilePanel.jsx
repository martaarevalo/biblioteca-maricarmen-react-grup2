import React from "react";

export function ProfilePanel({
  isEditing,
  currentDetails,
  editedDetails,
  handleInputChange,
  handleEdit,
  handleCancel,
  handleSave,
}) {
  return (
    <div>
      {isEditing ? (
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-image-container">
              <img
                src={currentDetails.imatge || "/default_profile.png"}
                alt="Foto de perfil"
                className="profile-image"
              />
            </div>
            <div className="profile-data">
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Nombre de usuario</span>
                  <input
                    type="text"
                    name="username"
                    value={editedDetails.username}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Nombre</span>
                  <input
                    type="text"
                    name="first_name"
                    value={editedDetails.first_name}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Apellido</span>
                  <input
                    type="text"
                    name="last_name"
                    value={editedDetails.last_name}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={editedDetails.email}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Teléfono</span>
                  <input
                    type="text"
                    name="phone"
                    value={editedDetails.phone || ""}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Centro</span>
                  <input
                    type="text"
                    name="center"
                    value={editedDetails.center || ""}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Ciclo</span>
                  <input
                    type="text"
                    name="cycle"
                    value={editedDetails.cycle || ""}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="buttonCancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button className="button" onClick={handleSave}>
              Aceptar
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-content">
            <div className="profile-image-container">
              <img
                src={currentDetails.imatge || "/default_profile.png"}
                alt="Foto de perfil"
                className="profile-image"
              />
              <button className="button profile-edit-button" onClick={handleEdit}>
                Editar
              </button>
            </div>
            <div className="profile-data">
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Nombre de usuario</span>
                  <div className="profile-field-value">
                    {currentDetails.username}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Nombre</span>
                  <div className="profile-field-value">
                    {currentDetails.first_name}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Apellido</span>
                  <div className="profile-field-value">
                    {currentDetails.last_name}
                  </div>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Email</span>
                  <div className="profile-field-value">
                    {currentDetails.email}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Teléfono</span>
                  <div className="profile-field-value">
                    {currentDetails.phone || "No especificado"}
                  </div>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Centro</span>
                  <div className="profile-field-value">
                    {currentDetails.center || "No especificado"}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Ciclo</span>
                  <div className="profile-field-value">
                    {currentDetails.cycle || "No especificado"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}