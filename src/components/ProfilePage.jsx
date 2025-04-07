import { useAppContext } from "../context/AppContext";

export default function ProfilePage() {
  const { userInfo } = useAppContext();

  console.log("Estoy en el profile");
  return (
    <>
      <p>Pàgina de perfil</p>
    </>
  );
}