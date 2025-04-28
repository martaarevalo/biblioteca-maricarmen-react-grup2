import { useState } from "react";
import { searchUsers, makeBorrow } from "../services/api";

function LoanModal({ onClose, title, selectedExemplar, onSuccess }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const usersPerPage = 5;

  const handleInputSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchUser = async () => {
    const foundUsers = await searchUsers(searchQuery);
    setUsers(foundUsers);
    setCurrentPage(1); // Volver a página 1 al buscar
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleBackToSearch = () => {
    setSelectedUser(null);
  };

  const handleMakeBorrow = async () => {
    if (!selectedUser || !selectedExemplar) {
      console.error("No se ha seleccionado un usuario o un ejemplar");
      return;
    }

    console.log(`Realizando préstamo: ${selectedExemplar.id} para el usuario: ${selectedUser.username}`);
    
    
    const success = await makeBorrow(selectedUser.id, selectedExemplar.id);

    if (success) {
      console.log("Préstamo realizado con éxito.");
      onSuccess();
      onClose();
    } else {
      console.error("Hubo un error al realizar el préstamo.");
    }
  }

  // Paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="loan-modal">
      <div className="modalContent">
        <h2>Efectuar Préstec</h2>

        {/* Primera parte: buscador y tabla */}
        {!selectedUser ? (
          <>
            <p>Selecciona l'usuari per fer el préstec</p>

            <div className="search-input">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputSearch}
                placeholder="Cerca un usuari..."
                className="searchInput"
              />
              <button onClick={handleSearchUser}>Cercar</button>
            </div>

            {/* Tabla de usuarios */}
            {currentUsers.length > 0 && (
              <>
                <table className="resultsTable">
                  <thead>
                    <tr>
                      <th>Nom d'usuari</th>
                      <th>Nom</th>
                      <th>Cognom</th>
                      <th>Email</th>
                      <th>Telèfon</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user.id} onClick={() => handleSelectUser(user)} style={{ cursor: "pointer" }}>
                        <td>{user.username}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.telefon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Paginador */}
                <div className="pagination">
                  <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Anterior
                  </button>
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Siguiente
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
            <>
          {/* Segunda parte: usuario seleccionado y ejemplar */}
          <div className="selectedUserView">
            <h3>Usuari seleccionat</h3>
            <p><strong>Nom d'usuari:</strong> {selectedUser.username}</p>
            <p><strong>Nom:</strong> {selectedUser.first_name}</p>
            <p><strong>Cognom:</strong> {selectedUser.last_name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Telèfon:</strong> {selectedUser.telefon}</p>

            <h3>Exemplar seleccionat</h3>
            <p><strong>Títol:</strong> {title}</p>
            <p><strong>Registre:</strong> {selectedExemplar.registre}</p>
            <p><strong>Exclòs Préstec:</strong> {selectedExemplar.exclos_prestec ? 'Sí' : 'No'}</p>
            <p><strong>Baixa:</strong> {selectedExemplar.baixa ? 'Sí' : 'No'}</p>
            {selectedExemplar.centre && (
              <p><strong>Centre:</strong> {selectedExemplar.centre}</p>
            )}
          </div>
          {/* Botón para volver a la búsqueda */}
          <button onClick={handleMakeBorrow}>Acceptar</button>
          <button onClick={handleBackToSearch}>Tornar a la cerca</button>
          </>
        )}

        <button onClick={onClose}>
          Cancel·lar
        </button>
      </div>
    </div>
  );
}

export default LoanModal;