import { createContext, useState, useContext } from "react";
import { checkUser, getUserInfo } from "../services/api";

export const AppContext = createContext({
  userInfo: null,
  stateFromPage: "landingPage",
  setUserInfo: () => {},
  setStateFromPage: () => {},
  checkLogin: () => {},
  handleLogOut: () => {},
});

export function AppProvider({ children }) {
  const [stateFromPage, setStateFromPage] = useState("landingPage");
  const [userInfo, setUserInfo] = useState(null);

  function handleState(newState) {
    setStateFromPage(newState);
  }

  async function checkLogin(userName, userPassword) {
    const isValid = await checkUser(userName, userPassword);
    if (isValid) {
      const token = localStorage.getItem("token");
      const info = await getUserInfo(token);
      const typeOfUser = info?.is_superuser
        ? "superadmin"
        : info?.is_staff
        ? "staff"
        : "normal";

      setUserInfo({ type: typeOfUser, data: info });
      setStateFromPage("landingPage");
    }
  }

  function handleLogOut() {
    const token = localStorage.getItem("token");
        
    if (token) {
      console.log("Token encontrado, cerrando sesión...");
      localStorage.removeItem("token");
    } else {
      console.log("No hay token almacenado.");
    }
  
    setUserInfo(null);
    setStateFromPage("landingPage");
  }

  const ctxValue ={
    stateFromPage,
    userInfo,
    handleState,
    checkLogin,
    handleLogOut,
  };  

  return (
    <AppContext.Provider value={ctxValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
