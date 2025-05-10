import React, { useState } from "react";
import { searchItems } from "../../services/api";
import ModalExemplarsList from "./ModalExemplarsList";

export default function SearchByCatalog({ onExemplarSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultsPerPage = 5;

    const handleSearch = async () => {
        setLoading(true);
        const data = await searchItems(query);
        setResults(data);
        setPage(1);
        setLoading(false);
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
        <div className="searchByCatalog">
            {/* Menú de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {/* Progressbar */}
                {loading && (
                    <div className="progress-bar">
                        <div className="progress-indicator"></div>
                    </div>
                )}
                <button className="button" onClick={handleSearch}>Cercar</button>
            </div>

            {/* Tarjetas de resultados */}
            <ul className="articleUl result-list">
                {currentResults.map((item) => (
                    <li key={item.id} onClick={() => handleCardClick(item)}>
                        <h4>{item.titol}</h4>
                        {item.autor && <p>Autor: {item.autor}</p>}
                        <p>Disponibles: {item.disponibles}</p>
                        <p>No disponibles: {item.no_disponibles}</p>
                        <p>Excluits: {item.excluits}</p>
                        <p>De préstec: {item.de_prestec}</p>
                    </li>
                ))}
            </ul>

            {/* Paginador */}
            {results.length > 0 && (
                <div>
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