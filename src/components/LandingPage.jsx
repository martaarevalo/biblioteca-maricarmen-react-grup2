import { useState, useEffect, useCallback } from "react";
import { searchItems } from "../services/api";
import ItemsList from "./ItemsList";
import ItemDetail from "./ItemDetail";
import SearchResults from "./SearchResults";

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        if (value.length >= 3) {
          timeoutId = setTimeout(() => {
            searchItems(value).then((results) => {
              setSearchResults(results.slice(0, 5));
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

  const handleSearch = async () => {
    if (searchTerm.trim().length > 0) {
      setIsLoading(true);
      const results = await searchItems(searchTerm);
      setItems(results);
      setIsLoading(false);
      setSearchTerm("");
    } else {
      setItems([]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div className="landingPage">
      {selectedItem ? (
        <ItemDetail item={selectedItem} onBack={handleBack} />
      ) : (
        <>
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
              <button className="button" onClick={handleSearch}>Cercar</button>
              {isLoading && <progress className="progress" max="200" />}

              <SearchResults results={searchResults} show={showResults} />
            </div>
          </div>
          <ItemsList items={items} onSelectItem={handleSelectItem} />
        </>
      )}
    </div>
  );
}
