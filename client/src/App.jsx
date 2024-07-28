import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import About from "./pages/About";
import TransactionsPage from "./pages/TransactionsPage";
import CompliancePage from "./pages/CompliancePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <BackToTop />
          </>
        }
        />
        <Route path="/about" element={
          <>
            <About />
            <BackToTop />
          </>
        } />
        <Route path="/transactions" element={
          <TransactionsPage/>
        } />
        <Route path="/compliance" element={
          <CompliancePage/>
        } />
        
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
