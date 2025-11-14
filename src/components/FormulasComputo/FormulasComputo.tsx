// Importa los estilos específicos para mostrar fórmulas de cómputo
import "./FormulasComputo.scss";
// Componente que muestra una fórmula con su resultado y explicación
import FormulaBlock from "../FormulaBlock/FormulaBlock";

// Tipos que definen la estructura de los datos utilizados en el cálculo
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../../types/BaseHormigonArmadura";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";
import type { BaseHormigonComputo } from "../../types/BaseHormigonComputo";

// Define las propiedades que recibe el componente
type Props = {
  base: BaseHormigon; // Datos generales de la base de hormigón
  dimensionesBase: BaseHormigonDimensiones; // Dimensiones físicas de la base
  calculoArmadura: BaseHormigonArmadura; // Resultados del cálculo de armadura
  cuantia: BaseHormigonCuantia; // Cuantía de acero (no usada directamente acá)
  computo: BaseHormigonComputo; // Resultados del cómputo de materiales y costos
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

// Componente que muestra las fórmulas utilizadas para calcular materiales y costos de la base
const FormulasComputo: React.FC<Props> = ({
  base,
  dimensionesBase,
  calculoArmadura,
  computo,
  showFormulas,
}) => {
  // Extrae los resultados del cómputo desde el objeto recibido
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

  // Convierte el diámetro de las barras de metros a centímetros
  const diamX_cm = base.diametroBarrasX.valor * 100;
  const diamY_cm = base.diametroBarrasY.valor * 100;

  // Calcula el área de una barra en X e Y usando la fórmula del área de un círculo
  const Abx = Math.PI * Math.pow(diamX_cm / 2, 2); // cm²
  const Aby = Math.PI * Math.pow(diamY_cm / 2, 2); // cm²

  return (
    <div className="katex-container">
      <div className="armadura-container">
        <h2 className="armadura-title">Cómputo</h2>

        {/* Volumen de hormigón necesario para la base */}
        <FormulaBlock
          title="Volumen de Hormigón"
          tooltip={`ax: Ancho en X<br/>ay: Ancho en Y<br/>h: Altura`}
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

        {/* Longitud total de barras en dirección X */}
        <FormulaBlock
          title="Longitud de Barras en X"
          tooltip={`Nx: Número de barras en X<br/>ax: Dimensión en X<br/>0.50 m: Longitud adicional`}
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

        {/* Longitud total de barras en dirección Y */}
        <FormulaBlock
          title="Longitud de Barras en Y"
          tooltip={`Ny: Número de barras en Y<br/>ay: Dimensión en Y<br/>0.50 m: Longitud adicional`}
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

        {/* Peso total de barras en dirección X */}
        <FormulaBlock
          title="Peso Barras en X"
          tooltip={`Abx: Área barra X<br/>ρ: Densidad acero (7850 kg/m³)<br/>Lx: Longitud total`}
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

        {/* Peso total de barras en dirección Y */}
        <FormulaBlock
          title="Peso Barras en Y"
          tooltip={`Aby: Área barra Y<br/>ρ: Densidad acero (7850 kg/m³)<br/>Ly: Longitud total`}
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

        {/* Volumen de excavación considerando esponjamiento */}
        <FormulaBlock
          title="Volumen de Excavación"
          tooltip={`Vexc = Vhormigón * ke`}
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

        {/* Costo total del hormigón */}
        <FormulaBlock
          title="Costo Hormigón"
          tooltip={`CH° = V * costo m³ H°`}
          symbolic="C_H° = V \cdot c_{H°}"
          substituted={`C_H° = ${volumenHormigon.toFixed(
            2
          )}\\ \\text{m}^3 \\cdot \\$ ${base.costoM3Hormigon.valor.toFixed(2)}`}
          result={montoHormigon.toFixed(2)}
          unit="$"
          showFormulas={showFormulas}
        />

        {/* Costo total del acero */}
        <FormulaBlock
          title="Costo Acero"
          tooltip={`Ca = (W_x + W_y) * costo kg`}
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

        {/* Costo total de la excavación */}
        <FormulaBlock
          title="Costo Excavación"
          tooltip={`Ce = Vexc * costo m³exc`}
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
