import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./FormulasCalculoArmadura.scss";
import type { BaseHormigonArmadura } from "../../types/BaseHormigonArmadura.ts";

type Props = {
  calculoArmadura: BaseHormigonArmadura;
};

const FormulasCalculoArmadura: React.FC<Props> = ({ calculoArmadura }) => {
  return (
    <div className="katex-container">
      <div className="armadura-container">
        <h2 className="armadura-title">Detalles de Armadura</h2>

        <div className="armadura-item">
          <h3>Barras en X:</h3>
          <BlockMath math="N_x = \frac{A_{sx}}{A_{bx}}" />
          <p>{calculoArmadura.cantidadBarrasX}</p>
        </div>

        <div className="armadura-item">
          <h3>Barras en Y:</h3>
          <BlockMath math="N_y = \frac{A_{sy}}{A_{by}}" />
          <p>{calculoArmadura.cantidadBarrasY}</p>
        </div>

        <div className="armadura-item">
          <h3>Separación Barras X:</h3>
          <BlockMath math="s_x = \min \left( \frac{a_y - 2 \cdot c_c}{N_x - 1}, 2.5 \cdot d, 25 \cdot d_b, 0.3 \right)" />
          <p>{calculoArmadura.separacionBarrasX} cm</p>
        </div>

        <div className="armadura-item">
          <h3>Separación Barras Y:</h3>
          <BlockMath math="s_y = \min \left( \frac{a_x - 2 \cdot c_c}{N_y - 1}, 2.5 \cdot d, 25 \cdot d_b, 0.3 \right)" />
          <p>{calculoArmadura.separacionBarrasY} cm</p>
        </div>
      </div>
    </div>
  );
};

export default FormulasCalculoArmadura;
