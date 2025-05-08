import { useEffect, useState } from "react";
import { fetchCatalegDetail } from "../services/api";
import { useAppContext } from "../context/AppContext";
import LoanModal from "./LoanModal";

function ItemDetail({ item, onBack }) {
  const [catalegDetail, setCatalegDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedExemplar, setSelectedExemplar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const { userInfo } = useAppContext();
  console.log(userInfo);

  useEffect(() => {
    const loadCatalegDetail = async () => {
      const data = await fetchCatalegDetail(item.id);
      console.log(item);
      console.log(data);
      setCatalegDetail(data);
      // Reiniciar la página en cada carga
      setCurrentPage(1);
    };

    loadCatalegDetail();
  }, [item.id]);

  const handleBorrow = (exemplar) => {
    setSelectedExemplar(exemplar);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedExemplar(null);
    setShowModal(false);
  };

  const handleUpdateCataleg = async () => {
    const data = await fetchCatalegDetail(item.id);
    setCatalegDetail(data);
  };

  // Computar el total de páginas y los exemplars a mostrar en la página actual
  const totalExemplars = catalegDetail.exemplars ? catalegDetail.exemplars.length : 0;
  const totalPages = Math.ceil(totalExemplars / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentExemplars = catalegDetail.exemplars
    ? catalegDetail.exemplars.slice(startIndex, startIndex + rowsPerPage)
    : [];

  return (
    <div className="bookDetail">
      <div className="catalegHeader">
        <button className="button" onClick={onBack}>Tornar</button>
        <h2 className="h2">{item.titol}</h2>
      </div>
      
      {/* Detalls generals del item */}
      <section className="catalegSection">
        {catalegDetail.titol_original && <p><strong>Títol original:</strong> {catalegDetail.titol_original}</p>}
        {catalegDetail.autor && <p><strong>Autor:</strong> {catalegDetail.autor}</p>}
        {catalegDetail.CDU && <p><strong>CDU:</strong> {catalegDetail.CDU}</p>}
        {catalegDetail.signatura && <p><strong>Signatura:</strong> {catalegDetail.signatura}</p>}
        {catalegDetail.data_edicio && <p><strong>Data d'edició:</strong> {catalegDetail.data_edicio}</p>}
        {catalegDetail.resum && <p><strong>Resum:</strong> {catalegDetail.resum}</p>}
        {catalegDetail.anotacions && <p><strong>Anotacions:</strong> {catalegDetail.anotacions}</p>}
        {catalegDetail.mides && <p><strong>Mides:</strong> {catalegDetail.mides}</p>}
        {catalegDetail.tags && catalegDetail.tags.length > 0 && (
          <p>
            <strong>Tags:</strong> {catalegDetail.tags.join(', ')}
          </p>
        )}
      </section>

      {/* Detalls de subclase */}
      {catalegDetail.subclass && (
        <>
          <h3 className="h3 subclassTitle">Subclase: {catalegDetail.subclass.type}</h3>
          <section className="catalegSection">
            {catalegDetail.subclass.type === "Llibre" && (
              <>
                <p><strong>ISBN:</strong> {catalegDetail.subclass.ISBN}</p>
                <p><strong>Editorial:</strong> {catalegDetail.subclass.editorial}</p>
                <p><strong>Col·lecció:</strong> {catalegDetail.subclass.colleccio}</p>
                <p><strong>Lloc:</strong> {catalegDetail.subclass.lloc}</p>
                <p><strong>País:</strong> {catalegDetail.subclass.pais}</p>
                <p><strong>Llengua:</strong> {catalegDetail.subclass.llengua}</p>
                <p><strong>Número:</strong> {catalegDetail.subclass.numero}</p>
                <p><strong>Volums:</strong> {catalegDetail.subclass.volums}</p>
                <p><strong>Pàgines:</strong> {catalegDetail.subclass.pagines}</p>
                {catalegDetail.subclass.info_url && (
                  <p>
                    <strong>Info URL:</strong> <a href={catalegDetail.subclass.info_url}>{catalegDetail.subclass.info_url}</a>
                  </p>
                )}
                {catalegDetail.subclass.preview_url && (
                  <p>
                    <strong>Preview URL:</strong> <a href={catalegDetail.subclass.preview_url}>{catalegDetail.subclass.preview_url}</a>
                  </p>
                )}
                {catalegDetail.subclass.thumbnail_url && (
                  <p>
                    <strong>Thumbnail URL:</strong> <a href={catalegDetail.subclass.thumbnail_url}>{catalegDetail.subclass.thumbnail_url}</a>
                  </p>
                )}
              </>
            )}

            {catalegDetail.subclass.type === "Revista" && (
              <>
                <p><strong>ISSN:</strong> {catalegDetail.subclass.ISSN}</p>
                <p><strong>Editorial:</strong> {catalegDetail.subclass.editorial}</p>
                <p><strong>Lloc:</strong> {catalegDetail.subclass.lloc}</p>
                <p><strong>País:</strong> {catalegDetail.subclass.pais}</p>
                <p><strong>Llengua:</strong> {catalegDetail.subclass.llengua}</p>
                <p><strong>Número:</strong> {catalegDetail.subclass.numero}</p>
                <p><strong>Volums:</strong> {catalegDetail.subclass.volums}</p>
                <p><strong>Pàgines:</strong> {catalegDetail.subclass.pagines}</p>
              </>
            )}

            {catalegDetail.subclass.type === "CD" && (
              <>
                <p><strong>Discogràfica:</strong> {catalegDetail.subclass.discografica}</p>
                <p><strong>Estil:</strong> {catalegDetail.subclass.estil}</p>
                <p><strong>Duració:</strong> {catalegDetail.subclass.duracio}</p>
              </>
            )}

            {catalegDetail.subclass.type === "DVD" && (
              <>
                <p><strong>Productora:</strong> {catalegDetail.subclass.productora}</p>
                <p><strong>Duració:</strong> {catalegDetail.subclass.duracio}</p>
              </>
            )}

            {catalegDetail.subclass.type === "BR" && (
              <>
                <p><strong>Productora:</strong> {catalegDetail.subclass.productora}</p>
                <p><strong>Duració:</strong> {catalegDetail.subclass.duracio}</p>
              </>
            )}

            {catalegDetail.subclass.type === "Dispositiu" && (
              <>
                <p><strong>Marca:</strong> {catalegDetail.subclass.marca}</p>
                <p><strong>Model:</strong> {catalegDetail.subclass.model}</p>
              </>
            )}
          </section>
        </>
      )}

      {/* Detalls dels exemplars */}
      <div id="exemplars">
        <header className="exemplarsHeader">
          <h3 className="h3 subclassTitle">Exemplars</h3>
          <ul className="divDetailCountExemplar">
            <li className="prevExemplar disponibles">Disponibles: {item.disponibles}</li>
            <li className="prevExemplar no-disponibles">No disponibles: {item.no_disponibles}</li>
            <li className="prevExemplar excluits">Excluits: {item.excluits}</li>
            <li className="prevExemplar baixa">De baixa: {item.de_baixa}</li>
          </ul>
        </header>
        <section className="catalegSection">
          {totalExemplars > 0 ? (
            <>
              <table className="catalegDetail exemplarsList">
                <thead>
                  <tr>
                    <th>Estat</th>
                    <th>Registre</th>
                    <th>Exclòs Préstec</th>
                    <th>Està prestat actualment</th>
                    <th>Centre</th>
                    {userInfo?.type === "staff" && <th>Efectuar préstec</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentExemplars.map((exemplar) => (
                    <tr key={exemplar.id}>
                      <td>
                        <span className={
                          (!exemplar.en_prestec && !exemplar.exclos_prestec)
                            ? "status disponible"
                            : "status no-disponible"
                        }>
                          {(!exemplar.en_prestec && !exemplar.exclos_prestec)
                            ? "disponible"
                            : "no disponible"}
                        </span>
                    </td>
                      <td>{exemplar.registre}</td>
                      <td>{exemplar.exclos_prestec ? 'Sí' : 'No'}</td>
                      <td>{exemplar.en_prestec ? 'Sí' : 'No'}</td>
                      <td>{exemplar.centre || '-'}</td>
                      {userInfo?.type === "staff" && (
                        <td className="centeredCell">
                          {!exemplar.en_prestec && !exemplar.exclos_prestec && exemplar.centre === userInfo?.data.centre ? (
                            <button className="button" onClick={() => handleBorrow(exemplar)}>
                              Efectuar préstec
                            </button>
                          ) : (
                            'Préstec no disponible'
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  className="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`button ${currentPage === index + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            <p>No hi ha exemplars disponibles.</p>
          )}
        </section>
      </div>
      
      {/* Modal */}
      {showModal && (
        <LoanModal 
          onClose={handleCloseModal}
          title={catalegDetail.titol}
          selectedExemplar={selectedExemplar}
          onSuccess={handleUpdateCataleg}
        />
      )}

    </div>
  );
}

export default ItemDetail;