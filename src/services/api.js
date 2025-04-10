const API_URL = "http://localhost:8000/api";

export const getBooks = () => {
  console.log("llamando API...");
  return fetch(`${API_URL}/llibres/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error en la API:", error);
      return [];
    });
};

export const checkUser = async (userName, userPassword) => {
  const credentials = btoa(`${userName}:${userPassword}`);
  try {
    const response = await fetch(`${API_URL}/token/`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) return false;

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return true;
  } catch (error) {
    console.error("Error en login:", error);
    return false;
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await fetch(`${API_URL}/usuari/qui-soc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("No autorizado");
    return await response.json();
  } catch (err) {
    console.error("Error al obtener info de usuario:", err);
    return null;
  }
};

//Buscador
export const searchBooks = (query) => {
  return fetch(`${API_URL}/llibres/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al buscar libros");
      }
      return response.json();
    })
    .then((books) => {
      const searchQuery = query.toLowerCase();
      return books.filter(
        (book) =>
          (book.titol && book.titol.toLowerCase().includes(searchQuery)) ||
          (book.autor && book.autor.toLowerCase().includes(searchQuery))
      );
    })
    .catch((error) => {
      console.error("Error en la búsqueda:", error);
      return [];
    });
};
export const updateUserProfile = async (userDetails) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/usuari/actualitzar-perfil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) throw new Error("Error al actualizar el perfil");
    return true;
  } catch (error) {
    console.error("Error en la API:", error);
    return false;
  }
};