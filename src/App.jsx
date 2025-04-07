import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import "./reset.css";
import "./styles.css";

function App() {
  return (
    <AppProvider>
      <Header />
      <MainArea />
    </AppProvider>
  );
}

export default App;