import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { userInfo, handleState, handleLogOut } = useAppContext();

  return (
    <header>
      <h1>Biblioteca</h1>
      {userInfo ? (
        <>
          <p onClick={() => handleState("profilePage")}>Veure perfil</p>
          <p onClick={handleLogOut}>LogOut</p>
        </>
      ) : (
        <p onClick={() => handleState("loginPage")}>Login</p>
      )}
    </header>
  );
}