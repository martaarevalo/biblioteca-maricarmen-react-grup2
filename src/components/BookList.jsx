import { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import BookItem from './BookItem';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  return (
    <ul className="articleUl">
      {books.length > 0 ? (
        books.map((book) => <BookItem key={book.id} book={book} />)
      ) : (
        <p>Cargando libros...</p>
      )}
    </ul>
  );
}

export default BookList;