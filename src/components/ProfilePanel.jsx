import React from "react";

export function ProfilePanel({
  isEditing,
  currentDetails,
  editedDetails,
  handleInputChange,
  handleEdit,
  handleCancel,
  handleSave,
  className,
  statusMessage,
  statusType,
}) {
  return (
    <div className={className}>
      {isEditing ? (
        <>
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
                  <div className="profile-field-value not-allowed disabled">
                    {currentDetails.username}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Nombre</span>
                  <div className="profile-field-value not-allowed disabled">
                    {currentDetails.first_name}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Apellido</span>
                  <div className="profile-field-value not-allowed disabled">
                    {currentDetails.last_name}
                  </div>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Email</span>
                  <div className="profile-field-value not-allowed disabled">
                    {currentDetails.email}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Teléfono</span>
                  <input
                    type="text"
                    name="telefon"
                    value={editedDetails.telefon || ""}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Centro</span>
                  <div className="profile-field-value not-allowed disabled">
                    {currentDetails.centre || "No especificado"}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Ciclo</span>
                  <div className="profile-field-value not-allowed disabled">
                    {currentDetails.cicle || "No especificado"}
                  </div>
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
        </>
      ) : (
        <>
          {statusMessage && (
            <div className={`status-message ${statusType === "success" ? "success" : "error"}`}>
              {statusMessage}
            </div>
          )}
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
                    {currentDetails.telefon || "No especificado"}
                  </div>
                </div>
              </div>
              <div className="profile-row">
                <div className="profile-field">
                  <span className="profile-field-label">Centro</span>
                  <div className="profile-field-value">
                    {currentDetails.centre || "No especificado"}
                  </div>
                </div>
                <div className="profile-field">
                  <span className="profile-field-label">Ciclo</span>
                  <div className="profile-field-value">
                    {currentDetails.cicle || "No especificado"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}