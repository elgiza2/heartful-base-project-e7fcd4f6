import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Brand from "./pages/Brand";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Imprint from "./pages/Imprint";
import Leadership from "./pages/Leadership";
import Megay from "./pages/Megay";
import Partners from "./pages/Partners";
import Press from "./pages/Press";
import Products from "./pages/Products";
import Security from "./pages/Security";
import TrustCenter from "./pages/TrustCenter";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/products" element={<Products />} />
      <Route path="/megay" element={<Megay />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/press" element={<Press />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/security" element={<Security />} />
      <Route path="/trust-center" element={<TrustCenter />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
