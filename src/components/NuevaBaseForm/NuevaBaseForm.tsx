import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";
import "./NuevaBaseForm.scss";
import ImportButtons from "../ImportButtons/ImportButtons";
import CampoInput from "../CampoInput/CampoInput";
import NombreInput from "../NombreInput/NombreInput";

const NuevaBaseForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseId = location.state?.baseId;

  const initialState: Omit<BaseHormigon, "id"> = {
    nombre: "",

    esfuerzoAxil: { valor: 0, unidad: "kN", tipo: "fuerza" },
    cargaAdmisible: { valor: 0, unidad: "kPa", tipo: "presion" },
    corteX: { valor: 0, unidad: "kN", tipo: "fuerza" },
    corteY: { valor: 0, unidad: "kN", tipo: "fuerza" },
    momentoX: { valor: 0, unidad: "kN·m", tipo: "momento" },
    momentoY: { valor: 0, unidad: "kN·m", tipo: "momento" },
    moduloBalasto: { valor: 0, unidad: "kN/m³", tipo: "rigidez" },

    porcentajeCargaD: { valor: 60, unidad: "%", tipo: "porcentaje" },
    porcentajeCargaL: { valor: 40, unidad: "%", tipo: "porcentaje" },
    anchoColumnaX: { valor: 30, unidad: "cm", tipo: "longitud" },
    anchoColumnaY: { valor: 30, unidad: "cm", tipo: "longitud" },
    pesoEspecificoSuelo: { valor: 17, unidad: "kN/m³", tipo: "densidad" },
    nivelFundacion: { valor: 50, unidad: "cm", tipo: "longitud" },
    pesoEspecificoHormigon: { valor: 24, unidad: "kN/m³", tipo: "densidad" },
    resistenciaCaracteristicaHormigon: {
      valor: 25,
      unidad: "MPa",
      tipo: "presion",
    },
    recubrimientoHormigon: { valor: 3, unidad: "cm", tipo: "longitud" },
    tensionFluenciaAcero: { valor: 420, unidad: "MPa", tipo: "presion" },
    diametroBarrasX: { valor: 16, unidad: "mm", tipo: "longitud" },
    diametroBarrasY: { valor: 16, unidad: "mm", tipo: "longitud" },
    costoM3Hormigon: { valor: 150000, unidad: "$", tipo: "precio" },
    costoKgAcero: { valor: 2300, unidad: "$", tipo: "precio" },
    costoM3Excavacion: { valor: 25000, unidad: "$", tipo: "precio" },
    coeficienteEsponjamiento: { valor: 1.3, unidad: "", tipo: "texto" },
  };

  type FormFieldKey = keyof typeof initialState;

  const [formData, setFormData] = useState(initialState);
  const [mostrarAvanzados, setMostrarAvanzados] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const camposBasicos: FormFieldKey[] = [
    "esfuerzoAxil",
    "cargaAdmisible",
    "corteX",
    "corteY",
    "momentoX",
    "momentoY",
    "moduloBalasto",
  ];

  const camposAvanzados = Object.keys(formData).filter(
    (key) => !["nombre", ...camposBasicos].includes(key)
  ) as FormFieldKey[];

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: FormFieldKey
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
    key: FormFieldKey
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (baseId) {
        await api.put(`baseshormigon/${baseId}`, formData);
        navigate("/resultados", { state: { baseId } });
      } else {
        const response = await api.post("baseshormigon", formData);
        navigate("/resultados", { state: { baseId: response.data.id } });
      }
    } catch (error) {
      console.error("Error al guardar la base:", error);
      alert("Error al guardar la base.");
    }
  };

  return (
    <div className="container">
      <ImportButtons
        importing={importing}
        fileInputRef={fileInputRef}
        setImporting={setImporting}
        navigate={navigate}
      />

      <div className="card">
        <h2 className="title">Crear Nueva Base</h2>
        <img src="../../../public/fotoCargas.png" className="fotoCargas" />
        <form onSubmit={handleSubmit} className="formGrid">
          <NombreInput
            value={formData.nombre}
            onChange={(e) => handleTextChange(e, "nombre")}
          />

          {camposBasicos.map((key) => (
            <CampoInput
              key={key}
              name={key}
              data={formData[key]}
              onChange={(e) => handleChange(e, key)}
              onUnitChange={(unidad) =>
                setFormData({
                  ...formData,
                  [key]: { ...formData[key], unidad },
                })
              }
            />
          ))}

          <div className="fullWidth">
            <button
              type="button"
              className="toggleAdvancedButton"
              onClick={() => setMostrarAvanzados(!mostrarAvanzados)}
            >
              {mostrarAvanzados
                ? "Ocultar ajustes avanzados"
                : "Mostrar ajustes avanzados"}
            </button>
          </div>

          {mostrarAvanzados &&
            camposAvanzados.map((key) => (
              <CampoInput
                key={key}
                name={key}
                data={formData[key]}
                onChange={(e) => handleChange(e, key)}
                onUnitChange={(unidad) =>
                  setFormData({
                    ...formData,
                    [key]: { ...formData[key], unidad },
                  })
                }
              />
            ))}

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
