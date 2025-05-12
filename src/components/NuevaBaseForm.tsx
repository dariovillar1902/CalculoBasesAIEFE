import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const NuevaBaseForm: React.FC = () => {
  const navigate = useNavigate();

  // Estado del formulario con todos los campos
  const [formData, setFormData] = useState({
    esfuerzoAxil: "",
    cargaAdmisible: "",
    porcentajeCargaD: "",
    porcentajeCargaL: "",
    anchoColumnaX: "",
    anchoColumnaY: "",
    pesoEspecificoSuelo: "",
    nivelFundacion: "",
    pesoEspecificoHormigon: "",
    resistenciaCaracteristicaHormigon: "",
    recubrimientoHormigon: "",
    tensionFluenciaAcero: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("baseshormigon", formData);
      alert("¡Nueva base creada exitosamente!");
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      console.error("Error al crear la base:", error);
      alert("Error al crear la base.");
    }
  };

  // Lista de unidades para cada campo
  const units: Record<string, string> = {
    cargaAdmisible: "kN/m²",
    esfuerzoAxil: "kN",
    porcentajeCargaD: "%",
    porcentajeCargaL: "%",
    anchoColumnaX: "cm",
    anchoColumnaY: "cm",
    pesoEspecificoSuelo: "kN/m²",
    nivelFundacion: "cm",
    pesoEspecificoHormigon: "kN/m²",
    resistenciaCaracteristicaHormigon: "kN/m²",
    recubrimientoHormigon: "cm",
    tensionFluenciaAcero: "MPa",
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-6 bg-gray-200">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Crear Nueva Base
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Generar inputs con dropdowns de unidades */}
          {[
            ["Carga Admisible", "Esfuerzo Axil"],
            ["% Carga D", "% Carga L"],
            ["Ancho Columna X", "Ancho Columna Y"],
            ["Peso Específico Suelo", "Nivel de Fundación"],
            ["Peso Específico Hormigón", "Resistencia Característica Hormigón"],
            ["Recubrimiento Hormigón", "Tensión Fluencia Acero"],
          ].map(([campo1, campo2]) => (
            <>
              {[campo1, campo2].map((campo) => (
                <div key={campo}>
                  <label className="block text-gray-600">{campo}</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name={campo.toLowerCase().replace(/\s+/g, "")}
                      value={
                        formData[
                          campo
                            .toLowerCase()
                            .replace(/\s+/g, "") as keyof typeof formData
                        ]
                      }
                      onChange={handleChange}
                      className="w-3/4 px-3 py-2 border rounded-lg bg-gray-100 text-black focus:ring-blue-500"
                      required
                    />
                    <select className="w-1/4 px-2 py-2 border rounded-lg bg-gray-200 text-black">
                      <option>
                        {units[campo.toLowerCase().replace(/\s+/g, "")]}
                      </option>
                    </select>
                  </div>
                </div>
              ))}
            </>
          ))}

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Crear Base
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaBaseForm;
