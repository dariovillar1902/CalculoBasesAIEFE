import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BasesHormigonTable from "./components/BasesHormigonTable/BasesHormigonTable";
import NuevaBaseForm from "./components/NuevaBaseForm";
import ResultadosBase from "./components/ResultadosBase/ResultadosBase";
import { AutomaticoProvider } from "./context/automatico-context";

const App: React.FC = () => {
  return (
    <AutomaticoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BasesHormigonTable />} />
          <Route path="/new" element={<NuevaBaseForm />} />
          <Route path="/resultados" element={<ResultadosBase />} />
        </Routes>
      </Router>
    </AutomaticoProvider>
  );
};

export default App;
