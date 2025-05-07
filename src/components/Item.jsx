export default function Item({ data, onSelect, forPage }) {
  let content;

  if (forPage === "cataleg") {
    content = (
      
      <li className="article articleHover" onClick={() => onSelect(data)}>
        {console.log(data)}
        <h4 className="h4">{data.titol}</h4>
        <p>
          <strong>Autor:</strong> {data.autor}
        </p>
        <li className="divPrevExemplar">
          {data.disponibles > 0 && <ul className="prevExemplar disponibles">{data.disponibles}</ul>}
          {data.no_disponibles > 0 && <ul className="prevExemplar no-disponibles">{data.no_disponibles}</ul>}
          {data.excluits > 0 && <ul className="prevExemplar excluits">{data.excluits}</ul>}
          {data.de_baixa > 0 && <ul className="prevExemplar baixa">{data.de_baixa}</ul>}
        </li>
      </li>
    );
  } else if (forPage === "borrows") {
    const statusClass = data.retornat ? "retornat" : "noRetornat";
    content = (
      <tr className={`${statusClass}`}>
        <td>
          <span className="statusText">
            {statusClass === "noRetornat" ? "En curs" : "Retornat"}
          </span>
        </td>
        <td>{data.titol}</td>
        <td>{data.exemplar}</td>
        <td>{data.data_prestec}</td>
        <td>{data.data_retorn}</td>
        <td>{data.data_retornat ? data.data_retornat : "---"}</td>
        <td>{data.retornat ? "sí" : "no"}</td>
      </tr>
    );
  }

  return content;
}
