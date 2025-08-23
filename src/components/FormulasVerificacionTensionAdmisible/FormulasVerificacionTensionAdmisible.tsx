import "./FormulasVerificacionTensionAdmisible.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonVerificaciones } from "../../types/BaseHormigonVerificaciones";

type Props = {
  verificaTensionAdmisible: BaseHormigonVerificaciones;
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
};

const FormulasVerificacionTensionAdmisible: React.FC<Props> = ({
  verificaTensionAdmisible,
  base,
  dimensionesBase,
}) => {
  const ex = base.momentoX.valor / base.esfuerzoAxil.valor;
  const ey = base.momentoY.valor / base.esfuerzoAxil.valor;

  const tensionX = verificaTensionAdmisible.tensionX ?? 0;
  const tensionY = verificaTensionAdmisible.tensionY ?? 0;
  const cumple = verificaTensionAdmisible.verificaTension ?? false;

  return (
    <div className="katex-container">
      <div className="verificacion-container">
        <h2 className="verificacion-title">
          Verificación de Tensión Admisible
        </h2>

        <FormulaBlock
          title="Tensión X"
          tooltip="Tensión ajustada por excentricidad en X"
          symbolic="σ_x = \frac{P_d \cdot (1 + 6 \cdot e_x / a_x)}{a_x \cdot a_y}"
          substituted={`σ_x = \\frac{${dimensionesBase.cargaDiseno.toFixed(
            2
          )}\\ \\text{kN} \\cdot (1 + 6 \\cdot ${ex.toFixed(
            2
          )} / ${dimensionesBase.anchoX.toFixed(
            2
          )}\\ \\text{m})}{${dimensionesBase.anchoX.toFixed(
            2
          )}\\ \\text{m} \\cdot ${dimensionesBase.anchoY.toFixed(
            2
          )}\\ \\text{m}} = ${tensionX.toFixed(2)}\\ \\text{kN/m²}`}
          result={tensionX.toFixed(2)}
          unit="kN/m²"
        />

        <FormulaBlock
          title="Tensión Y"
          tooltip="Tensión ajustada por excentricidad en Y"
          symbolic="σ_y = \frac{P_d \cdot (1 - 6 \cdot e_y / a_y)}{a_x \cdot a_y}"
          substituted={`σ_y = \\frac{${dimensionesBase.cargaDiseno.toFixed(
            2
          )}\\ \\text{kN} \\cdot (1 - 6 \\cdot ${ey.toFixed(
            2
          )} / ${dimensionesBase.anchoY.toFixed(
            2
          )}\\ \\text{m})}{${dimensionesBase.anchoX.toFixed(
            2
          )}\\ \\text{m} \\cdot ${dimensionesBase.anchoY.toFixed(
            2
          )}\\ \\text{m}} = ${tensionY.toFixed(2)}\\ \\text{kN/m²}`}
          result={tensionY.toFixed(2)}
          unit="kN/m²"
        />

        <FormulaBlock
          title="Cumple límite"
          tooltip="Verifica si la tensión máxima está por debajo de la tensión promedio admisible"
          symbolic="σ_{max} < 1.25 \cdot q_{adm}"
          substituted={`σ_{max} = ${Math.max(tensionX, tensionY).toFixed(
            2
          )}\\ \\text{kN/m²} < ${(1.25 * base.cargaAdmisible.valor).toFixed(
            2
          )}\\ \\text{kN/m²}`}
          result={cumple ? "Sí" : "No"}
        />
      </div>
    </div>
  );
};

export default FormulasVerificacionTensionAdmisible;
