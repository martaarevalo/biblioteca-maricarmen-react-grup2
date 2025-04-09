import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getUserInfo } from "../services/api";

export default function ProfilePage() {
  const { userInfo } = useAppContext();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await getUserInfo(token);
        setUserDetails(data);
      }
    }
    fetchUserDetails();
  }, []);

  return (
    <div className="profilePage">
      <h2>Perfil del Usuario</h2>
      {userDetails ? (
        <div>
          <p><strong>Nombre de usuario:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Nombre:</strong> {userDetails.first_name}</p>
          <p><strong>Apellido:</strong> {userDetails.last_name}</p>
          <p><strong>Tipo de usuario:</strong> {userInfo?.type}</p>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}