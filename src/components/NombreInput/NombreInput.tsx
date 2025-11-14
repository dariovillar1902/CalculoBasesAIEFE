import React from "react";
import "./NombreInput.scss";

interface NombreInputProps {
  value: string;
  // Valor actual del campo de texto

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Función que se ejecuta cuando el usuario escribe algo en el input
}

const NombreInput: React.FC<NombreInputProps> = ({ value, onChange }) => (
  <div className="fullWidth">
    {/* Etiqueta del campo */}
    <label className="label">Nombre</label>

    {/* Input controlado: el valor viene por props y onChange actualiza el estado padre */}
    <input
      type="text"
      name="nombre"
      value={value}
      onChange={onChange}
      maxLength={140} // Limita la longitud del nombre
      className="input"
      required // Indica que el campo es obligatorio
    />
  </div>
);

export default NombreInput;
