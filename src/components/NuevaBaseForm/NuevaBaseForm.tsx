import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";
import "./NuevaBaseForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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

  const fieldDescriptions: Record<string, string> = {
    esfuerzoAxil: "Fuerza axial aplicada sobre la base",
    cargaAdmisible: "Presión máxima que el suelo puede soportar",
    porcentajeCargaD: "Porcentaje de carga muerta aplicada",
    porcentajeCargaL: "Porcentaje de carga viva aplicada",
    anchoColumnaX: "Ancho de la columna en dirección X",
    anchoColumnaY: "Ancho de la columna en dirección Y",
    pesoEspecificoSuelo: "Densidad del suelo en la zona de fundación",
    nivelFundacion: "Profundidad desde el nivel del terreno hasta la base",
    pesoEspecificoHormigon: "Densidad del hormigón utilizado",
    resistenciaCaracteristicaHormigon: "Resistencia a compresión del hormigón",
    recubrimientoHormigon:
      "Espesor de recubrimiento del hormigón sobre el acero",
    tensionFluenciaAcero: "Tensión máxima que soporta el acero antes de fluir",
    diametroBarrasX: "Diámetro de las barras de refuerzo en dirección X",
    diametroBarrasY: "Diámetro de las barras de refuerzo en dirección Y",
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
    <div className="container">
      <div className="buttonGroup">
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleImportFile}
          ref={fileInputRef}
          className="hiddenInput"
        />
        <button
          type="button"
          onClick={() => window.open("/BaseHormigon.xlsx", "_blank")}
          className="downloadButton"
        >
          {importing ? "" : "Descargar plantilla"}
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          className="importButton"
          disabled={importing}
        >
          {importing ? "Importando..." : "Importar archivo"}
        </button>
      </div>

      <div className="card">
        <h2 className="title">Crear Nueva Base</h2>
        <form onSubmit={handleSubmit} className="formGrid">
          <div className="fullWidth">
            <label className="label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={(e) => handleTextChange(e, "nombre")}
              maxLength={140}
              className="input"
              required
            />
          </div>

          {Object.entries(formData).map(([key, data]) => {
            if (key === "nombre") return null;

            return (
              <div key={key}>
                <label className="label">
                  {formatLabel(key)}
                  <span className="tooltipWrapper">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="tooltipIcon"
                    />
                    <span className="tooltipText">
                      {fieldDescriptions[key]}
                    </span>
                  </span>
                </label>
                <div className="inputGroup">
                  <input
                    type="number"
                    name={key}
                    value={data.valor !== 0 ? data.valor : undefined}
                    onChange={(e) => handleChange(e, key as keyof BaseHormigon)}
                    className="input inputNumber"
                    required
                  />
                  <select
                    className="selectUnit"
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

          <div className="fullWidth">
            <button type="submit" className="submitButton">
              Crear Base
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaBaseForm;
