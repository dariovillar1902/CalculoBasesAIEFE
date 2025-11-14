// Importa los estilos específicos para mostrar fórmulas de cuantía
import "./FormulasCalculoCuantia.scss";
// Componente que muestra una fórmula con su resultado y explicación
import FormulaBlock from "../FormulaBlock/FormulaBlock";

// Tipos que definen la estructura de los datos utilizados en el cálculo
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";

// Define las propiedades que recibe el componente
type Props = {
  base: BaseHormigon; // Datos generales de la base de hormigón
  dimensionesBase: BaseHormigonDimensiones; // Dimensiones físicas de la base
  calculoCuantia: BaseHormigonCuantia; // Resultados del cálculo de cuantía
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

// Componente que muestra las fórmulas utilizadas para calcular la cuantía de acero
const FormulasCalculoCuantia: React.FC<Props> = ({
  base,
  dimensionesBase,
  calculoCuantia,
  showFormulas,
}) => {
  // Calcula la carga muerta (PD) y carga viva (PL) en función del esfuerzo axial
  const PD = (base.porcentajeCargaD.valor / 100) * base.esfuerzoAxil.valor;
  const PL = (base.porcentajeCargaL.valor / 100) * base.esfuerzoAxil.valor;

  // Extrae dimensiones de la base y columna
  const ax = dimensionesBase.anchoX;
  const ay = dimensionesBase.anchoY;
  const cx = base.anchoColumnaX.valor;
  const cy = base.anchoColumnaY.valor;

  // Calcula la altura útil de la base (d), descontando recubrimiento y diámetro de barra
  const d = dimensionesBase.altura - base.recubrimientoHormigon.valor - 0.02;

  return (
    <div className="katex-container">
      <div className="cuantia-container">
        <h2 className="cuantia-title">Cálculo de Cuantía</h2>

        {/* Cálculo del esfuerzo axial mayorado según combinaciones de carga */}
        <FormulaBlock
          title="Esfuerzo Axial Mayorado"
          tooltip={`PD: Carga muerta<br/>PL: Carga viva`}
          symbolic="P_u = \max \left( 1.4 P_D,\ 1.2 P_D + 1.6 P_L \right)"
          substituted={`P_u = \\max \\left( 1.4 \\cdot ${PD.toFixed(
            2
          )}\\ \\text{kN}, 1.2 \\cdot ${PD.toFixed(
            2
          )}\\ \\text{kN} + 1.6 \\cdot ${PL.toFixed(2)}\\ \\text{kN} \\right)`}
          result={calculoCuantia.esfuerzoAxilMayorado.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Cálculo de carga mayorada sobre la base */}
        <FormulaBlock
          title="Carga Mayorada"
          tooltip={`Pu: Esfuerzo mayorado<br/>ax, ay: Dimensiones`}
          symbolic="q_u = \frac{P_u}{a_x \cdot a_y}"
          substituted={`q_u = \\frac${calculoCuantia.esfuerzoAxilMayorado.toFixed(
            2
          )}\\ \\text{kN}}{${ax.toFixed(2)}\\ \\text{m} \\cdot ${ay.toFixed(
            2
          )}\\ \\text{m}}`}
          result={calculoCuantia.cargaMayorada.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        {/* Cálculo del momento flector mayorado en dirección X */}
        <FormulaBlock
          title="Momento Mayorado X"
          tooltip={`qu: Carga mayorada<br/>ax, cx: Dimensión y excentricidad<br/>ay: Dimensión transversal`}
          symbolic="M_{ux} = q_u \cdot \frac{(a_x - c_x)^2}{8} \cdot a_y"
          substituted={`M_{ux} = ${calculoCuantia.cargaMayorada.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot \\frac{(${ax.toFixed(
            2
          )}\\ \\text{m} - ${cx}\\ \\text{m})^2}{8} \\cdot ${ay.toFixed(
            2
          )}\\ \\text{m}`}
          result={calculoCuantia.momentoMayoradoX.toFixed(2)}
          unit="kN · m"
          showFormulas={showFormulas}
        />

        {/* Cálculo del momento flector mayorado en dirección Y */}
        <FormulaBlock
          title="Momento Mayorado Y"
          tooltip={`qu: Carga mayorada<br/>ay, cy: Dimensión y excentricidad<br/>ax: Dimensión transversal`}
          symbolic="M_{uy} = q_u \cdot \frac{(a_y - c_y)^2}{8} \cdot a_x"
          substituted={`M_{uy} = ${calculoCuantia.cargaMayorada.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot \\frac{(${ay.toFixed(
            2
          )}\\ \\text{m} - ${cy}\\ \\text{m})^2}{8} \\cdot ${ax.toFixed(
            2
          )}\\ \\text{m}`}
          result={calculoCuantia.momentoMayoradoY.toFixed(2)}
          unit="kN · m"
          showFormulas={showFormulas}
        />

        {/* Cálculo del área de acero necesaria en dirección X */}
        <FormulaBlock
          title="Área Acero X"
          tooltip={`ρx: Cuantía de acero<br/>ay: Dimensión<br/>d: Altura útil`}
          symbolic="A_{sx} = \rho_x \cdot a_y \cdot d"
          substituted={`A_{sx} = ${calculoCuantia.cuantiaAdoptadaX.toFixed(
            4
          )} \\cdot ${ay.toFixed(2)}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}`}
          result={calculoCuantia.areaAceroX.toFixed(2)}
          unit="cm²"
          showFormulas={showFormulas}
        />

        {/* Cálculo del área de acero necesaria en dirección Y */}
        <FormulaBlock
          title="Área Acero Y"
          tooltip={`ρy: Cuantía de acero<br/>ax: Dimensión<br/>d: Altura útil`}
          symbolic="A_{sy} = \rho_y \cdot a_x \cdot d"
          substituted={`A_{sy} = ${calculoCuantia.cuantiaAdoptadaY.toFixed(
            4
          )} \\cdot ${ax.toFixed(2)}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}`}
          result={calculoCuantia.areaAceroY.toFixed(2)}
          unit="cm²"
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasCalculoCuantia;
