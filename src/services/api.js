const API_URL = "http://localhost:8000/api";

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

export async function importCSV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/import-csv`, {
      method: "POST",
      body: formData,
  });
  return response.json();
}

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

//Buscador
export const searchItems = async (query) => {
  try {
    const response = await fetch(`${API_URL}/cataleg/`);
    if (!response.ok) {
      throw new Error("Error al buscar items");
    }
    const items = await response.json();
    const searchQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        (item.titol && item.titol.toLowerCase().includes(searchQuery)) ||
        (item.autor && item.autor.toLowerCase().includes(searchQuery))
    );
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return [];
  }
};

//Item seleccionado
export const fetchExemplars = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/cataleg/llibre/${itemId}`);
    if (response.ok) {
      const data = await response.json();
      return data.exemplars;
    } else {
      console.error(`Error al obtener los ejemplares: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error de red:", error);
    return [];
  }
};