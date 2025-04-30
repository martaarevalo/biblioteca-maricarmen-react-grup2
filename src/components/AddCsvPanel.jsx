import React, { useState } from "react";
import { importCSV } from "../services/api";

export function AddCsvPanel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      const data = await importCSV(selectedFile);
      setMessages(data.feedback || []);
    } catch (error) {
      setMessages(["Error al subir el archivo."]);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h3 className="h3">Importar el teu CSV</h3>
      <div className="upload-container">
        <label htmlFor="fileInput" className="file-name">
          {selectedFile ? selectedFile.name : "Selecciona un arxiu"}
        </label>

        <button
          className="button"
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          style={{ marginLeft: "10px" }}
        >
          {isLoading ? "Procesant..." : "Processar"}

        </button>
        <input
          id="fileInput"
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>
      <div className="status-container">
        {isLoading ? (
          <div className="progress-bar-container">
            <progress max="100"></progress>
          </div>
        ) : (
          messages.map((msg, index) => (
            <p key={index} className="upload-message">
              {msg}
            </p>
          ))
        )}
      </div>
    </div>
  );
}