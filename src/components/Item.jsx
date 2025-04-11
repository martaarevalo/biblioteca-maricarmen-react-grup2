function Item({ item, onSelect }) {
  return (
    <li className="article articleHover" onClick={() => onSelect(item)}>
      <h3 className="h4">{item.titol}</h3>
      <p>
        <strong>Autor:</strong> {item.autor}
      </p>
    </li>
  );
}

export default Item;
