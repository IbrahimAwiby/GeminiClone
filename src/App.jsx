import { useContext } from "react";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import { Context } from "./Context/Context";

function App() {
  const { darkMode } = useContext(Context);

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-white"
      }`}
    >
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
