import "./FormulasVerificacionCorte.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonVerificacionCorte } from "../../types/BaseHormigonVerificacionCorte";

type Props = {
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
  verificaCorte: BaseHormigonVerificacionCorte;
  showFormulas: boolean;
};

const FormulasVerificacionCorte: React.FC<Props> = ({
  base,
  dimensionesBase,
  verificaCorte,
  showFormulas,
}) => {
  const P = base.esfuerzoAxil.valor;
  const ax = dimensionesBase.anchoX;
  const ay = dimensionesBase.anchoY;
  const gammaHA = base.pesoEspecificoHormigon.valor;
  const gammaPrima = base.pesoEspecificoSuelo.valor;
  const h = dimensionesBase.altura;
  const Df = base.nivelFundacion.valor;
  const cx = base.anchoColumnaX.valor;
  const cy = base.anchoColumnaY.valor;
  const d = h - base.recubrimientoHormigon.valor - 0.02;
  const fc = base.resistenciaCaracteristicaHormigon.valor;

  return (
    <div className="katex-container">
      <div className="corte-container">
        <h2 className="corte-title">Verificación de Corte</h2>

        <FormulaBlock
          title="Carga Total"
          tooltip={`P: Carga<br/>aₓ, aᵧ: Dimensiones<br/>γₕₐ: Peso hormigón armado<br/>γ′: Peso específico del suelo<br/>h: Altura<br/>Df: Profundidad de fundación`}
          symbolic="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h)"
          substituted={`q = \\frac{${P}\\ \\text{kN}}{${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${ay.toFixed(
            2
          )}\\ \\text{m}} + ${gammaHA}\\ \\text{kN/m}^3 \\cdot ${h.toFixed(
            2
          )}\\ \\text{m} + ${gammaPrima}\\ \\text{kN/m}^3 \\cdot (${Df}\\ \\text{m} - ${h.toFixed(
            2
          )}\\ \\text{m})`}
          result={verificaCorte.cargaTotal.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia Requerida en X"
          tooltip={`q: Carga total<br/>aₓ, aᵧ: Dimensiones<br/>cₓ: Excentricidad<br/>d: Altura útil`}
          symbolic="V_{ux} = q \cdot \left( \frac{a_x - c_x}{2} - d \right) \cdot a_y"
          substituted={`V_{ux} = ${verificaCorte.cargaTotal.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot \\left( \\frac{${ax.toFixed(
            2
          )}\\ \\text{m} - ${cx}\\ \\text{m}}{2} - ${d.toFixed(
            2
          )}\\ \\text{m} \\right) \\cdot ${ay.toFixed(2)}\\ \\text{m}`}
          result={verificaCorte.resistenciaRequeridaX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia Requerida en Y"
          tooltip={`q: Carga total<br/>aₓ, aᵧ: Dimensiones<br/>cᵧ: Excentricidad<br/>d: Altura útil`}
          symbolic="V_{uy} = q \cdot \left( \frac{a_y - c_y}{2} - d \right) \cdot a_x"
          substituted={`V_{uy} = ${verificaCorte.cargaTotal.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot \\left( \\frac{${ay.toFixed(
            2
          )}\\ \\text{m} - ${cy}\\ \\text{m}}{2} - ${d.toFixed(
            2
          )}\\ \\text{m} \\right) \\cdot ${ax.toFixed(2)}\\ \\text{m}`}
          result={verificaCorte.resistenciaRequeridaY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia Nominal en X"
          tooltip={`aᵧ: Dimensión<br/>d: Altura útil<br/>f′c: Resistencia del concreto`}
          symbolic="V_{nx} = a_y \cdot d \cdot \frac{\sqrt{f'_c}}{6}"
          substituted={`V_{nx} = ${ay.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\frac{\\sqrt{${fc}\\ \\text{MPa}}}{6}`}
          result={verificaCorte.resistenciaNominalX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia Nominal en Y"
          tooltip={`aₓ: Dimensión<br/>d: Altura útil<br/>f′c: Resistencia del concreto`}
          symbolic="V_{ny} = a_x \cdot d \cdot \frac{\sqrt{f'_c}}{6}"
          substituted={`V_{ny} = ${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\frac{\\sqrt{${fc}\\ \\text{MPa}}}{6}`}
          result={verificaCorte.resistenciaNominalY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia de Diseño en X"
          tooltip={`Vₙₓ: Resistencia nominal<br/>Factor de reducción: 0.75`}
          symbolic="V_{dx} = 0.75 \cdot V_{nx}"
          substituted={`V_{dx} = 0.75 \\cdot ${verificaCorte.resistenciaNominalX.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaCorte.resistenciaDisenoX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia de Diseño en Y"
          tooltip={`Vₙᵧ: Resistencia nominal<br/>Factor de reducción: 0.75`}
          symbolic="V_{dy} = 0.75 \cdot V_{ny}"
          substituted={`V_{dy} = 0.75 \\cdot ${verificaCorte.resistenciaNominalY.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaCorte.resistenciaDisenoY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación a Corte"
          tooltip={`Verifica que Vᵤₓ ≤ V_dₓ y Vᵤᵧ ≤ V_dᵧ<br/>Si ambas condiciones se cumplen, la base es segura frente al corte`}
          symbolic="V_{ux} \leq V_{dx}, \quad V_{uy} \leq V_{dy}"
          substituted={`V_{ux} = ${verificaCorte.resistenciaRequeridaX.toFixed(
            2
          )}\\ \\text{kN} \\leq ${verificaCorte.resistenciaDisenoX.toFixed(
            2
          )}\\ \\text{kN},\\quad V_{uy} = ${verificaCorte.resistenciaRequeridaY.toFixed(
            2
          )}\\ \\text{kN} \\leq ${verificaCorte.resistenciaDisenoY.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaCorte.cumpleVerificacion ? "Sí" : "No"}
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasVerificacionCorte;
