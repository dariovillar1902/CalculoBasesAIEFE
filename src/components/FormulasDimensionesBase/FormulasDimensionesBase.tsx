import "./FormulasDimensionesBase.scss";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import FormulaBlock from "../FormulaBlock/FormulaBlock";

type Props = {
  dimensionesBase: BaseHormigonDimensiones;
  base: BaseHormigon;
};

const FormulasDimensionesBase: React.FC<Props> = ({
  dimensionesBase,
  base,
}) => {
  const {
    esfuerzoAxil,
    cargaAdmisible,
    pesoEspecificoSuelo,
    nivelFundacion,
    anchoColumnaX,
    anchoColumnaY,
  } = base;
  const { anchoX, anchoY, area, altura, vueloX, vueloY, verificaVuelos } =
    dimensionesBase;

  return (
    <div className="katex-container">
      <div className="dimensiones-container">
        <h2 className="dimensiones-title">Dimensiones Base</h2>

        <FormulaBlock
          title="Área"
          tooltip={`P: Carga total<br/>qₐdₘ: Capacidad admisible<br/>γ′: Peso específico<br/>Df: Profundidad`}
          symbolic="A = 1.05 \cdot \frac{P}{q_{adm} - \gamma^{\prime} D_f} \approx a_x a_y"
          substituted={`A = 1.05 \\cdot \\frac{${esfuerzoAxil.valor}\\ \\text{kN}}{${cargaAdmisible.valor}\\ \\text{kN/m}^2 - ${pesoEspecificoSuelo.valor}\\ \\text{kN/m}^3 \\cdot ${nivelFundacion.valor}\\ \\text{m}}`}
          result={area.toFixed(2)}
          unit="m²"
        />

        <FormulaBlock
          title="Ancho X"
          tooltip={`Aₙₑc: Área necesaria<br/>cₓ, cᵧ: Excentricidades`}
          symbolic="a_x = \sqrt{A_{nec} + \frac{(c_x - c_y)^2}{4}} + \frac{c_x - c_y}{2}"
          substituted={`a_x = \\sqrt{${area.toFixed(
            2
          )}\\ \\text{m}^2 + \\frac{(${anchoColumnaX.valor}\\ \\text{m} - ${
            anchoColumnaY.valor
          }\\ \\text{m})^2}{4}} + \\frac{${anchoColumnaX.valor}\\ \\text{m} - ${
            anchoColumnaY.valor
          }\\ \\text{m}}{2}`}
          result={anchoX.toFixed(2)}
          unit="m"
        />

        <FormulaBlock
          title="Ancho Y"
          tooltip={`Aₙₑc: Área necesaria<br/>cₓ, cᵧ: Excentricidades`}
          symbolic="a_y = \sqrt{A_{nec} + \frac{(c_x - c_y)^2}{4}} - \frac{c_x - c_y}{2}"
          substituted={`a_y = \\sqrt{${area.toFixed(
            2
          )}\\ \\text{m}^2 + \\frac{(${anchoColumnaX.valor}\\ \\text{m} - ${
            anchoColumnaY.valor
          }\\ \\text{m})^2}{4}} - \\frac{${anchoColumnaX.valor}\\ \\text{m} - ${
            anchoColumnaY.valor
          }\\ \\text{m}}{2}`}
          result={anchoY.toFixed(2)}
          unit="m"
        />

        <FormulaBlock
          title="Altura"
          tooltip={`aₓₐdₒₚ, aᵧₐdₒₚ: Dimensiones adoptadas<br/>cₓ, cᵧ: Excentricidades`}
          symbolic="h \geq \max \left( \frac{a_{x\text{adop}} - c_x}{5},\ \frac{a_{y\text{adop}} - c_y}{5},\ 25\ \text{cm} \right)"
          substituted={`h \\geq \\max \\left( \\frac{${anchoX.toFixed(
            2
          )}\\ \\text{m} - ${
            anchoColumnaX.valor
          }\\ \\text{m}}{5}, \\frac{${anchoY.toFixed(2)}\\ \\text{m} - ${
            anchoColumnaY.valor
          }\\ \\text{m}}{5}, 0.25\\ \\text{m} \\right)`}
          result={altura.toFixed(2)}
          unit="m"
        />

        <FormulaBlock
          title="Verifica Vuelos"
          tooltip={`Vₓ, Vᵧ: Vuelos en cada dirección<br/>Diferencia debe ser menor a 20 cm`}
          symbolic="\left| V_x - V_y \right| < 20\ \text{cm}"
          substituted={`\\left| V_x - V_y \\right| = ${Math.abs(
            vueloX - vueloY
          ).toFixed(2)}\\ \\text{m}`}
          result={verificaVuelos ? "Sí" : "No"}
        />
      </div>
    </div>
  );
};

export default FormulasDimensionesBase;
