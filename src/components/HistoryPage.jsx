import { useState, useEffect } from "react";
import { getUserHistory } from "../services/api";
import { useAppContext } from "../context/AppContext";

export default function HistoryPage() {
  const { userInfo, handleState } = useAppContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo || userInfo.type !== "normal") {
      handleState("landingPage");
      return;
    }

    const fetchHistory = async () => {
      try {
        const data = await getUserHistory();
        setHistory(data);
      } catch (err) {
        setError("Error al cargar el historial de préstecs.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userInfo, handleState]);

  if (!userInfo || userInfo.type !== "normal") {
    return null;
  }

  if (loading) {
    return <div className="loading">Cargando historial...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="history-page">
      <h1>Historial de Préstecs</h1>
      {history.length === 0 ? (
        <p>No tienes préstecs registrados.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de Préstec</th>
              <th>Fecha de Retorno</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.exemplar_title}</td>
                <td>{new Date(item.loan_date).toLocaleDateString()}</td>
                <td>
                  {item.return_date
                    ? new Date(item.return_date).toLocaleDateString()
                    : "Pendiente"}
                </td>
                <td>{item.notes || "Sin notas"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}