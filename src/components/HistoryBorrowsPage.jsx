import { useState, useEffect } from "react";
import { fetchUserBorrows } from "../services/api";
import Item from "./Item";

export default function HistoryBorrowsPage({ userInfo }) {
  const [userBorrows, setUserBorrows] = useState([]);
  console.log("userInfo", userInfo);
  useEffect(() => {
    const loadUserBorrows = async () => {
      const data = await fetchUserBorrows(userInfo.data.id);
      setUserBorrows(data);
      console.log("userBorrows", data);
    };

    loadUserBorrows();
  }, [userInfo.id]);

  return (
    <>
      <div className="landingPage">
        <div className="catalog-header">
          <h2 className="h2">Historial de préstecs</h2>
        </div>
        <ul className="articleUl">
          {userBorrows.length > 0 ? (
            userBorrows.map((borrow, index) => (
              <Item key={index} data={borrow} forPage="borrows"/>
            ))
          ) : (
            <li>No hi ha préstecs per mostrar.</li>
          )}
        </ul>
      </div>
    </>
  );
}
