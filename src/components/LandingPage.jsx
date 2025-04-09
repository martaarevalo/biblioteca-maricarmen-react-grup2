import { useAppContext } from "../context/AppContext";
import BookList from "./BookList";

export default function LandingPage() {
  const { userInfo } = useAppContext();

  console.log(userInfo);
  return (
    <div className="landingPage">
      <div className="catalog-header">
        <h2>Catàleg</h2>
        <input
          type="text"
          placeholder="Cerca al catàleg..."
          className="search-input"
        />
      </div>
      <BookList />
    </div>
  );
}