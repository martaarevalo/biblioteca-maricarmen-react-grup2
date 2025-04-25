import { useAppContext } from "../context/AppContext";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const { userInfo, handleState, handleLogOut } = useAppContext();

  return (
    <header className="header">
      <h1 className="logo">Biblioteca Maricarmen</h1>
      <nav>
        <DarkModeToggle />
        <p className="nav-link" onClick={() => handleState("landingPage")}>Menu Principal</p>
        {userInfo ? (
          <>
            <p className="nav-link" onClick={() => handleState("profilePage")}>
              Veure perfil
            </p>
            <p className="nav-link" onClick={handleLogOut}>
              LogOut
            </p>
          </>
        ) : (
          <p className="nav-link" onClick={() => handleState("loginPage")}>
            Login
          </p>
        )}
      </nav>
    </header>
  );
}