import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./FormulasCalculoCuantia.scss";
import type { BaseHormigonCuantia } from "../../types/BaseHormigonCuantia.ts";

type Props = {
  calculoCuantia: BaseHormigonCuantia;
};

const FormulasCalculoCuantia: React.FC<Props> = ({ calculoCuantia }) => {
  return (
    <div className="katex-container">
      <div className="cuantia-container">
        <h2 className="cuantia-title">Cálculo de Cuantía</h2>

        <div className="cuantia-item">
          <h3>Esfuerzo Axial Mayorado:</h3>
          <BlockMath math="P_u = \max \left( 1.4 P_D, 1.2 P_D + 1.6 P_L \right)" />
          <p>{calculoCuantia.esfuerzoAxilMayorado.toFixed(2)} kN</p>
        </div>

        <div className="cuantia-item">
          <h3>Carga Mayorada:</h3>
          <BlockMath math="q_u = \frac{P_u}{a_x \cdot a_y}" />
          <p>{calculoCuantia.cargaMayorada.toFixed(2)} kN/m²</p>
        </div>

        <div className="cuantia-item">
          <h3>Momento Mayorado X:</h3>
          <BlockMath math="M_{ux} = q_u \cdot \frac{(a_x - c_x)^2}{8} \cdot a_y" />
          <p>{calculoCuantia.momentoMayoradoX.toFixed(2)} kN·m</p>
        </div>

        <div className="cuantia-item">
          <h3>Momento Mayorado Y:</h3>
          <BlockMath math="M_{uy} = q_u \cdot \frac{(a_y - c_y)^2}{8} \cdot a_x" />
          <p>{calculoCuantia.momentoMayoradoY.toFixed(2)} kN·m</p>
        </div>

        <div className="cuantia-item">
          <h3>Área Acero X:</h3>
          <BlockMath math="A_{sx} = \rho_x \cdot a_y \cdot d" />
          <p>{calculoCuantia.areaAceroX.toFixed(2)} cm²</p>
        </div>

        <div className="cuantia-item">
          <h3>Área Acero Y:</h3>
          <BlockMath math="A_{sy} = \rho_y \cdot a_x \cdot d" />
          <p>{calculoCuantia.areaAceroY.toFixed(2)} cm²</p>
        </div>
      </div>
    </div>
  );
};

export default FormulasCalculoCuantia;
