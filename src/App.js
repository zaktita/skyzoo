import { Outlet } from "react-router-dom";
import Banner from "./banner";
import Badges from "./components/badges";
import Copyright from "./components/copyright";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import Test from "./components/test";
import Categorie from "./pages/categorie";
import Home from "./pages/home";
import Product from "./pages/productpage/product";

function App() {
  return (
    <div className="App">
      <Banner/>
      <Navbar/>
      {/* <Test/> */}
      {/* <Product/> */}
      {/* <Home/> */}
      {/* <Categorie/> */}

      
      <Outlet/>

      <Badges/>
      <Footer/>
      <Copyright/>
    </div>
  );
}

export default App;
