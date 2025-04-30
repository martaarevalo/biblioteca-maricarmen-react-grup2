export default function Item({ data, onSelect, forPage }) {
  let content;

  if (forPage === "cataleg") {
    content = (
      <li className="article articleHover" onClick={() => onSelect(data)}>
        <h4 className="h4">{data.titol}</h4>
        <p>
          <strong>Autor:</strong> {data.autor}
        </p>
      </li>
    );
  } else if (forPage === "borrows") {
    const statusClass = data.retornat ? "retornat" : "noRetornat";
    content = (
      <li className={`article ${statusClass}`}>
        <h4 className="h4">{data.titol}</h4>
        <p>
          <strong>Exemplar:</strong> {data.exemplar}
        </p>
        <p>
          <strong>Data de préstec:</strong> {data.data_prestec}
        </p>
        <p>
          <strong>Data de retorn:</strong>{" "}
          {data.data_retorn ? data.data_retorn : "data no disponible"}
        </p>
        <p>
          <strong>Retornat:</strong> {data.retornat ? "sí" : "no"}
        </p>
        <p>
          <strong>Anotacions:</strong>{" "}
          {data.anotacions ? data.anotacions : "cap anotació"}
        </p>
      </li>
    );
  }

  return content;
}
