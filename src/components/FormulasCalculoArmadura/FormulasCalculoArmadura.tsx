// Importa los estilos específicos para mostrar fórmulas de cálculo de armadura
import "./FormulasCalculoArmadura.scss";
// Componente que muestra una fórmula con su resultado y explicación
import FormulaBlock from "../FormulaBlock/FormulaBlock";

// Tipos que definen la estructura de los datos utilizados en el cálculo
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../../types/BaseHormigonArmadura";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia";

// Define las propiedades que recibe el componente
type Props = {
  base: BaseHormigon; // Datos generales de la base de hormigón
  dimensionesBase: BaseHormigonDimensiones; // Dimensiones físicas de la base
  calculoArmadura: BaseHormigonArmadura; // Resultados del cálculo de armadura
  cuantia: BaseHormigonCuantia; // Áreas de acero requeridas
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

// Componente que muestra las fórmulas utilizadas para calcular la armadura de la base
const FormulasCalculoArmadura: React.FC<Props> = ({
  base,
  dimensionesBase,
  calculoArmadura,
  cuantia,
  showFormulas,
}) => {
  // Convierte el diámetro de las barras de metros a centímetros
  const diamX_cm = base.diametroBarrasX.valor * 100;
  const diamY_cm = base.diametroBarrasY.valor * 100;

  // Calcula el área de una barra en X e Y usando la fórmula del área de un círculo
  const Abx = Math.PI * Math.pow(diamX_cm / 2, 2); // cm²
  const Aby = Math.PI * Math.pow(diamY_cm / 2, 2); // cm²

  // Convierte las dimensiones de la base de metros a centímetros
  const ay = dimensionesBase.anchoY * 100;
  const ax = dimensionesBase.anchoX * 100;

  // Extrae el recubrimiento de hormigón y el diámetro nominal de las barras
  const cc = base.recubrimientoHormigon.valor; // cm
  const db = base.diametroBarrasX.valor; // cm

  // Cantidad de barras calculadas para cada dirección
  const Nx = calculoArmadura.cantidadBarrasX;
  const Ny = calculoArmadura.cantidadBarrasY;

  return (
    <div className="katex-container">
      <div className="armadura-container">
        <h2 className="armadura-title">Detalles de Armadura</h2>

        {/* Fórmula para calcular cantidad de barras en dirección X */}
        <FormulaBlock
          title="Barras en X"
          tooltip={`Asx: Área de acero requerida en X<br/>Abx: Área de una barra en X<br/>Nx: Número de barras en X`}
          symbolic="N_x = \frac{A_{sx}}{A_{bx}}"
          substituted={`N_x = \\frac{${cuantia.areaAceroX.toFixed(
            2
          )}\\ \\text{cm}^2}{${Abx.toFixed(2)}\\ \\text{cm}^2}`}
          result={Math.ceil(calculoArmadura.cantidadBarrasX).toString()}
          unit="barras"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular cantidad de barras en dirección Y */}
        <FormulaBlock
          title="Barras en Y"
          tooltip={`Asy: Área de acero requerida en Y<br/>Aby: Área de una barra en Y<br/>Ny: Número de barras en Y`}
          symbolic="N_y = \frac{A_{sy}}{A_{by}}"
          substituted={`N_y = \\frac{${cuantia.areaAceroY.toFixed(
            2
          )}\\ \\text{cm}^2}{${Aby.toFixed(2)}\\ \\text{cm}^2}`}
          result={Math.ceil(calculoArmadura.cantidadBarrasY).toString()}
          unit="barras"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular separación entre barras en dirección X */}
        <FormulaBlock
          title="Separación Barras X"
          tooltip={`ay: Largo en Y<br/>cc: Recubrimiento de concreto<br/>d: Diámetro de barra<br/>db: Diámetro nominal`}
          symbolic="s_x = \min \left( \frac{a_y - 2 \cdot c_c}{N_x - 1},\ 2.5 \cdot d,\ 25 \cdot d_b,\ 0.3 \ m\right)"
          substituted={`s_x = \\min \\left( \\frac{${ay.toFixed(
            2
          )}\\ \\text{cm} - 2 \\cdot ${cc}\\ \\text{cm}}{${Math.ceil(
            Nx
          )} - 1}, ${(2.5 * (dimensionesBase.altura - cc)).toFixed(
            2
          )}\\ \\text{m}, ${(25 * db).toFixed(
            2
          )}\\ \\text{m}, 0.3\\ \\text{m} \\right)`}
          result={calculoArmadura.separacionBarrasX.toFixed(2)}
          unit="cm"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular separación entre barras en dirección Y */}
        <FormulaBlock
          title="Separación Barras Y"
          tooltip={`ax: Largo en X<br/>cc: Recubrimiento de concreto<br/>d: Diámetro de barra<br/>db: Diámetro nominal`}
          symbolic="s_y = \min \left( \frac{a_x - 2 \cdot c_c}{N_y - 1},\ 2.5 \cdot d,\ 25 \cdot d_b,\ 0.3 \ m\right)"
          substituted={`s_y = \\min \\left( \\frac{${ax.toFixed(
            2
          )}\\ \\text{cm} - 2 \\cdot ${cc}\\ \\text{cm}}{${Math.ceil(
            Ny
          )} - 1}, ${(2.5 * (dimensionesBase.altura - cc)).toFixed(
            2
          )}\\ \\text{m}, ${(25 * db).toFixed(
            2
          )}\\ \\text{m}, 0.3\\ \\text{m} \\right)`}
          result={calculoArmadura.separacionBarrasY.toFixed(2)}
          unit="cm"
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasCalculoArmadura;
