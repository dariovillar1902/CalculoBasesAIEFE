import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Calculo Bases AIE</h1>
      <button
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200"
        onClick={() => navigate("/new")}
      >
        Nueva Base
      </button>
    </nav>
  );
};

export default Navbar;
