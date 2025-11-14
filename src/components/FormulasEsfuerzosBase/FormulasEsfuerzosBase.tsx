// Importa los estilos específicos para mostrar fórmulas de esfuerzos
import "./FormulasEsfuerzosBase.scss";

// Importa el componente que muestra cada fórmula con su resultado
import FormulaBlock from "../FormulaBlock/FormulaBlock";

// Tipos que definen la estructura de los datos utilizados en el cálculo
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonEsfuerzos } from "../../types/BaseHormigonEsfuerzos";

// Define las propiedades que recibe el componente
type Props = {
  base: BaseHormigon; // Datos generales de la base de hormigón
  dimensionesBase: BaseHormigonDimensiones; // Dimensiones físicas de la base
  esfuerzosBase: BaseHormigonEsfuerzos; // Resultados del cálculo de esfuerzos
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

// Componente que muestra las fórmulas utilizadas para calcular los esfuerzos sobre la base
const FormulasEsfuerzosBase: React.FC<Props> = ({
  base,
  dimensionesBase,
  esfuerzosBase,
  showFormulas,
}) => {
  // Extrae las dimensiones necesarias para los cálculos
  const { anchoX: b_x, anchoY: b_y, altura: h } = dimensionesBase;

  return (
    <div className="katex-container">
      <div className="esfuerzos-container">
        <h2 className="esfuerzos-title">Esfuerzos en la Base</h2>

        {/* Cálculo del esfuerzo normal total sobre la base */}
        <FormulaBlock
          title="Esfuerzo Normal Total"
          tooltip="Incluye carga aplicada, peso propio del hormigón y peso del suelo sobre la base"
          symbolic={`N = N_{0} + a_{x} \\cdot a_{y} \\cdot h \\cdot \\gamma_{H°A°} + a_{x} \\cdot a_{y} \\cdot (h_{f} - h) \\cdot \\gamma_{s}`}
          substituted={`N = ${base.esfuerzoAxil.valor.toFixed(
            2
          )}\\ \\text{kN} + ${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(
            2
          )}\\ \\text{m} \\cdot ${h.toFixed(
            2
          )}\\ \\text{m} \\cdot ${base.pesoEspecificoHormigon.valor.toFixed(
            2
          )}\\ \\text{kN/m³} + ${b_x.toFixed(
            2
          )}\\ \\text{m} \\cdot ${b_y.toFixed(
            2
          )}\\ \\text{m} \\cdot (${base.nivelFundacion.valor.toFixed(
            2
          )}\\ \\text{m} - ${h.toFixed(
            2
          )}\\ \\text{m}) \\cdot ${base.pesoEspecificoSuelo.valor.toFixed(
            2
          )}\\ \\text{kN/m³}`}
          result={esfuerzosBase.normal.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Cálculo del momento total en dirección X */}
        <FormulaBlock
          title="Momento en X"
          tooltip="Momento total respecto a X, incluye efecto de la carga cortante en X"
          symbolic={`M_{x} = M_{0x} + V_{x} \\cdot h`}
          substituted={`M_{x} = ${base.momentoX.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m} + ${base.corteX.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot ${dimensionesBase.altura.toFixed(
            2
          )}\\ \\text{m}`}
          result={esfuerzosBase.momentoX.toFixed(2)}
          unit="kN·m"
          showFormulas={showFormulas}
        />

        {/* Cálculo del momento total en dirección Y */}
        <FormulaBlock
          title="Momento en Y"
          tooltip="Momento total respecto a Y, incluye efecto de la carga cortante en Y"
          symbolic={`M_{y} = M_{0y} + V_{y} \\cdot h`}
          substituted={`M_{y} = ${base.momentoY.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m} + ${base.corteY.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot ${dimensionesBase.altura.toFixed(
            2
          )}\\ \\text{m}`}
          result={esfuerzosBase.momentoY.toFixed(2)}
          unit="kN·m"
          showFormulas={showFormulas}
        />

        {/* Cálculo del esfuerzo cortante en dirección X */}
        <FormulaBlock
          title="Corte en X"
          tooltip="Carga cortante en X"
          symbolic={`V_{x} = V_{0x} `}
          substituted={`V_{x} = ${base.corteX.valor.toFixed(2)}\\ \\text{kN}`}
          result={esfuerzosBase.corteX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Cálculo del esfuerzo cortante en dirección Y */}
        <FormulaBlock
          title="Corte en Y"
          tooltip="Carga cortante en Y"
          symbolic={`V_{y} = V_{0y} `}
          substituted={`V_{y} = ${base.corteY.valor.toFixed(2)}\\ \\text{kN}`}
          result={esfuerzosBase.corteY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasEsfuerzosBase;
