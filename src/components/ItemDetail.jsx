import { useEffect, useState } from "react";
import { fetchCatalegDetail } from "../services/api";
import { useAppContext } from "../context/AppContext";
import LoanModal from "./LoanModal";

function ItemDetail({ item, onBack }) {
  const [catalegDetail, setCatalegDetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedExemplar, setSelectedExemplar] = useState(null);

  const { userInfo } = useAppContext();
  console.log(userInfo);

  useEffect(() => {
    const loadCatalegDetail = async () => {
      const data = await fetchCatalegDetail(item.id);
      console.log(data);
      setCatalegDetail(data);
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
      <h3 className="h3 subclassTitle">Exemplars</h3>
      <section className="catalegSection">
        {catalegDetail.exemplars && catalegDetail.exemplars.length > 0 ? (
          <ul className="catalegDetail.exemplarsList">
            {catalegDetail.exemplars.map((exemplar) => (
              <li key={exemplar.id} className="exemplarItem">
                <p><strong>Registre:</strong> {exemplar.registre}</p>
                <p><strong>Exclòs Préstec:</strong> {exemplar.exclos_prestec ? 'Sí' : 'No'}</p>
                <p><strong>Baixa:</strong> {exemplar.baixa ? 'Sí' : 'No'}</p>
                {exemplar.centre && (
                  <p>
                    <strong>Centre:</strong> {exemplar.centre}
                  </p>
                )}

                {!exemplar.exclos_prestec && 
                  userInfo?.type === "staff" &&
                  exemplar.centre === userInfo?.data.centre && (
                  <button className="button" onClick={() => handleBorrow(exemplar)}>Efectuar préstec</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hi ha exemplars disponibles.</p>
        )}
      </section>
      
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