export default function Login({checkLogin}) {

    console.log("Estoy en el Login")

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    checkLogin(fd.get(`username`), fd.get(`password`))

  }

  return (
    <>
      <p>Login Page</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuari:</label>
          <br />
          <input
            type="text"
            name="username"
          />
        </div>

        <div>
          <label htmlFor="password">Contrasenya:</label>
          <br />
          <input
            type="password"
            name="password"
          />
        </div>

        <button type="submit">Iniciar sesió</button>
      </form>
    </>
  );
}