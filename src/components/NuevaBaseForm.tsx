import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import type { BaseHormigon } from "../types/BaseHormigon"; // Import the updated type

const NuevaBaseForm: React.FC = () => {
  const navigate = useNavigate();

  // Estado inicial basado en BaseHormigon (sin ID)
  const initialState: Omit<BaseHormigon, "id"> = {
    esfuerzoAxil: { valor: 0, unidad: "kN", tipo: "fuerza" },
    cargaAdmisible: { valor: 0, unidad: "kPa", tipo: "presion" },
    porcentajeCargaD: { valor: 0, unidad: "%", tipo: "porcentaje" },
    porcentajeCargaL: { valor: 0, unidad: "%", tipo: "porcentaje" },
    anchoColumnaX: { valor: 0, unidad: "cm", tipo: "longitud" },
    anchoColumnaY: { valor: 0, unidad: "cm", tipo: "longitud" },
    pesoEspecificoSuelo: { valor: 0, unidad: "kN/m3", tipo: "densidad" },
    nivelFundacion: { valor: 0, unidad: "cm", tipo: "longitud" },
    pesoEspecificoHormigon: { valor: 0, unidad: "kN/m3", tipo: "densidad" },
    resistenciaCaracteristicaHormigon: {
      valor: 0,
      unidad: "kPa",
      tipo: "presion",
    },
    recubrimientoHormigon: { valor: 0, unidad: "cm", tipo: "longitud" },
    tensionFluenciaAcero: { valor: 0, unidad: "kPa", tipo: "presion" },
    diametroBarrasX: { valor: 0, unidad: "mm", tipo: "longitud" },
    diametroBarrasY: { valor: 0, unidad: "mm", tipo: "longitud" },
  };

  const [formData, setFormData] = useState(initialState);
  const [importing, setImporting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof BaseHormigon
  ) => {
    setFormData({
      ...formData,
      [key]: {
        valor: parseFloat(e.target.value) || 0,
        unidad: formData[key].unidad,
        tipo: formData[key].tipo,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("baseshormigon", formData);
      const baseId = response.data.id;

      alert("¡Nueva base creada exitosamente!");
      navigate("/resultados", { state: { baseId } });
    } catch (error) {
      console.error("Error al crear la base:", error);
      alert("Error al crear la base.");
    }
  };

  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const unitOptions: Record<string, string[]> = {
    fuerza: ["N", "kN"],
    presion: ["Pa", "kPa", "MPa"],
    porcentaje: ["%", "-"],
    longitud: ["mm", "cm", "m"],
    densidad: ["kN/m3", "N/m3"],
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      setImporting(true);
      const response = await api.post<BaseHormigon>(
        "baseshormigonio/import",
        formDataUpload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      navigate("/resultados", { state: { baseId: response.data.id } });
    } catch (error) {
      console.error("Error al importar:", error);
      alert("Error al importar el archivo.");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="w-full min-h-screen p-6 bg-gray-200">
        <div className="w-full flex justify-center mb-6">
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleImportFile}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleImportClick}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600"
            disabled={importing}
          >
            {importing ? "Importando..." : "Importar archivo"}
          </button>
        </div>
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Crear Nueva Base
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {Object.entries(formData).map(([key, data]) => (
              <div key={key}>
                <label className="block text-gray-600">
                  {formatLabel(key)}
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name={key}
                    value={data.valor !== 0 ? data.valor : undefined}
                    onChange={(e) => handleChange(e, key as keyof BaseHormigon)}
                    className="w-3/4 px-3 py-2 border rounded-lg bg-gray-100 text-black focus:ring-blue-500"
                    required
                  />
                  <select
                    className="w-1/4 px-2 py-2 border rounded-lg bg-gray-200 text-black"
                    value={data.unidad}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: { ...data, unidad: e.target.value },
                      })
                    }
                  >
                    {unitOptions[data.tipo]?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
    </>
  );
};

export default NuevaBaseForm;
