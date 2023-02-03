import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Favorites from "./pages/Purchases";
import Login from "./pages/Login";
import NewsDetail from "./pages/NewsDetail";
import NavBar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import ProtecteRow from "./components/ProtecteRow";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      
      <NavBar />

      {isLoading && <Loader />}

      <Container className="my-5">
        <Routes>
          <Route path="/" element={<Product/>} />
          <Route path="/product/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
        

          <Route element={<ProtecteRow/>}>

          <Route path="/favorites" element={<Favorites />} />

          </Route>
          
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
