import { formatDistanceToNow } from "date-fns";
import { ca } from "date-fns/locale";
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
      <tr className={`${statusClass}`}>
        <td>
          <span className="statusText">
            {statusClass === "noRetornat" ? "En curs" : "Retornat"}
          </span>
        </td>
        <td>{data.titol}</td>
        <td>{data.exemplar}</td>
        <td>{data.data_prestec ? (
            <>
              {data.data_prestec}
              <br />
              <span className="time-ago">
                {`Préstec fet ${formatDistanceToNow(new Date(data.data_prestec), {
                  addSuffix: true,
                  locale: ca,
                })}`}
              </span>
            </>
          ) : (
            "---"
          )}</td>
        <td>{data.data_retorn ? (
            <>
              {data.data_retorn}
              <br />
              <span className="time-ago">
                {`Retorn ${formatDistanceToNow(new Date(data.data_retorn), {
                  addSuffix: true,
                  locale: ca,
                })}`}
              </span>
            </>
          ) : (
            "---"
          )}</td>
        <td>{data.data_prestec ? (
            <>
              {data.data_prestec}
              <br />
              <span className="time-ago">
                {`${formatDistanceToNow(new Date(data.data_prestec), {
                  addSuffix: true,
                  locale: ca,
                })}`}
              </span>
            </>
          ) : (
            "---"
          )}</td>
        <td>{data.retornat ? "sí" : "no"}</td>
      </tr>
    );
  }

  return content;
}
