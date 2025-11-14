import React from "react";
// Ícono de información que se muestra junto a cada campo
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// Diccionario con descripciones de cada campo y opciones de unidades según el tipo
import { fieldDescriptions, unitOptions } from "../../utils/constants";
// Estilos específicos para este componente
import "./CampoInput.scss";

// Define las propiedades que recibe el componente CampoInput
interface CampoInputProps {
  name: string; // Nombre del campo (clave identificadora)
  data: { valor: number; unidad: string; tipo: string }; // Datos actuales del campo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función que se ejecuta al cambiar el valor numérico
  onUnitChange: (unidad: string) => void; // Función que se ejecuta al cambiar la unidad
}

// Componente que representa un campo de entrada con número y unidad
const CampoInput: React.FC<CampoInputProps> = ({
  name,
  data,
  onChange,
  onUnitChange,
}) => {
  // Convierte el nombre del campo en un texto legible (ej: "momentoX" → "Momento X")
  const formatLabel = (key: string): string =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div>
      {/* Etiqueta del campo con ícono de ayuda */}
      <label className="label">
        {formatLabel(name)}
        <span className="tooltipWrapper">
          {/* Ícono que muestra una descripción al pasar el mouse */}
          <FontAwesomeIcon icon={faCircleInfo} className="tooltipIcon" />
          <span className="tooltipText">{fieldDescriptions[name]}</span>
        </span>
      </label>

      {/* Grupo que contiene el input numérico y el selector de unidad */}
      <div className="inputGroup">
        {/* Campo para ingresar el valor numérico */}
        <input
          type="number"
          name={name}
          value={data && data.valor !== 0 ? data.valor : undefined} // Evita mostrar "0" por defecto
          onChange={onChange}
          className="input inputNumber"
          required
        />

        {/* Selector para elegir la unidad correspondiente al tipo de dato */}
        <select
          className="selectUnit"
          value={data && data.unidad}
          onChange={(e) => onUnitChange(e.target.value)}
        >
          {/* Muestra las unidades disponibles según el tipo de campo */}
          {unitOptions[data && data.tipo]?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CampoInput;
