import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { ValueUnitPair } from "../../types/ValueUnitPair";
import "./NuevaBaseForm.scss";
import ImportButtons from "../ImportButtons/ImportButtons";
import CampoInput from "../CampoInput/CampoInput";
import NombreInput from "../NombreInput/NombreInput";

const NuevaBaseForm: React.FC = () => {
  const navigate = useNavigate();
  // Hook de navegación para redirigir después de guardar

  const location = useLocation();
  const baseId = location.state?.baseId;
  // Si se llega desde edición, viene con baseId

  // Estado inicial del formulario (sin incluir ID porque se genera en backend)
  const initialState: Omit<BaseHormigon, "id"> = {
    nombre: "",

    // Valores básicos
    esfuerzoAxil: { valor: 0, unidad: "kN", tipo: "fuerza" },
    cargaAdmisible: { valor: 0, unidad: "kPa", tipo: "presion" },
    corteX: { valor: 0, unidad: "kN", tipo: "fuerza" },
    corteY: { valor: 0, unidad: "kN", tipo: "fuerza" },
    momentoX: { valor: 0, unidad: "kN·m", tipo: "momento" },
    momentoY: { valor: 0, unidad: "kN·m", tipo: "momento" },
    moduloBalasto: { valor: 0, unidad: "kN/m³", tipo: "rigidez" },

    // Valores avanzados
    porcentajeCargaD: { valor: 60, unidad: "%", tipo: "porcentaje" },
    porcentajeCargaL: { valor: 40, unidad: "%", tipo: "porcentaje" },
    anchoColumnaX: { valor: 30, unidad: "cm", tipo: "longitud" },
    anchoColumnaY: { valor: 30, unidad: "cm", tipo: "longitud" },
    pesoEspecificoSuelo: { valor: 17, unidad: "kN/m³", tipo: "densidad" },
    nivelFundacion: { valor: 200, unidad: "cm", tipo: "longitud" },
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
  // Datos del formulario (componente controlado)

  const [mostrarAvanzados, setMostrarAvanzados] = useState(false);
  // Toggle para mostrar u ocultar campos avanzados

  const [importing, setImporting] = useState(false);
  // Estado visual del botón "Importar archivo"

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Referencia al input oculto usado en ImportButtons

  // Campos principales que van arriba del formulario
  const camposBasicos: FormFieldKey[] = [
    "esfuerzoAxil",
    "cargaAdmisible",
    "corteX",
    "corteY",
    "momentoX",
    "momentoY",
    "moduloBalasto",
  ];

  // El resto se considera "avanzado"
  const camposAvanzados = Object.keys(formData).filter(
    (key) => !["nombre", ...camposBasicos].includes(key)
  ) as FormFieldKey[];

  // Si viene baseId, trae la base para edición
  useEffect(() => {
    const fetchBase = async () => {
      if (baseId) {
        try {
          const { data } = await api.get<BaseHormigon>(
            `baseshormigon/${baseId}`
          );
          const { id, ...rest } = data; // extrae id y guarda solo los campos editables
          setFormData(rest);
        } catch (err) {
          console.error("Error fetching base data:", err);
          alert("No se pudo cargar la base.");
        }
      }
    };
    fetchBase();
  }, [baseId]);

  // Cambios para campos que contienen { valor, unidad, tipo }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: FormFieldKey
  ) => {
    const current = formData[key];

    // Seguridad: si es texto puro, no modifica acá
    if (typeof current === "string") return;

    setFormData({
      ...formData,
      [key]: {
        valor: parseFloat(e.target.value) || 0,
        unidad: current.unidad,
        tipo: current.tipo,
      },
    });
  };

  // Manejo de cambio de unidad (cm → m, por ejemplo)
  const handleUnitChange = (key: FormFieldKey, unidad: string) => {
    const current = formData[key];
    if (typeof current === "string") return;

    setFormData({
      ...formData,
      [key]: { ...current, unidad },
    });
  };

  // Para campos puramente textuales (como nombre)
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: FormFieldKey
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  // Guardado final (POST si nueva base, PUT si edición)
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
      {/* Componente para importar Excel o descargar plantilla */}
      <ImportButtons
        importing={importing}
        fileInputRef={fileInputRef}
        setImporting={setImporting}
        navigate={navigate}
      />

      <div className="card">
        <h2 className="title">Crear Nueva Base</h2>

        {/* Imagen ilustrativa de cargas */}
        <img src="/fotoCargas.png" className="fotoCargas" />

        <form onSubmit={handleSubmit} className="formGrid">
          {/* Campo de nombre */}
          <NombreInput
            value={formData.nombre}
            onChange={(e) => handleTextChange(e, "nombre")}
          />

          {/* Campos principales */}
          {camposBasicos.map((key) => (
            <CampoInput
              key={key}
              name={key}
              data={formData[key] as ValueUnitPair}
              onChange={(e) => handleChange(e, key)}
              onUnitChange={(unidad) => handleUnitChange(key, unidad)}
            />
          ))}

          {/* Botón para mostrar/ocultar ajustes avanzados */}
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

          {/* Campos avanzados (aparecen solo si se activan) */}
          {mostrarAvanzados &&
            camposAvanzados.map((key) => (
              <CampoInput
                key={key}
                name={key}
                data={formData[key] as ValueUnitPair}
                onChange={(e) => handleChange(e, key)}
                onUnitChange={(unidad) => handleUnitChange(key, unidad)}
              />
            ))}

          {/* Botón de submit */}
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
