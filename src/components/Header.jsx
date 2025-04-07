export default function Header({ userInfo, handleState, handleLogOut }) {
  console.log("Estoy en Header");
  return (
    <>
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
    </>
  );
}