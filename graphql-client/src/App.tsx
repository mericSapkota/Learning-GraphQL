import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<Character />} /> */}
        <Route path="/" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-product/:id" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
