import { useState } from "react";
import "./App.css";
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
      let typeOfUser;
      

      if (info?.is_superuser) {
        console.log("Es superadmin");
        typeOfUser = "superadmin";
      } else if (info?.is_staff) {
        console.log("Es staff");
        typeOfUser = "staff";
      } else {
        console.log("Es usuario normal");
        typeOfUser = "normal";
      }

      setUserInfo({ type: typeOfUser, data: info });
      setStateFromPage("landingPage");
    } else {
      console.log("Login fallido");
    }
  }

  function handleLogOut() {
    console.log("Cerrando sesión...");
    localStorage.removeItem("token");
    setUserInfo(null);
    setStateFromPage("landingPage");
  }

  return (
    <>
      <Header userInfo={userInfo} handleState={handleState} handleLogOut={handleLogOut}/>
      <MainArea stateFromPage={stateFromPage} userInfo={userInfo} checkLogin={checkLogin} />
    </>
  );
}

export default App;
