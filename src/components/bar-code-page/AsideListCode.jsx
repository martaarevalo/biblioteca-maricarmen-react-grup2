import { useState } from "react";

export default function AsideListCode({ exemplarsList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalItems = exemplarsList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = exemplarsList.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <main className="asideListCode">
      {console.log(exemplarsList)}
      <h3 className="h3">Exemplars sel·leccionats</h3>
      <ul>
        {currentItems.map((exemplar, index) => (
          <li key={index}>
            <h4>{exemplar.titol}</h4>
            <p>
              <strong>Registre:</strong> {exemplar.registre}
            </p>
            <p>
              <strong>Centre:</strong> {exemplar.centre}
            </p>
            <p>
              <strong>CDU:</strong> {exemplar.CDU}
            </p>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Següent
          </button>
        </div>
      )}
    </main>
  );
}