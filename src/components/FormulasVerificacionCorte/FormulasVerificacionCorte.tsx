import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./FormulasVerificacionCorte.scss";
import type { BaseHormigonVerificacionCorte } from "../../types/BaseHormigonVerificacionCorte.ts";

type Props = {
  verificaCorte: BaseHormigonVerificacionCorte;
};

const FormulasVerificacionCorte: React.FC<Props> = ({ verificaCorte }) => {
  return (
    <div className="katex-container">
      <div className="corte-container">
        <h2 className="corte-title">Verificación de Corte</h2>

        <div className="corte-item">
          <h3>Carga Total:</h3>
          <BlockMath math="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h)" />
          <p>{verificaCorte.cargaTotal.toFixed(2)} kN/m²</p>
        </div>

        <div className="corte-item">
          <h3>Resistencia Requerida en X:</h3>
          <BlockMath math="V_{ux} = q \cdot \left( \frac{a_x - c_x}{2} - d \right) \cdot a_y" />
          <p>{verificaCorte.resistenciaRequeridaX.toFixed(2)} kN</p>
        </div>

        <div className="corte-item">
          <h3>Resistencia Requerida en Y:</h3>
          <BlockMath math="V_{uy} = q \cdot \left( \frac{a_y - c_y}{2} - d \right) \cdot a_x" />
          <p>{verificaCorte.resistenciaRequeridaY.toFixed(2)} kN</p>
        </div>

        <div className="corte-item">
          <h3>Resistencia Nominal en X:</h3>
          <BlockMath math="V_{nx} = a_y \cdot d \cdot \frac{\sqrt{f'_c}}{6}" />
          <p>{verificaCorte.resistenciaNominalX.toFixed(2)} kN</p>
        </div>

        <div className="corte-item">
          <h3>Resistencia Nominal en Y:</h3>
          <BlockMath math="V_{ny} = a_x \cdot d \cdot \frac{\sqrt{f'_c}}{6}" />
          <p>{verificaCorte.resistenciaNominalY.toFixed(2)} kN</p>
        </div>

        <div className="corte-item">
          <h3>Resistencia de Diseño en X:</h3>
          <BlockMath math="V_{dx} = 0.75 \cdot V_{nx}" />
          <p>{verificaCorte.resistenciaDisenoX.toFixed(2)} kN</p>
        </div>

        <div className="corte-item">
          <h3>Resistencia de Diseño en Y:</h3>
          <BlockMath math="V_{dy} = 0.75 \cdot V_{ny}" />
          <p>{verificaCorte.resistenciaDisenoY.toFixed(2)} kN</p>
        </div>

        <div className="corte-item">
          <h3>Resultado:</h3>
          <BlockMath math="V_{ux} \leq V_{dx}, \quad V_{uy} \leq V_{dy}" />
          <p>{verificaCorte.cumpleVerificacion ? "Cumple" : "No cumple"}</p>
        </div>
      </div>
    </div>
  );
};

export default FormulasVerificacionCorte;
