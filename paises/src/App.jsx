import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Header from "home/Header";
import Footer from "home/Footer";
import PaisList from "./PaisList";
import CreateModal from "./CreateModal";

const App = () => (
  <div className="mt-5 text-3xl mx-auto max-w-6xl">
    <Header/>
    <div className="my-5">
      <h1>Lista de paises</h1>
    </div>
    <CreateModal/>
    <PaisList/>
    <Footer/>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
