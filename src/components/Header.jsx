import { useAppContext } from "../context/AppContext";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const { userInfo, handleState, handleLogOut } = useAppContext();

  return (
    <header className="header">
      <h1 className="logo">Biblioteca Maricarmen Brito</h1>
      <nav>
        <DarkModeToggle />
        <p className="nav-link" onClick={() => handleState("landingPage")}>Menu Principal</p>
        {userInfo ? (
          <>
            <p className="nav-link" onClick={() => handleState("historyBorrowsPage")}>
              Historial préstecs
            </p>
            <p className="nav-link" onClick={() => handleState("profilePage")}>
              Veure perfil
            </p>
            <p className="nav-link" onClick={handleLogOut}>
              Tancar sessió de {userInfo.data.first_name}
            </p>
          </>
        ) : (
          <p className="nav-link" onClick={() => handleState("loginPage")}>
            Iniciar sessió
          </p>
        )}
      </nav>
    </header>
  );
}