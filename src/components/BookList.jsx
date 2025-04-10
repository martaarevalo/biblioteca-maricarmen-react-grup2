import BookItem from "./BookItem";

function BookList({ books }) {
  if (!books || books.length === 0) return null;

  return (
    <ul className="articleUl">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </ul>
  );
}

export default BookList;