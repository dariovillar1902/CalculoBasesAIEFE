import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/Logo-AIE.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import AjustesModal from "../AjustesModal/AjustesModal";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [openAjustes, setOpenAjustes] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo AIE" className="navbar-logo" />
          <h1 className="navbar-title">Cálculo Bases AIE</h1>
        </div>

        <div className="navbar-controls">
          <button
            className="ajustes-btn"
            onClick={() => setOpenAjustes(true)}
            title="Ajustes"
          >
            <FontAwesomeIcon icon={faCog} size="lg" />
          </button>

          <button className="new-button" onClick={() => navigate("/new")}>
            Nueva Base
          </button>
        </div>
      </nav>

      <AjustesModal
        isOpen={openAjustes}
        onClose={() => setOpenAjustes(false)}
      />
    </>
  );
};

export default Navbar;
