import "./FormulasDimensionesBase.scss";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import FormulaBlock from "../FormulaBlock/FormulaBlock";

type Props = {
  dimensionesBase: BaseHormigonDimensiones;
  base: BaseHormigon;
};

const FormulasDimensionesBase: React.FC<Props> = ({
  dimensionesBase,
  base,
}) => {
  const { anchoX, anchoY, altura, vueloX, vueloY } = dimensionesBase;

  return (
    <div className="katex-container">
      <div className="dimensiones-container">
        <h2 className="dimensiones-title">Dimensiones Base</h2>

        <FormulaBlock
          title="Área Necesaria"
          tooltip="Área necesaria para soportar la carga de diseño con la tensión admisible"
          symbolic="A_{nec} = \frac{1.10 \cdot P}{0.65 \cdot 1.25 \cdot q_{adm}}"
          substituted={`A_{nec} = \\frac{1.10 \\cdot ${base.esfuerzoAxil.valor}\\ \\text{kN}}{0.65 \\cdot 1.25 \\cdot ${base.cargaAdmisible.valor}\\ \\text{kN/m²}}`}
          result={dimensionesBase.areaNecesaria.toFixed(2)}
          unit="m²"
        />

        <FormulaBlock
          title="Ancho X"
          tooltip="Dimensión X siguiendo relación AnchoX / AnchoY = 1.5"
          symbolic="a_x = 1.5 \cdot a_y"
          substituted={`a_x = 1.5 \\cdot ${dimensionesBase.anchoY.toFixed(
            2
          )}\\ \\text{m}`}
          result={anchoX.toFixed(2)}
          unit="m"
        />

        <FormulaBlock
          title="Ancho Y"
          tooltip="Dimensión Y siguiendo relación AnchoX / AnchoY = 1.5"
          symbolic="a_y = \sqrt{\frac{A_{nec}}{1.5}}"
          substituted={`a_y = \\sqrt{${dimensionesBase.areaNecesaria.toFixed(
            2
          )}\\ \\text{m²} / 1.5} = ${anchoY.toFixed(2)}\\ \\text{m}`}
          result={anchoY.toFixed(2)}
          unit="m"
        />

        <FormulaBlock
          title="Altura mínima"
          tooltip="Altura mínima según vuelos: max(VueloX/5, VueloY/5, 0.25 m)"
          symbolic="h = \max(V_x/5, V_y/5, 0.25)"
          substituted={`h = \\max(${vueloX.toFixed(
            2
          )}\\ \\text{m}/5, ${vueloY.toFixed(
            2
          )}\\ \\text{m}/5, 0.25\\ \\text{m}) = ${altura.toFixed(
            2
          )}\\ \\text{m}`}
          result={altura.toFixed(2)}
          unit="m"
        />

        {/*         <FormulaBlock
          title="Verifica Vuelos"
          tooltip="Verifica que la diferencia de vuelos sea menor a 0.2 m"
          symbolic={`|V_x - V_y| < 0.2\\ \\text{m}`}
          substituted={`|V_x - V_y| = ${Math.abs(vueloX - vueloY).toFixed(
            2
          )}\\ \\text{m}`}
          result={verificaVuelos ? "Sí" : "No"}
        /> */}
      </div>
    </div>
  );
};

export default FormulasDimensionesBase;
