function ItemDetail({ book, onBack }) {
  console.log(book)
  return (
    <div className="bookDetail">
      <button onClick={onBack}>Volver</button>
      <h2>{book.titol}</h2>
      <p><strong>Autor:</strong> {book.autor}</p>
      {book.editorial && <p><strong>Editorial:</strong> {book.editorial}</p>}
      {book.ISBN && <p><strong>ISBN:</strong> {book.ISBN}</p>}
    </div>
  );
}

export default ItemDetail;