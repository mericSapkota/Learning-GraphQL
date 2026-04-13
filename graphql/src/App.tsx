import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import CharacterList from "./pages/CharacterList";
import Character from "./pages/Character";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </>
  );
}

export default App;
