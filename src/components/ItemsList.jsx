import { useState } from "react";
import Item from "./Item";

export default function ItemsList({ items, onSelectItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!items || items.length === 0) return null;

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => {
    if (page === '...') return;
    setCurrentPage(page);
  };

  // Construir rango de paginación con elipsis
  const getPageRange = () => {
    const range = [];
    const delta = 1; // páginas a mostrar alrededor de la actual
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= left && i <= right)
      ) {
        range.push(i);
      } else if (
        i === left - 1 ||
        i === right + 1
      ) {
        range.push("...");
      }
    }
    return [...new Set(range)];
  };

  const pageRange = getPageRange();

  return (
    <div>
      <ul className="articleUl">
        {currentItems.map((item) => (
          <Item key={item.id} data={item} onSelect={onSelectItem} forPage="cataleg" />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Anterior
          </button>

          {pageRange.map((page, idx) => (
            <button
              key={`${page}-${idx}`}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
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
};
