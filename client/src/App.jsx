import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <BackToTop />
            <Footer />
          </>
        }
        />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <BackToTop />
            <Footer />
          </>
        } />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
