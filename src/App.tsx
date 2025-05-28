import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BasesHormigonTable from "./components/BasesHormigonTable";
import NuevaBaseForm from "./components/NuevaBaseForm";
import ResultadosBase from "./components/ResultadosBase";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BasesHormigonTable />} />
        <Route path="/new" element={<NuevaBaseForm />} />
        <Route path="/resultados" element={<ResultadosBase />} />
      </Routes>
    </Router>
  );
};

export default App;
