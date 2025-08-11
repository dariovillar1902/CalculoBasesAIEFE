import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import type { BaseHormigon } from "../types/BaseHormigon";

const NuevaBaseForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseId = location.state?.baseId;

  const initialState: Omit<BaseHormigon, "id"> = {
    nombre: "",
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

  useEffect(() => {
    const fetchBase = async () => {
      if (baseId) {
        try {
          const { data } = await api.get<BaseHormigon>(
            `baseshormigon/${baseId}`
          );
          const { id, ...rest } = data;
          setFormData(rest);
        } catch (err) {
          console.error("Error fetching base data:", err);
          alert("No se pudo cargar la base.");
        }
      }
    };

    fetchBase();
  }, [baseId]);

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

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof BaseHormigon
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (baseId) {
        await api.put(`baseshormigon/${baseId}`, formData);
        navigate("/resultados", { state: { baseId: baseId } });
      } else {
        const response = await api.post("baseshormigon", formData);
        navigate("/resultados", { state: { baseId: response.data.id } });
      }
    } catch (error) {
      console.error("Error al guardar la base:", error);
      alert("Error al guardar la base.");
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
        <div className="w-full flex justify-center mb-6 space-x-4">
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleImportFile}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => window.open("/BaseHormigon.xlsx", "_blank")}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 ml-4"
          >
            {importing ? "" : "Descargar plantilla"}
          </button>
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
            <div className="col-span-2">
              <label className="block text-gray-600">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={(e) => handleTextChange(e, "nombre")}
                maxLength={140}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-black focus:ring-blue-500"
                required
              />
            </div>
            {Object.entries(formData).map(([key, data]) => {
              if (key === "nombre") return null;

              return (
                <div key={key}>
                  <label className="block text-gray-600">
                    {formatLabel(key)}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name={key}
                      value={data.valor !== 0 ? data.valor : undefined}
                      onChange={(e) =>
                        handleChange(e, key as keyof BaseHormigon)
                      }
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
              );
            })}

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
