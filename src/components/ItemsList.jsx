import Item from "./Item";

function ItemsList({ items, onSelectItem }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="articleUl">
      {items.map((item) => (
        <Item key={item.id} item={item} onSelect={onSelectItem} />
      ))}
    </ul>
  );
}

export default ItemsList;