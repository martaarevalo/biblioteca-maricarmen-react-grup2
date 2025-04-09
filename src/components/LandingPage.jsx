// import { useAppContext } from "../context/AppContext";
import { useState, useEffect, useCallback } from "react";
import { searchBooks } from "../services/api";
import BookList from "./BookList";
import SearchResults from "./SearchResults";

export default function LandingPage() {
  // const { userInfo } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        if (value.length >= 3) {
          timeoutId = setTimeout(() => {
            searchBooks(value).then((results) => {
              setSearchResults(results);
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

  return (
    <div className="landingPage">
      <div className="catalog-header">
        <h2>Catàleg</h2>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Cerca al catàleg..."
            className="search-input"
          />
          <SearchResults 
            results={searchResults} 
            show={showResults} 
          />
        </div>
      </div>
      <BookList />
    </div>
  );
}