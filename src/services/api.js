const API_URL = "http://localhost:8000/api";
// const API_URL = "https://biblioteca2.ieti.site/api";

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
export const fetchCatalegDetail = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/cataleg/${itemId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error al obtenir els detalls del catàleg: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error de xarxa:", error);
    return [];
  }
};

//Buscar usuaris
export const searchUsers = async (userInfoSearch) => {
  try {
    const response = await fetch(`${API_URL}/users/${userInfoSearch}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Error al obtenir els usuaris: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error("Error de xarxa:", error);
    return [];
  }
};

//Realitzar préstec
export const makeBorrow = async (userId, exemplarId) => {
  const token = localStorage.getItem("token");

  try {
  
    const response = await fetch(`${API_URL}/makeBorrow/${userId}/${exemplarId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Si la respuesta no es ok, mostrar el error
      const data = await response.json();
      console.error("Error al realizar el préstamo:", data.error);
      return false;
    }

    // Si la respuesta es exitosa, devolver los datos de éxito
    const data = await response.json();
    console.log("Préstamo realizado con éxito:", data);
    return true;
    
  } catch (error) {
    console.error("Error de red o en la API:", error);
    return false;
  }
};

// Buscar préstecs
export const fetchUserBorrows = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/usuari/${userId}/prestecs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error al obtenir els préstecs");
    return await response.json();
  } catch (error) {
    console.error("Error a la API:", error);
    return [];
  }
};
