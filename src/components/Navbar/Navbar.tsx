import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useAutomatico } from "../../context/automatico-context";
import logo from "../../assets/Logo-AIE.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { automatico, setAutomatico } = useAutomatico();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo AIE" className="navbar-logo" />
        <h1 className="navbar-title">Cálculo Bases AIE</h1>
      </div>
      <div className="navbar-controls">
        <label className="toggle-wrapper">
          <FontAwesomeIcon icon={faCog} size="lg" />
          {/*  <input
            type="checkbox"
            checked={automatico}
            onChange={(e) => setAutomatico(e.target.checked)}
            className="toggle"
          /> */}
        </label>
        <button className="new-button" onClick={() => navigate("/new")}>
          Nueva Base
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
