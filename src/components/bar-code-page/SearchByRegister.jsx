import React, { useState } from "react";
import { fetchExemplarsRange } from "../../services/api";

export default function SearchByRegister({ onExemplarSelect }) {
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    const num1 = parseInt(valor1, 10);
    const num2 = parseInt(valor2, 10);

    if (isNaN(num1) || isNaN(num2)) {
      setError("Por favor ingrese números válidos.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchExemplarsRange(num1, num2);
      setResults(data);
    } catch (err) {
      setError("Error al buscar ejemplares.");
    }
    setLoading(false);
  };

  return (
    <div className="searchByRegister">
      <h2>Buscar exemplars per registre</h2>
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <div>
            <label htmlFor="valor1">Valor 1:</label>
            <input
              type="number"
              id="valor1"
              value={valor1}
              onChange={(e) => setValor1(e.target.value)}
              placeholder="Ingrese el primer número"
            />
          </div>
          <div>
            <label htmlFor="valor2">Valor 2:</label>
            <input
              type="number"
              id="valor2"
              value={valor2}
              onChange={(e) => setValor2(e.target.value)}
              placeholder="Ingrese el segundo número"
            />
          </div>
          {/* Progressbar debajo de los inputs */}
          {loading && (
            <div className="progress-bar">
              <div className="progress-indicator"></div>
            </div>
          )}
          <button className="button" type="submit">Cercar</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <div>
        {results.length > 0 ? (
          <ul className="articleUl">
            {results.map((exemplar, index) => (
              <li
                key={index}
                onClick={() => onExemplarSelect(exemplar)}
              >
                <h3>{exemplar.titol}</h3>
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
        ) : (
          <p>No s'ha trobat cap resultat.</p>
        )}
      </div>
    </div>
  );
}