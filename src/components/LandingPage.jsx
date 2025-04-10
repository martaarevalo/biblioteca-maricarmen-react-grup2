import { useState, useEffect, useCallback } from "react";
import { searchBooks } from "../services/api";
import BookList from "./BookList";
import SearchResults from "./SearchResults";

export default function LandingPage() {
  // const { userInfo } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [books, setBooks] = useState([]); // Libros que se mostrarán en BookList

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        if (value.length >= 3) {
          timeoutId = setTimeout(() => {
            searchBooks(value).then((results) => {
              setSearchResults(results.slice(0, 5)); // Recomendamos 5 libros
              setShowResults(true);
            });
          }, 1000);
        } else {
          setSearchResults([]);
          setShowResults(false);
        }
      };
    })(),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim().length > 0) {
      searchBooks(searchTerm).then((results) => {
        setBooks(results);
      });
      setSearchTerm(""); 
    } else {
      setBooks([]);
    }
  };

  return (
    <div className="landingPage">
      <div className="catalog-header">
        <h2 className="h2">Catàleg</h2>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Cerca al catàleg..."
            className="search-input"
          />
          <button onClick={handleSearch}>Buscar</button>
          <SearchResults 
            results={searchResults} 
            show={showResults} 
          />
        </div>
      </div>
      <BookList books={books} />
    </div>
  );
}