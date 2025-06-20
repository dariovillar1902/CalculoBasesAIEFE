import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./FormulasVerificacionTensionAdmisible.scss";

type Props = {
  verificaTensionAdmisible: boolean;
};

const FormulasVerificacionTensionAdmisible: React.FC<Props> = ({
  verificaTensionAdmisible,
}) => {
  return (
    <div className="katex-container">
      <div className="verificacion-container">
        <h2 className="verificacion-title">
          Verificación de Tensión Admisible
        </h2>

        <div className="verificacion-item">
          <h3>Carga Total:</h3>
          <BlockMath math="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h) < q_{adm}" />
          <p>{verificaTensionAdmisible ? "Cumple" : "No cumple"}</p>
        </div>
      </div>
    </div>
  );
};

export default FormulasVerificacionTensionAdmisible;
