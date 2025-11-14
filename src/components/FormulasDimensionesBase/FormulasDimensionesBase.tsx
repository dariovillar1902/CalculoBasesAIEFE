// Importa los estilos específicos para mostrar fórmulas de dimensiones
import "./FormulasDimensionesBase.scss";

// Tipos que definen la estructura de los datos utilizados en el cálculo
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";

// Componente que muestra una fórmula con su resultado y explicación
import FormulaBlock from "../FormulaBlock/FormulaBlock";

// Define las propiedades que recibe el componente
type Props = {
  dimensionesBase: BaseHormigonDimensiones; // Resultados calculados de las dimensiones de la base
  base: BaseHormigon; // Datos generales de entrada para el cálculo
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

// Componente que muestra las fórmulas utilizadas para calcular las dimensiones de la base de hormigón
const FormulasDimensionesBase: React.FC<Props> = ({
  dimensionesBase,
  base,
  showFormulas,
}) => {
  // Extrae los valores calculados desde el objeto de dimensiones
  const { area, anchoX, anchoY, altura, vueloX, vueloY } = dimensionesBase;

  return (
    <div className="katex-container">
      <div className="dimensiones-container">
        <h2 className="dimensiones-title">Dimensiones Base</h2>

        {/* Cálculo del área necesaria para soportar la carga de diseño */}
        <FormulaBlock
          title="Área Necesaria"
          tooltip="Área necesaria para soportar la carga de diseño con la tensión admisible"
          symbolic="A = \frac{1.05 \cdot P}{q_{adm} - \gamma \cdot h_f}"
          substituted={`A = \\frac{1.05 \\cdot ${base.esfuerzoAxil.valor.toFixed(
            2
          )}\\ \\text{kN}}{${base.cargaAdmisible.valor.toFixed(
            2
          )}\\ \\text{kN/m}^2 - ${base.pesoEspecificoSuelo.valor.toFixed(
            2
          )}\\ \\text{kN/m}^3 \\cdot ${base.nivelFundacion.valor.toFixed(
            2
          )}\\ \\text{m}}`}
          result={area.toFixed(2)}
          unit="m²"
          showFormulas={showFormulas}
        />

        {/* Cálculo del ancho en dirección X considerando diferencia de columnas */}
        <FormulaBlock
          title="Ancho X"
          tooltip="Ancho X calculado considerando diferencia de columnas"
          symbolic="a_x = \sqrt{A + \frac{(c_x - c_y)^2}{4}} + \frac{c_x - c_y}{2}"
          substituted={`a_x = \\sqrt{${area.toFixed(
            2
          )}\\ \\text{m}^2 + \\frac{(${base.anchoColumnaX.valor.toFixed(
            2
          )}\\ \\text{m} - ${base.anchoColumnaY.valor.toFixed(
            2
          )}\\ \\text{m})^2}{4}} + \\frac{${base.anchoColumnaX.valor.toFixed(
            2
          )}\\ \\text{m} - ${base.anchoColumnaY.valor.toFixed(
            2
          )}\\ \\text{m}}{2}`}
          result={anchoX.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        {/* Cálculo del ancho en dirección Y considerando diferencia de columnas */}
        <FormulaBlock
          title="Ancho Y"
          tooltip="Ancho Y calculado considerando diferencia de columnas"
          symbolic="a_y = \sqrt{A + \frac{(c_x - c_y)^2}{4}} - \frac{c_x - c_y}{2}"
          substituted={`a_y = \\sqrt{${area.toFixed(
            2
          )}\\ \\text{m}^2 + \\frac{(${base.anchoColumnaX.valor.toFixed(
            2
          )}\\ \\text{m} - ${base.anchoColumnaY.valor.toFixed(
            2
          )}\\ \\text{m})^2}{4}} - \\frac{${base.anchoColumnaX.valor.toFixed(
            2
          )}\\ \\text{m} - ${base.anchoColumnaY.valor.toFixed(
            2
          )}\\ \\text{m}}{2}`}
          result={anchoY.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        {/* Cálculo de la altura mínima de la base según los vuelos */}
        <FormulaBlock
          title="Altura"
          tooltip="Altura mínima según vuelos: max(VueloX/5, VueloY/5, 0.25 m)"
          symbolic="h = \max(\frac{V_x}{5}, \frac{V_y}{5}, 0.25 \ m)"
          substituted={`h = \\max\\left(\\frac${vueloX.toFixed(
            2
          )}\\ \\text{m}}{5}, \\frac${vueloY.toFixed(
            2
          )}\\ \\text{m}}{5}, 0.25\\ \\text{m}\\right)`}
          result={altura.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasDimensionesBase;
