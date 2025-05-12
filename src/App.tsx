import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BasesHormigonTable from "./components/BasesHormigonTable";
import NuevaBaseForm from "./components/NuevaBaseForm"; // Import new form component

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BasesHormigonTable />} />
        <Route path="/new" element={<NuevaBaseForm />} />
      </Routes>
    </Router>
  );
};

export default App;
