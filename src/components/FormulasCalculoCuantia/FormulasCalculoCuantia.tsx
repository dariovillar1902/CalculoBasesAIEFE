import "./FormulasCalculoCuantia.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";

type Props = {
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
  calculoCuantia: BaseHormigonCuantia;
};

const FormulasCalculoCuantia: React.FC<Props> = ({
  base,
  dimensionesBase,
  calculoCuantia,
}) => {
  const PD = (base.porcentajeCargaD.valor / 100) * base.esfuerzoAxil.valor;
  const PL = (base.porcentajeCargaL.valor / 100) * base.esfuerzoAxil.valor;

  const ax = dimensionesBase.anchoX;
  const ay = dimensionesBase.anchoY;
  const cx = base.anchoColumnaX.valor;
  const cy = base.anchoColumnaY.valor;
  const d = dimensionesBase.altura - base.recubrimientoHormigon.valor - 0.02;

  return (
    <div className="katex-container">
      <div className="cuantia-container">
        <h2 className="cuantia-title">Cálculo de Cuantía</h2>

        <FormulaBlock
          title="Esfuerzo Axial Mayorado"
          tooltip={`P_D: Carga muerta<br/>P_L: Carga viva`}
          symbolic="P_u = \max \left( 1.4 P_D,\ 1.2 P_D + 1.6 P_L \right)"
          substituted={`P_u = \\max \\left( 1.4 \\cdot ${PD.toFixed(
            2
          )}\\ \\text{kN}, 1.2 \\cdot ${PD.toFixed(
            2
          )}\\ \\text{kN} + 1.6 \\cdot ${PL.toFixed(2)}\\ \\text{kN} \\right)`}
          result={calculoCuantia.esfuerzoAxilMayorado.toFixed(2)}
          unit="kN"
        />

        <FormulaBlock
          title="Carga Mayorada"
          tooltip={`Pᵤ: Esfuerzo mayorado<br/>aₓ, aᵧ: Dimensiones`}
          symbolic="q_u = \frac{P_u}{a_x \cdot a_y}"
          substituted={`q_u = \\frac{${calculoCuantia.esfuerzoAxilMayorado.toFixed(
            2
          )}\\ \\text{kN}}{${ax.toFixed(2)}\\ \\text{m} \\cdot ${ay.toFixed(
            2
          )}\\ \\text{m}}`}
          result={calculoCuantia.cargaMayorada.toFixed(2)}
          unit="kN/m²"
        />

        <FormulaBlock
          title="Momento Mayorado X"
          tooltip={`qᵤ: Carga mayorada<br/>aₓ, cₓ: Dimensión y excentricidad<br/>aᵧ: Dimensión transversal`}
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
        />

        <FormulaBlock
          title="Momento Mayorado Y"
          tooltip={`qᵤ: Carga mayorada<br/>aᵧ, cᵧ: Dimensión y excentricidad<br/>aₓ: Dimensión transversal`}
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
        />

        <FormulaBlock
          title="Área Acero X"
          tooltip={`ρₓ: Cuantía de acero<br/>aᵧ: Dimensión<br/>d: Altura útil`}
          symbolic="A_{sx} = \rho_x \cdot a_y \cdot d"
          substituted={`A_{sx} = ${calculoCuantia.cuantiaAdoptadaX.toFixed(
            4
          )} \\cdot ${ay.toFixed(2)}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}`}
          result={calculoCuantia.areaAceroX.toFixed(2)}
          unit="cm²"
        />

        <FormulaBlock
          title="Área Acero Y"
          tooltip={`ρᵧ: Cuantía de acero<br/>aₓ: Dimensión<br/>d: Altura útil`}
          symbolic="A_{sy} = \rho_y \cdot a_x \cdot d"
          substituted={`A_{sy} = ${calculoCuantia.cuantiaAdoptadaY.toFixed(
            4
          )} \\cdot ${ax.toFixed(2)}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}`}
          result={calculoCuantia.areaAceroY.toFixed(2)}
          unit="cm²"
        />
      </div>
    </div>
  );
};

export default FormulasCalculoCuantia;
