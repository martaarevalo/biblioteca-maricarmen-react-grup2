import { useState, useEffect } from "react";
import { fetchUserBorrows } from "../services/api";
import Item from "./Item";

export default function HistoryBorrowsPage({ userInfo }) {
  const [userBorrows, setUserBorrows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadUserBorrows = async () => {
      const data = await fetchUserBorrows(userInfo.data.id);
      setUserBorrows(data);
      console.log("userBorrows", data);
    };
    loadUserBorrows();
  }, [userInfo]);

  // Paginador -------------
  const totalItems = userBorrows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = userBorrows.slice(startIndex, endIndex);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    if (page === "...") return;
    setCurrentPage(page);
  };

  // Generar rango de páginas con elipsis
  const getPageRange = () => {
    const range = [];
    const delta = 1; // páginas adyacentes
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        range.push(i);
      } else if (i === left - 1 || i === right + 1) {
        range.push("...");
      }
    }
    return [...new Set(range)];
  };

  const pageRange = getPageRange();

  return (
    <div className="landingPage historyBorrowsPage">
      <div className="catalog-header">
        <h2 className="h2">Historial de préstecs</h2>
      </div>

      <table className="articleTable">
        <thead>
          <tr>
            <th>Estat</th>
            <th>Títol</th>
            <th>Codi Exempñar</th>
            <th>Data de préstec</th>
            <th>Data de retorn</th>
            <th>Data retornat</th>
            <th>Retornat</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((borrow, index) => (
              <Item key={startIndex + index} data={borrow} forPage="borrows" />
            ))
          ) : (
            <tr>
              <td colSpan="7">No hi ha préstecs per mostrar.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginador */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Anterior
          </button>

          {pageRange.map((page, idx) => (
            <button
              key={`${page}-${idx}`}
              onClick={() => handlePageClick(page)}
              disabled={page === "..."}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          ))}

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Següent
          </button>
        </div>
      )}
    </div>
  );
}
