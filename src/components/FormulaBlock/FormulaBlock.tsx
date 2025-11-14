// Componente que permite mostrar una fórmula matemática con su resultado y explicación
import { BlockMath } from "react-katex"; // Muestra fórmulas matemáticas en formato LaTeX
import FormulaResult from "../FormulaResult/FormulaResult"; // Componente que muestra el resultado final con unidad
import Tooltip from "../Tooltip/Tooltip"; // Componente que muestra una ayuda emergente al pasar el mouse

// Define las propiedades que recibe el componente
type Props = {
  title: string; // Título del bloque (ej: "Momento flector")
  tooltip: string; // Texto explicativo que aparece como ayuda
  symbolic: string; // Fórmula simbólica (ej: M = F × d)
  substituted: string; // Fórmula con valores reemplazados (ej: M = 10 × 2)
  result: string; // Resultado final del cálculo (ej: "20")
  unit?: string; // Unidad del resultado (ej: "kNm")
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas
  reference?: string; // Fuente o reglamento de referencia (opcional)
};

// Componente visual que muestra una fórmula con su resultado y explicación
const FormulaBlock: React.FC<Props> = ({
  title,
  tooltip,
  symbolic,
  substituted,
  result,
  unit,
  showFormulas,
  reference,
}) => (
  <div className="dimensiones-item">
    {/* Título del bloque con ícono de ayuda */}
    <h3>
      {title}
      <Tooltip text={tooltip} />
    </h3>

    {/* Muestra la fórmula simbólica si está habilitado */}
    {showFormulas && <BlockMath math={symbolic} />}
    {/* Muestra la fórmula con valores reemplazados si está habilitado */}
    {showFormulas && <BlockMath math={substituted} />}

    {/* Muestra el resultado final con su unidad */}
    <FormulaResult value={result} unit={unit} />

    {/* Muestra la referencia normativa si está disponible */}
    {reference && <p className="formula-reference">{reference}</p>}
  </div>
);

export default FormulaBlock;
