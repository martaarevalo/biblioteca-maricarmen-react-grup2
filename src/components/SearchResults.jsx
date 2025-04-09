import PropTypes from 'prop-types';

const SearchResults = ({ results, show }) => {
  if (!show || results.length === 0) return null;

  return (
    <div className="search-results">
      {results.map((book) => (
        <div key={book.id} className="search-result-item">
          <h4>{book.titol}</h4>
          {book.autor && <p>Autor: {book.autor}</p>}
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      titol: PropTypes.string,
      autor: PropTypes.string
    })
  ).isRequired,
  show: PropTypes.bool.isRequired
};

export default SearchResults;