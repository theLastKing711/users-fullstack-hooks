import { Container } from "@mui/system";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import { pages } from "./utils/constants";
import "react-toastify/dist/ReactToastify.css";

const pagesLinks = pages.map((item) => {
  return <Route path={item.url} element={<item.component />} />;
});

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>{pagesLinks}</Routes>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
