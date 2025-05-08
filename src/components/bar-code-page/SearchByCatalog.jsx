import React, { useState } from "react";
import { searchItems } from "../../services/api";
import ModalExemplarsList from "./ModalExemplarsList";

export default function SearchByCatalog({ onExemplarSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const resultsPerPage = 5;

    const handleSearch = async () => {
        const data = await searchItems(query);
        setResults(data);
        setPage(1);
    };

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // Calcular los elementos de la página actual.
    const startIndex = (page - 1) * resultsPerPage;
    const currentResults = results.slice(startIndex, startIndex + resultsPerPage);
    const totalPages = Math.ceil(results.length / resultsPerPage);

    return (
        <div>
            {/* Menú de búsqueda */}
            <div className="search-menu" style={{ marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ marginRight: "0.5rem", padding: "0.5rem" }}
                />
                <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>Buscar</button>
            </div>

            {/* Tarjetas de resultados */}
            <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {currentResults.map((item) => (
                    <div
                        key={item.id}
                        className="card"
                        onClick={() => handleCardClick(item)}
                        style={{ border: "1px solid #ccc", padding: "1rem", width: "200px", cursor: "pointer" }}
                    >
                        <h4>{item.titol}</h4>
                        {item.autor && <p>Autor: {item.autor}</p>}
                        <p>Disponibles: {item.disponibles}</p>
                        <p>No disponibles: {item.no_disponibles}</p>
                        <p>Excluits: {item.excluits}</p>
                        <p>De préstec: {item.de_prestec}</p>
                    </div>
                ))}
            </div>

            {/* Paginador */}
            {results.length > 0 && (
                <div className="pagination" style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                        Anterior
                    </button>
                    <span>
                        Página {page} de {totalPages}
                    </span>
                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                        Siguiente
                    </button>
                </div>
            )}

            {/* Modal para la lista de exemplars */}
            {showModal && (
                <ModalExemplarsList 
                    item={selectedItem}
                    onClose={() => setShowModal(false)}
                    onExemplarSelect={onExemplarSelect}
                />
            )}
        </div>
    );
}