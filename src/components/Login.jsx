import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import iconLog from "../assets/iconLog.webp";

export default function Login() {
  const { checkLogin } = useAppContext();
  const [showError, setShowError] = useState(false);

  console.log("Estoy en el Login");

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const loginSuccess = await checkLogin(fd.get("username"), fd.get("password"));

    if (!loginSuccess) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }

  return (
    <div className="centerDiv">
      <img src={iconLog} alt="logo del Institut Esteve Terrades i Illa" />
      <h2 className="h2">Login</h2>
      <p className={showError ? "error-visible" : ""}>
        Usuari o contrasenya incorrecta
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">usuari</label>
          <br />
          <input type="text" name="username" />
        </div>
        <div>
          <label htmlFor="password">contrasenya</label>
          <br />
          <input type="password" name="password" />
        </div>
        <button className="button" type="submit">
          Iniciar sesió
        </button>
      </form>
    </div>
  );
}