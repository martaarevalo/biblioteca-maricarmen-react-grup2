import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { getUserInfo } from "../services/api";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";

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
      {userDetails ? (
        userInfo?.type === "superadmin" || userInfo?.type === "staff" ? (
          <AdminProfile userDetails={userDetails} />
        ) : (
          <UserProfile userDetails={userDetails} />
        )
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}