import { useState } from "react";
import { handlePrint } from "../../services/api";

export default function AsideListCode({ exemplarsList, setExemplarsList }) {
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

  const handleRemove = (indexToRemove) => {
    const updatedList = exemplarsList.filter((_, index) => index !== indexToRemove);
    setExemplarsList(updatedList);
  };

  const imprimirPDF = () => {
    const centre = exemplarsList.length > 0 ? exemplarsList[0].centre : "Biblioteca";
    handlePrint(centre, exemplarsList);
  };

  return (
    <main className="asideListCode">
      {console.log(exemplarsList)}
      <h3 className="h3">Exemplars sel·leccionats</h3>
      <button className="button" onClick={imprimirPDF}>Imprimir PDF</button>
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
            <button
              className="button remove-button"
              onClick={() => handleRemove(startIndex + index)}
            >
              Eliminar
            </button>
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