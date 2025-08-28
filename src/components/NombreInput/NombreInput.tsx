import React from "react";
import "./NombreInput.scss";

interface NombreInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NombreInput: React.FC<NombreInputProps> = ({ value, onChange }) => (
  <div className="fullWidth">
    <label className="label">Nombre</label>
    <input
      type="text"
      name="nombre"
      value={value}
      onChange={onChange}
      maxLength={140}
      className="input"
      required
    />
  </div>
);

export default NombreInput;
