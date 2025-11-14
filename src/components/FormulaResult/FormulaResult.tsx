// Íconos que se usan para representar flechas, confirmaciones y rechazos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight, // Flecha que indica el paso hacia el resultado
  faCheck, // Ícono de "Sí" (aprobado)
  faXmark, // Ícono de "No" (rechazado)
} from "@fortawesome/free-solid-svg-icons";

// Define las propiedades que recibe el componente
type Props = {
  value: string; // Resultado del cálculo (puede ser numérico o texto como "Sí"/"No")
  unit?: string; // Unidad del resultado (opcional)
};

// Componente que muestra el resultado de una fórmula con íconos visuales
const FormulaResult: React.FC<Props> = ({ value, unit }) => (
  <>
    {/* Flecha que indica que se está mostrando el resultado */}
    <FontAwesomeIcon icon={faArrowRight} className="arrowIcon" />

    <h3>
      {/* Si la unidad es "$", se muestra antes del valor (por formato monetario) */}
      {unit === "$" && unit}
      {/* Muestra el valor del resultado */}
      {value} {/* Si el valor es "Sí", se muestra un ícono de aprobación */}
      {value === "Sí" && (
        <FontAwesomeIcon icon={faCheck} size="lg" className="checkIcon" />
      )}
      {/* Si el valor es "No", se muestra un ícono de rechazo */}
      {value === "No" && (
        <FontAwesomeIcon icon={faXmark} size="lg" className="xMarkIcon" />
      )}
      {/* Si la unidad no es "$", se muestra después del valor */}
      {unit !== "$" && unit}
    </h3>
  </>
);

export default FormulaResult;
