import { useEffect, useState } from "react";
import { fetchExemplars } from "../services/api";

function ItemDetail({ item, onBack }) {
  const [exemplars, setExemplars] = useState([]);

  useEffect(() => {
    const loadExemplars = async () => {
      const data = await fetchExemplars(item.id);
      setExemplars(data);
    };

    loadExemplars();
  }, [item.id]);

  return (
    <div className="bookDetail">
      <button onClick={onBack}>Volver</button>
      <h2>{item.titol}</h2>
      <p><strong>Autor:</strong> {item.autor}</p>
      {item.editorial && <p><strong>Editorial:</strong> {item.editorial}</p>}
      {item.ISBN && <p><strong>ISBN:</strong> {item.ISBN}</p>}

      <h3>Ejemplares</h3>
      {exemplars.length > 0 ? (
        <ul>
          {exemplars.map((exemplar) => (
            <li key={exemplar.id}>
              <p><strong>Registro:</strong> {exemplar.registre}</p>
              <p><strong>Excluido de préstamo:</strong> {exemplar.exclos_prestec ? "Sí" : "No"}</p>
              <p><strong>Baja:</strong> {exemplar.baixa ? "Sí" : "No"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay ejemplares disponibles.</p>
      )}
    </div>
  );
}

export default ItemDetail;