import { useNavigate } from "react-router-dom";
import { useAutomatico } from "../context/automatico-context";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { automatico, setAutomatico } = useAutomatico();

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Calculo Bases AIE</h1>
      <div className="flex items-center gap-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={automatico}
            onChange={(e) => setAutomatico(e.target.checked)}
            className="w-10 h-5 rounded-full bg-gray-300 appearance-none cursor-pointer checked:bg-green-500 transition"
          />
        </label>
        <button
          className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200"
          onClick={() => navigate("/new")}
        >
          Nueva Base
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
