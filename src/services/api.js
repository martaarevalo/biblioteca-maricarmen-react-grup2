import jsPDF from "jspdf";
import bwipjs from "bwip-js";

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

// Buscar ejemplares por rango
export const fetchExemplarsRange = async (valor1, valor2) => {
  try {
    const response = await fetch(`${API_URL}/exemplars/${valor1}/${valor2}`);
    if (!response.ok) {
      throw new Error("Error al obtener ejemplares en el rango");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchExemplarsRange:", error);
    return [];
  }
};


export const handlePrint = async (centreName, exemplarToPrint) => {

  // setModalText("Generant PDF...");
  // setIsModalOpen(true);

  // setTimeout(() => {
  const pdf = new jsPDF("portrait", "mm", "a4");
  const LIBRARY_NAME =  centreName?.length > 28 ? centreName.slice(0, 28) + "..." : centreName;
  
  const marginX = 7;
  const marginY = 7;
  const cols = 4;
  const rows = 17;
  const labelWidth = (210 - 2 * marginX) / cols; // 49mm
  const labelHeight = (297 - 2 * marginY) / rows; // ≈16.18mm

  let row = 0;
  let col = 0;

  // // Dibuja las líneas de la cuadrícula
  // const drawGridLines = (pdfInstance) => {
  //   for (let r = 0; r < rows; r++) {
  //     for (let c = 0; c < cols; c++) {
  //       const x = marginX + c * labelWidth;
  //       const y = marginY + r * labelHeight;
  //       pdfInstance.rect(x, y, labelWidth, labelHeight);
  //     }
  //   }
  // };

  // drawGridLines(pdf); // Primera página

  for (let i = 0; i < exemplarToPrint.length; i++) {
    const { registre, titol, CDU } = exemplarToPrint[i];

    if (col >= cols - 1) {
      col = 0;
      row++;
    }

    if (row >= rows) {
      pdf.addPage();
      // drawGridLines(pdf); // Dibuja cuadrícula en nueva página
      row = 0;
      col = 0;
    }

    const x1 = marginX + col * labelWidth;
    const x2 = marginX + (col + 1) * labelWidth;
    const y = marginY + row * labelHeight;
    
    // Generar 128code
    const barcodeValue = registre;
    console.log(barcodeValue)
    try {
      const canvas = document.createElement("canvas");
      bwipjs.toCanvas(canvas, {
        bcid: "code128",       
        text: barcodeValue,    
        scale: 1.7,
        height: 6,
        includetext: true,
      });
      
      const imgData = canvas.toDataURL("image/png");
    
      const padding = 2;
      let cursorY = y + padding;
    
      // Lado izquierdo (biblioteca, título, código de barras)
      pdf.setFontSize(6);
      pdf.text(LIBRARY_NAME, x1 + padding, cursorY + 2);
    
      // const shortTitle = registre?.length > 25 ? registre.slice(0, 25) + "..." : registre;
      // pdf.text(`${shortTitle}`, x1 + padding, cursorY + 5.2);
    
      const barcodeWidth = labelWidth - 2 * padding;
      const barcodeHeight = 6;
      pdf.addImage(imgData, "PNG", x1 + padding, cursorY + 6.5, barcodeWidth, barcodeHeight);
    
      // Lado derecho (CDU)
      pdf.setFontSize(12);
      pdf.text(`CDU: ${CDU || "-"}`, x2 + padding, y + labelHeight / 2 + 2);
    
      col += 2;
    } catch (err) {
      console.error("Error generant codi EAN13:", err);
    }
    
  }

  pdf.save("etiquetes.pdf");
  // setIsModalOpen(false);

// }, 5000);
};

export const socialLogin = async (provider, token) => {
  try {
    const response = await fetch(`${API_URL}/social-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ provider, token }),
    });
    if (!response.ok) throw new Error("Error en login social");
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    console.error("Error en login social:", error);
    return null;
  }
};