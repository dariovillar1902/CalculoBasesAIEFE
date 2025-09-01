import "./FormulasEsfuerzosBase.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonEsfuerzos } from "../../types/BaseHormigonEsfuerzos";

type Props = {
  base: BaseHormigon;
  dimensionesBase: BaseHormigonDimensiones;
  esfuerzosBase: BaseHormigonEsfuerzos;
};

const FormulasEsfuerzosBase: React.FC<Props> = ({
  base,
  dimensionesBase,
  esfuerzosBase,
}) => {
  const { anchoX: b_x, anchoY: b_y, altura: h } = dimensionesBase;

  // Esfuerzo promedio
  const N_total =
    base.esfuerzoAxil.valor +
    b_x * b_y * h * base.pesoEspecificoHormigon.valor +
    b_x *
      b_y *
      (base.nivelFundacion.valor - h) *
      base.pesoEspecificoSuelo.valor;

  const e_x = base.momentoX.valor / N_total;
  const e_y = base.momentoY.valor / N_total;

  const sigma_max_x = (N_total / (b_x * b_y)) * (1 + (6 * e_x) / b_x);
  const sigma_min_x = (N_total / (b_x * b_y)) * (1 - (6 * e_x) / b_x);
  const sigma_max_y = (N_total / (b_x * b_y)) * (1 + (6 * e_y) / b_y);
  const sigma_min_y = (N_total / (b_x * b_y)) * (1 - (6 * e_y) / b_y);

  return (
    <div className="katex-container">
      <div className="esfuerzos-container">
        <h2 className="esfuerzos-title">Esfuerzos en la Base</h2>

        <FormulaBlock
          title="Esfuerzo Normal Total"
          tooltip="Incluye carga aplicada, peso propio del hormigón y peso del suelo sobre la base"
          symbolic={`N = N_{0} + a_{x} \\cdot a_{y} \\cdot h \\cdot \\gamma_{H°A°} + a_{x} \\cdot a_{y} \\cdot (h_{f} - h) \\cdot \\gamma_{s}`}
          substituted={`N = ${base.esfuerzoAxil.valor.toFixed(
            2
          )}\\ \\text{kN} + ${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(
            2
          )}\\ \\text{m} \\cdot ${h.toFixed(
            2
          )}\\ \\text{m} \\cdot ${base.pesoEspecificoHormigon.valor.toFixed(
            2
          )}\\ \\text{kN/m³} + ${b_x.toFixed(
            2
          )}\\ \\text{m} \\cdot ${b_y.toFixed(
            2
          )}\\ \\text{m} \\cdot (${base.nivelFundacion.valor.toFixed(
            2
          )}\\ \\text{m} - ${h.toFixed(
            2
          )}\\ \\text{m}) \\cdot ${base.pesoEspecificoSuelo.valor.toFixed(
            2
          )}\\ \\text{kN/m³}`}
          result={esfuerzosBase.normal.toFixed(2)}
          unit="kN"
        />

        <FormulaBlock
          title="Momento en X"
          tooltip="Momento total respecto a X, incluye efecto de la carga cortante en X"
          symbolic={`M_{x} = M_{0x} + V_{x} \\cdot h`}
          substituted={`M_{x} = ${base.momentoX.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m} + ${base.corteX.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot ${dimensionesBase.altura.toFixed(
            2
          )}\\ \\text{m}`}
          result={esfuerzosBase.momentoX.toFixed(2)}
          unit="kN·m"
        />

        <FormulaBlock
          title="Momento en Y"
          tooltip="Momento total respecto a Y, incluye efecto de la carga cortante en Y"
          symbolic={`M_{y} = M_{0y} + V_{y} \\cdot h`}
          substituted={`M_{y} = ${base.momentoY.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m} + ${base.corteY.valor.toFixed(
            2
          )}\\ \\text{kN} \\cdot ${dimensionesBase.altura.toFixed(
            2
          )}\\ \\text{m}`}
          result={esfuerzosBase.momentoY.toFixed(2)}
          unit="kN·m"
        />

        <FormulaBlock
          title="Corte en X"
          tooltip="Carga cortante en X"
          symbolic={`V_{x} = V_{0x} `}
          substituted={`V_{x} = ${base.corteX.valor.toFixed(2)}\\ \\text{kN}`}
          result={esfuerzosBase.corteX.toFixed(2)}
          unit="kN"
        />

        <FormulaBlock
          title="Corte en Y"
          tooltip="Carga cortante en Y"
          symbolic={`V_{y} = V_{0y} `}
          substituted={`V_{y} = ${base.corteY.valor.toFixed(2)}\\ \\text{kN}`}
          result={esfuerzosBase.corteY.toFixed(2)}
          unit="kN"
        />
      </div>
    </div>
  );
};

export default FormulasEsfuerzosBase;
