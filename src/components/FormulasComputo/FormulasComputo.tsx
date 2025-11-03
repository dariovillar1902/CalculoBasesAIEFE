import "./FormulasComputo.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../../types/BaseHormigonArmadura";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";
import type { BaseHormigonComputo } from "../../types/BaseHormigonComputo";

type Props = {
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
  calculoArmadura: BaseHormigonArmadura;
  cuantia: BaseHormigonCuantia;
  computo: BaseHormigonComputo;
  showFormulas: boolean;
};

const FormulasComputo: React.FC<Props> = ({
  base,
  dimensionesBase,
  calculoArmadura,
  computo,
  showFormulas,
}) => {
  const {
    volumenHormigon,
    longitudBarrasX,
    longitudBarrasY,
    pesoBarrasX,
    pesoBarrasY,
    volumenExcavacion,
    montoHormigon,
    montoAcero,
    montoExcavacion,
  } = computo;

  const diamX_cm = base.diametroBarrasX.valor * 100;
  const diamY_cm = base.diametroBarrasY.valor * 100;

  const Abx = Math.PI * Math.pow(diamX_cm / 2, 2);
  const Aby = Math.PI * Math.pow(diamY_cm / 2, 2);

  return (
    <div className="katex-container">
      <div className="armadura-container">
        <h2 className="armadura-title">Cómputo</h2>

        <FormulaBlock
          title="Volumen de Hormigón"
          tooltip={`a_x: Ancho en X<br/>a_y: Ancho en Y<br/>h: Altura`}
          symbolic="V = a_x \cdot a_y \cdot h"
          substituted={`V = ${dimensionesBase.anchoX.toFixed(
            2
          )}\\ \\text{m} \\cdot ${dimensionesBase.anchoY.toFixed(
            2
          )}\\ \\text{m} \\cdot ${dimensionesBase.altura.toFixed(
            2
          )}\\ \\text{m}`}
          result={volumenHormigon.toFixed(2)}
          unit="m³"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Longitud de Barras en X"
          tooltip={`N_x: Número de barras en X<br/>a_x: Dimensión en X<br/>0.50 m: Longitud adicional`}
          symbolic="L_x = N_x \cdot (a_x + 0.50 \, m)"
          substituted={`L_x = ${
            calculoArmadura.cantidadBarrasX
          } \\cdot (${dimensionesBase.anchoX.toFixed(
            2
          )}\\ \\text{m} + 0.50\\ \\text{m})`}
          result={longitudBarrasX.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Longitud de Barras en Y"
          tooltip={`N_y: Número de barras en Y<br/>a_y: Dimensión en Y<br/>0.50 m: Longitud adicional`}
          symbolic="L_y = N_y \cdot (a_y + 0.50 \, m)"
          substituted={`L_y = ${
            calculoArmadura.cantidadBarrasY
          } \\cdot (${dimensionesBase.anchoY.toFixed(
            2
          )}\\ \\text{m} + 0.50\\ \\text{m})`}
          result={longitudBarrasY.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Peso Barras en X"
          tooltip={`A_{bx}: Área barra X<br/>ρ: Densidad acero (7850 kg/m³)<br/>L_x: Longitud total`}
          symbolic="W_x = A_{bx} \cdot \rho \cdot L_x"
          substituted={`W_x = ${Abx.toFixed(
            2
          )}\\ \\text{m}^2 \\cdot 7850\\ \\text{kg/m}^3 \\cdot ${longitudBarrasX.toFixed(
            2
          )}\\ \\text{m}`}
          result={pesoBarrasX.toFixed(2)}
          unit="kg"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Peso Barras en Y"
          tooltip={`A_{by}: Área barra Y<br/>ρ: Densidad acero (7850 kg/m³)<br/>L_y: Longitud total`}
          symbolic="W_y = A_{by} \cdot \rho \cdot L_y"
          substituted={`W_y = ${Aby.toFixed(
            2
          )}\\ \\text{m}^2 \\cdot 7850\\ \\text{kg/m}^3 \\cdot ${longitudBarrasY.toFixed(
            2
          )}\\ \\text{m}`}
          result={pesoBarrasY.toFixed(2)}
          unit="kg"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Volumen de Excavación"
          tooltip={`V_{exc} = V_hormigón \\cdot k_e`}
          symbolic="V_{exc} = V \cdot k_e"
          substituted={`V_{exc} = ${volumenHormigon.toFixed(
            2
          )}\\ \\text{m}^3 \\cdot ${base.coeficienteEsponjamiento.valor.toFixed(
            2
          )}`}
          result={volumenExcavacion.toFixed(2)}
          unit="m³"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Costo Hormigón"
          tooltip={`C_H° = V \\cdot costo_{m³}`}
          symbolic="C_H° = V \cdot c_{H°}"
          substituted={`C_H° = ${volumenHormigon.toFixed(
            2
          )}\\ \\text{m}^3 \\cdot \\$ ${base.costoM3Hormigon.valor.toFixed(2)}`}
          result={montoHormigon.toFixed(2)}
          unit="$"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Costo Acero"
          tooltip={`C_a = (W_x + W_y) \\cdot costo_{kg}`}
          symbolic="C_a = (W_x + W_y) \cdot c_{a}"
          substituted={`C_a = (${pesoBarrasX.toFixed(
            2
          )} + ${pesoBarrasY.toFixed(
            2
          )})\\ \\text{kg} \\cdot \\$ ${base.costoKgAcero.valor.toFixed(2)}`}
          result={montoAcero.toFixed(2)}
          unit="$"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Costo Excavación"
          tooltip={`C_e = V_{exc} \\cdot costo_{m³exc}`}
          symbolic="C_e = V_{exc} \cdot c_{exc}"
          substituted={`C_e = ${volumenExcavacion.toFixed(
            2
          )}\\ \\text{m}^3 \\cdot \\$ ${base.costoM3Excavacion.valor.toFixed(
            2
          )}`}
          result={montoExcavacion.toFixed(2)}
          unit="$"
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasComputo;
