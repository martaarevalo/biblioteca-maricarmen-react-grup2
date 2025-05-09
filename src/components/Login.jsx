import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";
import iconLog from "../assets/LogoET.webp";

export default function Login() {
  const { checkLogin, checkLoginWithToken } = useAppContext();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const googleLoginButton = document.getElementById("google-login-button");
    if (googleLoginButton) {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleLogin,
        });
        window.google.accounts.id.renderButton(googleLoginButton, {
            theme: "outline",
            size: "large",
        });
    }
}, []);

  const handleGoogleLogin = async (response) => {
    const token = response.credential;

    const res = await fetch(`${import.meta.env.VITE_WEB_URL_API}/social-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ provider: "google", token }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      await checkLoginWithToken(data.token); // <-- esto carga el usuario en el contexto
      // Redirige o cambia de estado si quieres
    } else {
      console.error("Error al autenticar con Google");
      setShowError(true);
    }
  };

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
      <div id="google-login-button"></div>
    </div>
  );
}