import BookItem from "./BookItem";

function BookList({ books, onSelectItem }) {
  if (!books || books.length === 0) return null;

  return (
    <ul className="articleUl">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onSelect={onSelectItem} />
      ))}
    </ul>
  );
}

export default BookList;