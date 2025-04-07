function BookItem({ book }) {
  return (
    <li className="article articleHover">
      <h3>{book.titol}</h3>
      <p>
        <strong>Autor:</strong> ???
      </p>
    </li>
  );
}

export default BookItem;
