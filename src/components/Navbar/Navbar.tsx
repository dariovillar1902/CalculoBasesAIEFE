import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/Logo-AIE.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import AjustesModal from "../AjustesModal/AjustesModal";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  // Hook de React Router para redirigir entre rutas

  const [openAjustes, setOpenAjustes] = useState(false);
  // Estado que controla si el modal de ajustes está abierto

  return (
    <>
      <nav className="navbar">
        {/* Marca principal de la app: logo + título.
            Al hacer click vuelve a la pantalla principal */}
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo AIE" className="navbar-logo" />
          <h1 className="navbar-title">Cálculo Bases AIE</h1>
        </div>

        <div className="navbar-controls">
          {/* Botón para abrir el modal de ajustes */}
          <button
            className="ajustes-btn"
            onClick={() => setOpenAjustes(true)}
            title="Ajustes"
          >
            <FontAwesomeIcon icon={faCog} size="lg" />
          </button>

          {/* Botón para ir al formulario de creación de una nueva base */}
          <button className="new-button" onClick={() => navigate("/new")}>
            Nueva Base
          </button>
        </div>
      </nav>

      {/* Modal de ajustes, se muestra sólo si openAjustes es true */}
      <AjustesModal
        isOpen={openAjustes}
        onClose={() => setOpenAjustes(false)}
      />
    </>
  );
};

export default Navbar;
