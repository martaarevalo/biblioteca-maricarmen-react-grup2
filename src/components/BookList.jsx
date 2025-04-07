import { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import BookItem from './BookItem';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  return (
    <div className="container">
      {books.length > 0 ? (
        books.map((book) => <BookItem key={book.id} book={book} />)
      ) : (
        <p>Cargando libros...</p>
      )}
    </div>
  );
}

export default BookList;
