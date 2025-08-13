import "./FormulasVerificacionTensionAdmisible.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";

type Props = {
  verificaTensionAdmisible: boolean;
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
};

const FormulasVerificacionTensionAdmisible: React.FC<Props> = ({
  verificaTensionAdmisible,
  base,
  dimensionesBase,
}) => {
  const P = base.esfuerzoAxil.valor;
  const ax = dimensionesBase.anchoX;
  const ay = dimensionesBase.anchoY;
  const gammaHA = base.pesoEspecificoHormigon.valor;
  const gammaPrima = base.pesoEspecificoSuelo.valor;
  const h = dimensionesBase.altura;
  const Df = base.nivelFundacion.valor;
  const qadm = base.cargaAdmisible.valor;
  const q = P / (ax * ay) + gammaHA * h + gammaPrima * (Df - h);

  return (
    <div className="katex-container">
      <div className="verificacion-container">
        <h2 className="verificacion-title">
          Verificación de Tensión Admisible
        </h2>

        <FormulaBlock
          title="Carga Total"
          tooltip={`P: Carga<br/>aₓ, aᵧ: Dimensiones<br/>γₕₐ: Peso hormigón armado<br/>γ′: Peso específico del suelo<br/>h: Altura<br/>Df: Profundidad de fundación<br/>qₐdₘ: Capacidad admisible`}
          symbolic="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h) < q_{adm}"
          substituted={`q = \\frac{${P}\\ \\text{kN}}{${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${ay.toFixed(
            2
          )}\\ \\text{m}} + ${gammaHA}\\ \\text{kN/m}^3 \\cdot ${h.toFixed(
            2
          )}\\ \\text{m} + ${gammaPrima}\\ \\text{kN/m}^3 \\cdot (${Df}\\ \\text{m} - ${h.toFixed(
            2
          )}\\ \\text{m}) = ${q.toFixed(
            2
          )}\\ \\text{kN/m}^2 < ${qadm}\\ \\text{kN/m}^2`}
          result={verificaTensionAdmisible ? "Cumple" : "No cumple"}
        />
      </div>
    </div>
  );
};

export default FormulasVerificacionTensionAdmisible;
