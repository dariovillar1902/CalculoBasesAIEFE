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

  const MD = (base.porcentajeCargaD.valor / 100) * base.momentoX.valor;
  const ML = (base.porcentajeCargaL.valor / 100) * base.momentoX.valor;

  const ax = dimensionesBase.anchoX;
  const ay = dimensionesBase.anchoY;
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
          title="Momento Mayorado"
          tooltip={`P_D: Carga muerta<br/>P_L: Carga viva`}
          symbolic="M_u = \max \left( 1.4 M_D,\ 1.2 M_D + 1.6 M_L \right)"
          substituted={`P_u = \\max \\left( 1.4 \\cdot ${MD.toFixed(
            2
          )}\\ \\text{kN}, 1.2 \\cdot ${MD.toFixed(
            2
          )}\\ \\text{kN} + 1.6 \\cdot ${ML.toFixed(2)}\\ \\text{kN} \\right)`}
          result={calculoCuantia.momentoMayorado.toFixed(2)}
          unit="kN"
        />

        <FormulaBlock
          title="Excentricidad Mayorada"
          tooltip={`Pᵤ: Esfuerzo mayorado<br/>aₓ, aᵧ: Dimensiones`}
          symbolic="e_u = \frac{M_u}{P_u}"
          substituted={`e_u = \\frac{${calculoCuantia.momentoMayorado.toFixed(
            2
          )}\\ \\text{kNm}}{${calculoCuantia.esfuerzoAxilMayorado.toFixed(
            2
          )}\\ \\text{kN}}`}
          result={calculoCuantia.excentricidadMayorada.toFixed(2)}
          unit="m"
        />
        {/* Cargas Mayoradas Descompuestas */}
        <FormulaBlock
          title="Carga Mayorada 1"
          tooltip={`Pᵤ: Esfuerzo axial mayorado<br/>eᵤ: Excentricidad mayorada<br/>aₓ, aᵧ: Dimensiones`}
          symbolic="q_{u1} = \dfrac{P_u \left(1 + \dfrac{6 \cdot e_u}{a_x}\right)}{a_x \cdot a_y}"
          substituted={`q_{u1} = \\dfrac{${calculoCuantia.esfuerzoAxilMayorado.toFixed(
            2
          )}\\ \\text{kN} \\left(1 + \\dfrac{6\\,\\cdot \\,${calculoCuantia.excentricidadMayorada.toFixed(
            2
          )}\\ \\text{m}}{${ax.toFixed(2)}\\ \\text{m}}\\right)}{${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${ay.toFixed(2)}\\ \\text{m}}`}
          result={calculoCuantia.cargaMayorada1.toFixed(2)}
          unit="kN/m²"
        />

        {/* Cargas Mayoradas Descompuestas */}
        <FormulaBlock
          title="Carga Mayorada 2"
          tooltip={`Pᵤ: Esfuerzo axial mayorado<br/>eᵤ: Excentricidad mayorada<br/>aₓ, aᵧ: Dimensiones`}
          symbolic="q_{u1} = \dfrac{P_u \left(1 - \dfrac{6 \cdot e_u}{a_x}\right)}{a_x \cdot a_y}"
          substituted={`q_{u1} = \\dfrac{${calculoCuantia.esfuerzoAxilMayorado.toFixed(
            2
          )}\\ \\text{kN} \\left(1 - \\dfrac{6\\,\\cdot \\,${calculoCuantia.excentricidadMayorada.toFixed(
            2
          )}\\ \\text{m}}{${ax.toFixed(2)}\\ \\text{m}}\\right)}{${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${ay.toFixed(2)}\\ \\text{m}}`}
          result={calculoCuantia.cargaMayorada2.toFixed(2)}
          unit="kN/m²"
        />

        <FormulaBlock
          title="Carga Mayorada"
          tooltip={`qᵤ: Carga mayorada<br/>qᵤ₁, qᵤ₂: Cargas auxiliares<br/>aₓ: Dimensión en X<br/>vₓ: Vuelo en X`}
          symbolic={`q_{u} = q_{u1} - (q_{u1}  - q_{u2}) \\cdot \\frac{Vₓ}{2 \\cdot aₓ}`}
          substituted={`q_{u} = ${calculoCuantia.cargaMayorada1.toFixed(
            2
          )}\\ \\text{kN/m²} - 
    (${calculoCuantia.cargaMayorada1.toFixed(
      2
    )} \\ \\text{kN/m²} - ${calculoCuantia.cargaMayorada2.toFixed(
            2
          )} \\ \\text{kN/m²}) \\cdot \\frac{${dimensionesBase.vueloX.toFixed(
            2
          )} \\ \\text{m}}{2 \\cdot ${ax.toFixed(2)} \\ \\text{m}}`}
          result={calculoCuantia.cargaMayorada.toFixed(2)}
          unit="kN/m²"
        />

        <FormulaBlock
          title="Momento Mayorado X"
          tooltip={`Mᵤₓ: Momento mayorado en X<br/>aᵧ: Dimensión transversal<br/>vₓ: Vuelo en X`}
          symbolic={`M_{ux} = a_y \\cdot \\left(\\frac{V_{x}}{2}\\right)^2 \\cdot \\frac{q_{u} + 2 \\cdot q_{u1}}{6}`}
          substituted={`M_{ux} = ${ay.toFixed(2)}\\ \\text{m} \\cdot 
    \\left(\\frac{${dimensionesBase.vueloX.toFixed(
      2
    )}\\ \\text{m}}{2}\\right)^2 \\cdot 
    \\frac{${calculoCuantia.cargaMayorada.toFixed(
      2
    )}\\ \\text{kN/m²} + 2 \\cdot ${calculoCuantia.cargaMayorada1.toFixed(
            2
          )}\\ \\text{kN/m²}}{6}`}
          result={calculoCuantia.momentoMayoradoX.toFixed(2)}
          unit="kN·m"
        />

        <FormulaBlock
          title="Momento Mayorado Y"
          tooltip={`Mᵤᵧ: Momento mayorado en Y<br/>aₓ: Dimensión transversal<br/>vᵧ: Vuelo en Y`}
          symbolic={`M_{uy} = a_x \\cdot \\left(\\frac{V_{y}}{2}\\right)^2 \\cdot \\frac{q_{u1} + q_{u2}}{4}`}
          substituted={`M_{uy} = ${ax.toFixed(2)}\\ \\text{m} \\cdot 
    \\left(\\frac{${dimensionesBase.vueloY.toFixed(
      2
    )}\\ \\text{m}}{2}\\right)^2 \\cdot 
    \\frac{${calculoCuantia.cargaMayorada1.toFixed(
      2
    )}\\ \\text{kN/m²} + ${calculoCuantia.cargaMayorada2.toFixed(
            2
          )}\\ \\text{kN/m²}}{4}`}
          result={calculoCuantia.momentoMayoradoY.toFixed(2)}
          unit="kN·m"
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
