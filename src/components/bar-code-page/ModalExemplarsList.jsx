import React, { useState, useEffect } from "react";
import { fetchCatalegDetail } from "../../services/api";

export default function ModalExemplarsList({
  item,
  onClose,
  onExemplarSelect,
}) {
  const [catalogDetail, setCatalogDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [localSelectedExemplars, setLocalSelectedExemplars] = useState([]);
  const exemplarsPerPage = 5;

  useEffect(() => {
    if (item && item.id) {
      fetchCatalegDetail(item.id)
        .then((data) => {
          setCatalogDetail(data);
          setCurrentPage(1);
          setLocalSelectedExemplars([]);
        })
        .catch((err) => console.error(err));
    }
  }, [item]);

  if (!catalogDetail) return <div>Loading...</div>;

  const exemplars = catalogDetail.exemplars || [];
  const totalPages = Math.ceil(exemplars.length / exemplarsPerPage);
  const startIndex = (currentPage - 1) * exemplarsPerPage;
  const currentExemplars = exemplars.slice(
    startIndex,
    startIndex + exemplarsPerPage
  );

  const toggleSelection = (exemplar) => {
    const exemplarToAdd = {
      titol: catalogDetail.titol,
      registre: exemplar.registre,
      centre: exemplar.centre,
      CDU: catalogDetail.CDU,
    };

    const exists = localSelectedExemplars.find(
      (sel) => sel.registre === exemplarToAdd.registre
    );
    if (exists) {
      setLocalSelectedExemplars((prev) =>
        prev.filter((sel) => sel.registre !== exemplarToAdd.registre)
      );
    } else {
      setLocalSelectedExemplars((prev) => [...prev, exemplarToAdd]);
    }
  };

  const handleAccept = () => {
    if (onExemplarSelect) {
      localSelectedExemplars.forEach((exemplar) =>
        onExemplarSelect(exemplar)
      );
    }
    onClose();
  };

  return (
    <div className="loan-modal modal-custom">
      <div className="modalContent">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registre</th>
              <th>Exclos Prestec</th>
              <th>En Prestec</th>
              <th>Centre</th>
            </tr>
          </thead>
          <tbody>
            {currentExemplars.map((exemplar) => {
              const isSelected = localSelectedExemplars.some(
                (sel) => sel.registre === exemplar.registre
              );
              return (
                <tr
                  key={exemplar.id}
                  onClick={() => toggleSelection(exemplar)}
                  className={isSelected ? "selected" : ""}
                >
                  <td>{exemplar.id}</td>
                  <td>{exemplar.registre}</td>
                  <td>{exemplar.exclos_prestec ? "Sí" : "No"}</td>
                  <td>{exemplar.en_prestec ? "Sí" : "No"}</td>
                  <td>{exemplar.centre}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
        <div>
          <button onClick={handleAccept}>Aceptar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}