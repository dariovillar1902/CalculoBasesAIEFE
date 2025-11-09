import "./FormulasVerificacionPunzonado.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonVerificacionPunzonado } from "../../types/BaseHormigonVerificacionPunzonado";

type Props = {
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
  verificaPunzonado: BaseHormigonVerificacionPunzonado;
  showFormulas: boolean;
};

const FormulasVerificacionPunzonado: React.FC<Props> = ({
  base,
  dimensionesBase,
  verificaPunzonado,
  showFormulas,
}) => {
  const PD = (base.porcentajeCargaD.valor / 100) * base.esfuerzoAxil.valor;
  const PL = (base.porcentajeCargaL.valor / 100) * base.esfuerzoAxil.valor;
  const Pu = Math.max(1.4 * PD, 1.2 * PD + 1.6 * PL);

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
      <div className="punzonado-container">
        <h2 className="punzonado-title">Verificación de Punzonado</h2>

        <FormulaBlock
          title="Esfuerzo Axial Mayorado"
          tooltip={`P_D: Carga muerta<br/>P_L: Carga viva`}
          symbolic="P_u = \max \left( 1.4 P_D,\ 1.2 P_D + 1.6 P_L \right)"
          substituted={`P_u = \\max \\left( 1.4 \\cdot ${PD.toFixed(
            2
          )}\\ \\text{kN}, 1.2 \\cdot ${PD.toFixed(
            2
          )}\\ \\text{kN} + 1.6 \\cdot ${PL.toFixed(2)}\\ \\text{kN} \\right)`}
          result={verificaPunzonado.esfuerzoAxilMayorado.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

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
          result={verificaPunzonado.cargaTotal.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia Requerida"
          tooltip={`Pᵤ: Esfuerzo mayorado<br/>q: Carga total<br/>cₓ, cᵧ: Excentricidades<br/>d: Altura útil`}
          symbolic="V_u = P_u - q \cdot (c_x + d) \cdot (c_y + d)"
          substituted={`V_u = ${Pu.toFixed(
            2
          )}\\ \\text{kN} - ${verificaPunzonado.cargaTotal.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot (${cx}\\ \\text{m} + ${d.toFixed(
            2
          )}\\ \\text{m}) \\cdot (${cy}\\ \\text{m} + ${d.toFixed(
            2
          )}\\ \\text{m})`}
          result={verificaPunzonado.resistenciaRequerida.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Perímetro Crítico"
          tooltip={`cₓ, cᵧ: Excentricidades<br/>d: Altura útil`}
          symbolic="b_0 = 2 \cdot (c_x + c_y) + 4d"
          substituted={`b_0 = 2 \\cdot (${cx}\\ \\text{m} + ${cy}\\ \\text{m}) + 4 \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}`}
          result={verificaPunzonado.b0.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Relación Geométrica"
          tooltip={`cₓ, cᵧ: Excentricidades<br/>b: Relación entre lados`}
          symbolic="b = \frac{\max(c_x, c_y)}{\min(c_x, c_y)}"
          substituted={`b = \\frac{\\max(${cx}\\ \\text{m}, ${cy}\\ \\text{m})}{\\min(${cx}\\ \\text{m}, ${cy}\\ \\text{m})}`}
          result={verificaPunzonado.b.toFixed(2)}
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia Nominal"
          tooltip={`b₀: Perímetro crítico<br/>d: Altura útil<br/>f′c: Resistencia del concreto<br/>b: Relación geométrica`}
          symbolic="V_n = \min \left( \frac{b_0 \cdot d \cdot \sqrt{f'_c}}{3}, \frac{(1 + 2/b) \cdot b_0 \cdot d \cdot \sqrt{f'_c}}{6}, \frac{(2 + 40 \cdot d/b_0) \cdot b_0 \cdot d \cdot \sqrt{f'_c}}{12} \right)"
          substituted={`V_n = \\min \\left( \\frac{${verificaPunzonado.b0.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\sqrt{${fc}\\ \\text{MPa}}}{3}, \\frac{(1 + 2/${verificaPunzonado.b.toFixed(
            2
          )}) \\cdot ${verificaPunzonado.b0.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\sqrt{${fc}\\ \\text{MPa}}}{6}, \\frac{(2 + 40 \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}/${verificaPunzonado.b0.toFixed(
            2
          )}\\ \\text{m}) \\cdot ${verificaPunzonado.b0.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\sqrt{${fc}\\ \\text{MPa}}}{12} \\right)`}
          result={verificaPunzonado.resistenciaNominal.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Resistencia de Diseño"
          tooltip={`Vₙ: Resistencia nominal<br/>Factor de reducción: 0.75`}
          symbolic="V_d = 0.75 \cdot V_n"
          substituted={`V_d = 0.75 \\cdot ${verificaPunzonado.resistenciaNominal.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaPunzonado.resistenciaDiseno.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación a Punzonado"
          tooltip={`Verifica que Vᵤ ≤ V_d<br/>Si se cumple, la base resiste el punzonado`}
          symbolic="V_u \leq V_d"
          substituted={`V_u = ${verificaPunzonado.resistenciaRequerida.toFixed(
            2
          )}\\ \\text{kN} \\leq ${verificaPunzonado.resistenciaDiseno.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaPunzonado.cumpleVerificacion ? "Sí" : "No"}
          showFormulas={showFormulas}
          reference="Art. 11.12.2.2 CIRSOC 201-05. Página 287"
        />
      </div>
    </div>
  );
};

export default FormulasVerificacionPunzonado;
