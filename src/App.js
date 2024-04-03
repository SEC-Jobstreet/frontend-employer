import NavBar from "./components/appnav";
import AppRouter from "./components/approuter";
import Footer from "./components/footer";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
