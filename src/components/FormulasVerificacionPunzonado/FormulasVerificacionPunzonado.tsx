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
  // Cálculo de cargas mayoradas según combinaciones de carga
  const PD = (base.porcentajeCargaD.valor / 100) * base.esfuerzoAxil.valor; // Carga muerta
  const PL = (base.porcentajeCargaL.valor / 100) * base.esfuerzoAxil.valor; // Carga viva
  const Pu = Math.max(1.4 * PD, 1.2 * PD + 1.6 * PL); // Esfuerzo mayorado Pu

  // Parámetros geométricos y materiales
  const P = base.esfuerzoAxil.valor; // Carga axial total (sin factores)
  const ax = dimensionesBase.anchoX;
  const ay = dimensionesBase.anchoY;
  const gammaHA = base.pesoEspecificoHormigon.valor; // Peso específico hormigón armado
  const gammaPrima = base.pesoEspecificoSuelo.valor; // Peso específico suelo
  const h = dimensionesBase.altura; // Altura de la base
  const Df = base.nivelFundacion.valor; // Nivel de fundación
  const cx = base.anchoColumnaX.valor; // Lado X de la columna
  const cy = base.anchoColumnaY.valor; // Lado Y de la columna
  const d = h - base.recubrimientoHormigon.valor - 0.02; // Altura útil d
  const fc = base.resistenciaCaracteristicaHormigon.valor; // f'c resistencia del hormigón

  return (
    <div className="katex-container">
      <div className="punzonado-container">
        <h2 className="punzonado-title">Verificación de Punzonado</h2>

        {/* Cálculo de Pu (esfuerzo mayorado) */}
        <FormulaBlock
          title="Esfuerzo Axial Mayorado"
          tooltip={`PD: Carga muerta<br/>PL: Carga viva`}
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

        {/* Cálculo de q (carga total sobre la base) */}
        <FormulaBlock
          title="Carga Total"
          tooltip={`P: Carga<br/>ax, ay: Dimensiones<br/>γH°A°: Peso hormigón armado<br/>γ′: Peso específico del suelo<br/>h: Altura<br/>Df: Profundidad de fundación`}
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

        {/* Cálculo de Vu (resistencia requerida) */}
        <FormulaBlock
          title="Resistencia Requerida"
          tooltip={`Pu: Esfuerzo mayorado<br/>q: Carga total<br/>cx, cy: Excentricidades<br/>d: Altura útil`}
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

        {/* Perímetro crítico b0 */}
        <FormulaBlock
          title="Perímetro Crítico"
          tooltip={`cx, cy: Excentricidades<br/>d: Altura útil`}
          symbolic="b_0 = 2 \cdot (c_x + c_y) + 4d"
          substituted={`b_0 = 2 \\cdot (${cx}\\ \\text{m} + ${cy}\\ \\text{m}) + 4 \\cdot ${d.toFixed(
            2
          )}\\ \\text{m}`}
          result={verificaPunzonado.b0.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        {/* Relación geométrica b = cx/cy o cy/cx */}
        <FormulaBlock
          title="Relación Geométrica"
          tooltip={`cx, cy: Excentricidades<br/>b: Relación entre lados`}
          symbolic="b = \frac{\max(c_x, c_y)}{\min(c_x, c_y)}"
          substituted={`b = \\frac{\\max(${cx}\\ \\text{m}, ${cy}\\ \\text{m})}{\\min(${cx}\\ \\text{m}, ${cy}\\ \\text{m})}`}
          result={verificaPunzonado.b.toFixed(2)}
          showFormulas={showFormulas}
        />

        {/* Resistencia nominal Vn (3 casos, se toma el mínimo) */}
        <FormulaBlock
          title="Resistencia Nominal"
          tooltip={`b0: Perímetro crítico<br/>d: Altura útil<br/>f′c: Resistencia del concreto<br/>b: Relación geométrica`}
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

        {/* Resistencia de diseño Vd = 0.75 * Vn */}
        <FormulaBlock
          title="Resistencia de Diseño"
          tooltip={`Vn: Resistencia nominal<br/>Factor de reducción: 0.75`}
          symbolic="V_d = 0.75 \cdot V_n"
          substituted={`V_d = 0.75 \\cdot ${verificaPunzonado.resistenciaNominal.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaPunzonado.resistenciaDiseno.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Verificación final Vu <= Vd */}
        <FormulaBlock
          title="Verificación a Punzonado"
          tooltip={`Verifica que Vu ≤ Vd<br/>Si se cumple, la base resiste el punzonado`}
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
