import logo from "./logo.svg";
import "./App.css";
import FetchApi from "./components/FetchApi";
import AxiosApi from "./components/AxiosApi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Errors } from "./components/Errors";
import ViewProducts from "./components/ViewProducts";
import AddProduct from "./components/AddProduct";
function App() {
  return (
    <Router>
      <div>
        <h1>Explore the fetched Data</h1>
        <Routes>
          <Route path="/" element={<FetchApi />}></Route>
          <Route path="/errors" element={<Errors />}></Route>
          <Route path="/axios" element={<AxiosApi />}></Route>
          <Route path="/view" element={<ViewProducts />}></Route>
          <Route path="/add" element={<AddProduct />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
