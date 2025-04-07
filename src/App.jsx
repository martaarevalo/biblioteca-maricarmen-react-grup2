import { useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import "./styles.css";
import Header from "./components/Header";
import MainArea from "./components/MainArea";

import { checkUser, getUserInfo } from "./services/api";

function App() {
  console.log("Estoy en App");

  const [stateFromPage, setStateFromPage] = useState("landingPage");
  const [userInfo, setUserInfo] = useState(null);

  function handleState(newState) {
    console.log("En el handleState");
    setStateFromPage(newState);
  }

  async function checkLogin(userName, userPassword) {
    console.log(`Intentando login con: ${userName}, ${userPassword}`);

    const isValid = await checkUser(userName, userPassword);
    if (isValid) {
      console.log("Login correcto");

      const token = localStorage.getItem("token");
      const info = await getUserInfo(token);
      setUserInfo(info);

      if (info?.is_superuser) {
        console.log("Es superadmin");
        setStateFromPage("adminPage");
      } else if (info?.is_staff) {
        console.log("Es staff");
        setStateFromPage("staffPage");
      } else {
        console.log("Es usuario normal");
        setStateFromPage("userPage");
      }
    } else {
      console.log("Login fallido");
    }
  }

  return (
    <>
      <Header handleState={handleState} />
      <MainArea stateFromPage={stateFromPage} checkLogin={checkLogin} />
    </>
  );
}

export default App;
