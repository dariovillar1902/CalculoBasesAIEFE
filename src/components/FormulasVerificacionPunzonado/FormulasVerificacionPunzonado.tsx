import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./FormulasVerificacionPunzonado.scss";
import type { BaseHormigonVerificacionPunzonado } from "../../types/BaseHormigonVerificacionPunzonado.ts";

type Props = {
  verificaPunzonado: BaseHormigonVerificacionPunzonado;
};

const FormulasVerificacionPunzonado: React.FC<Props> = ({
  verificaPunzonado,
}) => {
  return (
    <div className="katex-container">
      <div className="punzonado-container">
        <h2 className="punzonado-title">Verificación de Punzonado</h2>

        <div className="punzonado-item">
          <h3>Esfuerzo Axial Mayorado:</h3>
          <BlockMath math="P_u = \max \left( 1.4 P_D, 1.2 P_D + 1.6 P_L \right)" />
          <p>{verificaPunzonado.esfuerzoAxilMayorado.toFixed(2)} kN</p>
        </div>

        <div className="punzonado-item">
          <h3>Carga Total:</h3>
          <BlockMath math="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h)" />
          <p>{verificaPunzonado.cargaTotal.toFixed(2)} kN/m²</p>
        </div>

        <div className="punzonado-item">
          <h3>Resistencia Requerida:</h3>
          <BlockMath math="V_u = P_u - q \cdot (c_x + d) \cdot (c_y + d)" />
          <p>{verificaPunzonado.resistenciaRequerida.toFixed(2)} kN</p>
        </div>

        <div className="punzonado-item">
          <h3>Perímetro Crítico:</h3>
          <BlockMath math="b_0 = 2 \cdot (c_x + c_y) + 4d" />
          <p>{verificaPunzonado.b0.toFixed(2)} m</p>
        </div>

        <div className="punzonado-item">
          <h3>Relación Geométrica:</h3>
          <BlockMath math="b = \frac{\max(c_x, c_y)}{\min(c_x, c_y)}" />
          <p>{verificaPunzonado.b.toFixed(2)}</p>
        </div>

        <div className="punzonado-item">
          <h3>Resistencia Nominal:</h3>
          <BlockMath math="V_n = \min \left( \frac{b_0 \cdot d \cdot \sqrt{f'_c}}{3}, \frac{(1 + 2/b) \cdot b_0 \cdot d \cdot \sqrt{f'_c}}{6}, \frac{(2 + 40 \cdot d/b_0) \cdot b_0 \cdot d \cdot \sqrt{f'_c}}{12} \right)" />
          <p>{verificaPunzonado.resistenciaNominal.toFixed(2)} kN</p>
        </div>

        <div className="punzonado-item">
          <h3>Resistencia de Diseño:</h3>
          <BlockMath math="V_d = 0.75 \cdot V_n" />
          <p>{verificaPunzonado.resistenciaDiseno.toFixed(2)} kN</p>
        </div>

        <div className="punzonado-item">
          <h3>Resultado:</h3>
          <BlockMath math="V_u \leq V_d" />
          <p>{verificaPunzonado.cumpleVerificacion ? "Cumple" : "No cumple"}</p>
        </div>
      </div>
    </div>
  );
};

export default FormulasVerificacionPunzonado;
