function Item({ item, onSelect }) {
  return (
    <li className="article articleHover" onClick={() => onSelect(item)}>
      <h4 className="h4">{item.titol}</h4>
      <p>
        <strong>Autor:</strong> {item.autor}
      </p>
    </li>
  );
}

export default Item;
