import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./FormulasDimensionesBase.scss";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones.ts";

type Props = {
  dimensionesBase: BaseHormigonDimensiones;
};

const FormulasDimensionesBase: React.FC<Props> = ({ dimensionesBase }) => {
  return (
    <div className="katex-container">
      <div className="dimensiones-container">
        <h2 className="dimensiones-title">Dimensiones Base</h2>
        <div className="dimensiones-item">
          <h3>Área:</h3>
          <BlockMath math="A = 1.05 \cdot \frac{P}{q_{adm} - \gamma^{\prime} D_f} \approx a_x a_y" />
          <p>{dimensionesBase.area.toFixed(2)} m²</p>
        </div>
        <div className="dimensiones-item">
          <h3>Ancho X:</h3>
          <BlockMath math="a_x = \sqrt{A_{nec} + \frac{(c_x - c_y)^2}{4}} + \frac{c_x - c_y}{2}" />
          <p>{dimensionesBase.anchoX} m</p>
        </div>
        <div className="dimensiones-item">
          <h3>Ancho Y:</h3>
          <BlockMath math="a_y = \sqrt{A_{nec} + \frac{(c_x - c_y)^2}{4}} - \frac{c_x - c_y}{2}" />
          <p>{dimensionesBase.anchoY} m</p>
        </div>
        <div className="dimensiones-item">
          <h3>Altura:</h3>
          <BlockMath math="h \geq \max \left( \frac{a_{x\text{adop}} - c_x}{5}, \frac{a_{y\text{adop}} - c_y}{5}, 25 \text{ cm} \right)" />
          <p>{dimensionesBase.altura} m</p>
        </div>
        <div className="dimensiones-item">
          <h3>Verifica Vuelos:</h3>
          <BlockMath math="\left| V_x - V_y \right| < 20 \text{ cm}" />
          <p>{dimensionesBase.verificaVuelos ? "Sí" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default FormulasDimensionesBase;
