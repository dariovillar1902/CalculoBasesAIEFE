import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { fieldDescriptions, unitOptions } from "../../utils/constants";
import "./CampoInput.scss";

interface CampoInputProps {
  name: string;
  data: { valor: number; unidad: string; tipo: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (unidad: string) => void;
}

const CampoInput: React.FC<CampoInputProps> = ({
  name,
  data,
  onChange,
  onUnitChange,
}) => {
  const formatLabel = (key: string): string =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div>
      <label className="label">
        {formatLabel(name)}
        <span className="tooltipWrapper">
          <FontAwesomeIcon icon={faCircleInfo} className="tooltipIcon" />
          <span className="tooltipText">{fieldDescriptions[name]}</span>
        </span>
      </label>
      <div className="inputGroup">
        <input
          type="number"
          name={name}
          value={data && data.valor !== 0 ? data.valor : undefined}
          onChange={onChange}
          className="input inputNumber"
          required
        />
        <select
          className="selectUnit"
          value={data && data.unidad}
          onChange={(e) => onUnitChange(e.target.value)}
        >
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
