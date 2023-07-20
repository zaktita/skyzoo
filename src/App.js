import { Outlet } from "react-router-dom";
import Banner from "./banner";
import Badges from "./components/badges";
import Copyright from "./components/copyright";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <Banner/>
      <Navbar/>
      <Outlet/>
      <Badges/>
      <Footer/>
      <Copyright/>
    </div>
  );
}

export default App;
