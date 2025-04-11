function ItemDetail({ item, onBack }) {
  console.log(item)
  return (
    <div className="bookDetail">
      <button onClick={onBack}>Volver</button>
      <h2>{item.titol}</h2>
      <p><strong>Autor:</strong> {item.autor}</p>
      {item.editorial && <p><strong>Editorial:</strong> {item.editorial}</p>}
      {item.ISBN && <p><strong>ISBN:</strong> {item.ISBN}</p>}
    </div>
  );
}

export default ItemDetail;