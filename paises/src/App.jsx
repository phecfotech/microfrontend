import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";


import "./index.scss";
import Header from "home/Header";
import Footer from "home/Footer";
import PaisList from "./PaisList";

const App = () => (
  <div className="mt-5 text-3xl mx-auto max-w-6xl">
    <Header/>
    <div className="my-5">
      <h1>Lista de paises</h1>
    </div>
    <Button variant="contained" sx={{margin:'10px'}}>Crear</Button>
    <PaisList/>
    
    <Footer/>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
