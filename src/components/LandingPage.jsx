import { useAppContext } from "../context/AppContext";
import BookList from "./BookList";

export default function LandingPage() {
  const { userInfo } = useAppContext();

  console.log(userInfo);
  return (
    <>
      <p>Landing Page</p>
      <BookList />
    </>
  );
}