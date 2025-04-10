function BookItem({ book }) {
  return (
    <li className="article articleHover">
      <h3 className="h4">{book.titol}</h3>
      <p>
        <strong>Autor:</strong> {book.autor}
      </p>
    </li>
  );
}

export default BookItem;
