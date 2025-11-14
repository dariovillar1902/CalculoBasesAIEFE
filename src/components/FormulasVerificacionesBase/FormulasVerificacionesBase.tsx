import "./FormulasVerificacionesBase.scss";
import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigonVerificaciones } from "../../types/BaseHormigonVerificaciones";
import type { BaseHormigonEsfuerzos } from "../../types/BaseHormigonEsfuerzos";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";

/*
  Este componente muestra todas las fórmulas y verificaciones relacionadas
  con la base de hormigón: vuelco, tensiones, asentamientos y distorsión angular.
  Renderiza cada cálculo usando el componente FormulaBlock.
*/

type Props = {
  esfuerzosBase: BaseHormigonEsfuerzos; // Contiene fuerzas y momentos actuantes
  base: BaseHormigon; // Parámetros generales de la base (carga admisible, módulo de balasto, etc.)
  dimensionesBase: BaseHormigonDimensiones; // Dimensiones en planta (ancho X y ancho Y)
  verificacionesBase: BaseHormigonVerificaciones; // Resultados de todas las verificaciones previas
  showFormulas: boolean; // Indica si se deben mostrar o no las fórmulas simbólicas
};

const FormulasVerificacionesBase: React.FC<Props> = ({
  esfuerzosBase,
  base,
  dimensionesBase,
  verificacionesBase,
  showFormulas,
}) => {
  // Se extraen los valores ya calculados de verificaciones
  const {
    coeficienteSeguridadVuelco,
    verificaVuelco,
    excentricidadX,
    excentricidadY,
    tensionMaximaX,
    tensionMinimaX,
    tensionMaximaY,
    tensionMinimaY,
    asentamientoMedio,
    asentamientoMaximo,
    asentamientoMinimo,
    verificaAsentamientoMedio,
    distorsionAngular,
    verificaAsentamientoDiferencial,
  } = verificacionesBase;

  // Se extraen los esfuerzos principales: carga normal y momentos
  const { normal, momentoX, momentoY } = esfuerzosBase;

  // Se extraen las dimensiones en planta
  const { anchoX: b_x, anchoY: b_y } = dimensionesBase;

  // Función auxiliar que arma una fracción en formato KaTeX
  const frac = (num: string, den: string) => `\\frac{${num}}{${den}}`;

  // Variables donde se guardan las fórmulas simbólicas y numéricas de tensiones en X
  let symbolicTensionXMax = "";
  let substitutedTensionXMax = "";
  let symbolicTensionXMin = "";
  let substitutedTensionXMin = "";

  /*
    Determinación de tensiones en X dependiendo de la excentricidad:
    - Si e = 0 → distribución uniforme
    - Si e ≤ b/6 → distribución trapecial
    - Si e > b/6 → distribución triangular (cierre en un borde)
  */
  if (excentricidadX === 0) {
    symbolicTensionXMax = symbolicTensionXMin = `\\sigma = ${frac(
      "N",
      "a_x \\cdot a_y"
    )}`;
    substitutedTensionXMax = substitutedTensionXMin = `\\sigma = ${frac(
      `${normal.toFixed(2)}\\ \\text{kN}`,
      `${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}`;
  } else if (excentricidadX <= b_x / 6) {
    // Caso trapecial
    symbolicTensionXMax = `\\sigma_{max} = ${frac(
      "N",
      "a_x \\cdot a_y"
    )} (1 + ${frac("6 \\cdot e_x", "a_x")})`;
    symbolicTensionXMin = `\\sigma_{min} = ${frac(
      "N",
      "a_x \\cdot a_y"
    )} (1 - ${frac("6 \\cdot e_x", "a_x")})`;

    // Sustitución numérica completa
    substitutedTensionXMax = `\\sigma_{max} = ${frac(
      `${normal.toFixed(2)}\\ \\text{kN}`,
      `${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}(1 + ${frac(
      `6 \\cdot ${excentricidadX.toFixed(2)}\\ \\text{m}`,
      `${b_x.toFixed(2)}\\ \\text{m}`
    )})`;

    substitutedTensionXMin = `\\sigma_{min} = ${frac(
      `${normal.toFixed(2)}\\ \\text{kN}`,
      `${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}(1 - ${frac(
      `6 \\cdot ${excentricidadX.toFixed(2)}\\ \\text{m}`,
      `${b_x.toFixed(2)}\\ \\text{m}`
    )})`;
  } else {
    // Caso triangular (tensión mínima = 0)
    symbolicTensionXMax = `\\sigma_{max} = ${frac(
      "4 \\cdot N",
      "3 \\cdot (a_x - 2e_x) \\cdot a_y"
    )}`;
    symbolicTensionXMin = `\\sigma_{min} = 0`;

    substitutedTensionXMax = `\\sigma_{max} = ${frac(
      `4 \\cdot ${normal.toFixed(2)}\\ \\text{kN}`,
      `3 ( ${b_x.toFixed(2)}\\ \\text{m} - 2 \\cdot ${excentricidadX.toFixed(
        2
      )}\\ \\text{m}) \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}`;

    substitutedTensionXMin = `\\sigma_{min} = 0`;
  }

  // Tensiones en Y (lógica idéntica a X pero en la otra dirección)
  let symbolicTensionYMax = "";
  let substitutedTensionYMax = "";
  let symbolicTensionYMin = "";
  let substitutedTensionYMin = "";

  if (excentricidadY === 0) {
    symbolicTensionYMax = symbolicTensionYMin = `\\sigma = ${frac(
      "N",
      "a_x \\cdot a_y"
    )}`;
    substitutedTensionYMax = substitutedTensionYMin = `\\sigma = ${frac(
      `${normal.toFixed(2)}\\ \\text{kN}`,
      `${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}`;
  } else if (excentricidadY <= b_y / 6) {
    symbolicTensionYMax = `\\sigma_{max} = ${frac(
      "N",
      "a_x \\cdot a_y"
    )} (1 + ${frac("6 \\cdot e_y", "a_y")})`;
    symbolicTensionYMin = `\\sigma_{min} = ${frac(
      "N",
      "a_x \\cdot a_y"
    )} (1 - ${frac("6 \\cdot e_y", "a_y")})`;

    substitutedTensionYMax = `\\sigma_{max} = ${frac(
      `${normal.toFixed(2)}\\ \\text{kN}`,
      `${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}(1 + ${frac(
      `6 \\cdot ${excentricidadY.toFixed(2)}\\ \\text{m}`,
      `${b_y.toFixed(2)}\\ \\text{m}`
    )})`;

    substitutedTensionYMin = `\\sigma_{min} = ${frac(
      `${normal.toFixed(2)}\\ \\text{kN}`,
      `${b_x.toFixed(2)}\\ \\text{m} \\cdot ${b_y.toFixed(2)}\\ \\text{m}`
    )}(1 - ${frac(
      `6 \\cdot ${excentricidadY.toFixed(2)}\\ \\text{m}`,
      `${b_y.toFixed(2)}\\ \\text{m}`
    )})`;
  } else {
    symbolicTensionYMax = `\\sigma_{max} = ${frac(
      "4 \\cdot N",
      "3 \\cdot (a_y - 2e_y) \\cdot a_x"
    )}`;
    symbolicTensionYMin = `\\sigma_{min} = 0`;

    substitutedTensionYMax = `\\sigma_{max} = ${frac(
      `4 \\cdot ${normal.toFixed(2)}\\ \\text{kN}`,
      `3 ( ${b_y.toFixed(2)}\\ \\text{m} - 2 \\cdot ${excentricidadY.toFixed(
        2
      )}\\ \\text{m}) \\cdot ${b_x.toFixed(2)}\\ \\text{m}`
    )}`;

    substitutedTensionYMin = `\\sigma_{min} = 0`;
  }

  return (
    <div className="katex-container">
      <div className="verificacion-container">
        <h2 className="verificacion-title">Verificaciones de Base</h2>

        {/* Bloques de cálculo y verificación. Cada FormulaBlock muestra: título, explicación, fórmula simbólica, fórmula con valores y resultado. */}

        {/* --- VUELCO --- */}
        <FormulaBlock
          title="Coeficiente de Seguridad al Vuelco"
          tooltip="Se calcula como la razón entre momento estabilizador y momento desestabilizador"
          symbolic={`FS_{v} = \\min\\left( \\frac{N \\cdot a_{x}}{2 \\cdot M_{x}}, \\frac{N \\cdot a_{y}}{2 \\cdot M_{y}} \\right)`}
          substituted={`FS_{v} = \\min\\left( \\frac{${normal.toFixed(
            2
          )}\\ \\text{kN} \\cdot ${b_x.toFixed(
            2
          )}\\ \\text{m}}{2 \\cdot ${momentoX.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m}}, \\frac{${normal.toFixed(
            2
          )}\\ \\text{kN} \\cdot ${b_y.toFixed(
            2
          )}\\ \\text{m}}{2 \\cdot ${momentoY.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m}} \\right)`}
          result={coeficienteSeguridadVuelco.toFixed(2)}
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación de Vuelco"
          tooltip="Debe cumplirse FSv ≥ 1.5"
          symbolic={`FS_{v} \\geq 1.5`}
          substituted={`FS_{v} = ${coeficienteSeguridadVuelco.toFixed(
            2
          )} \\geq 1.5`}
          result={verificaVuelco ? "Sí" : "No"}
          showFormulas={showFormulas}
        />

        {/* --- EXCENTRICIDADES --- */}
        <FormulaBlock
          title="Excentricidad en X"
          tooltip="Excentricidad respecto al eje X, relación de momento y fuerza axial"
          symbolic={`e_{x} = \\frac{M_{x}}{N}`}
          substituted={`e_{x} = \\frac{${momentoX.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m}}{${normal.toFixed(2)}\\ \\text{kN}}`}
          result={excentricidadX.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Excentricidad en Y"
          tooltip="Excentricidad respecto al eje Y, relación de momento y fuerza axial"
          symbolic={`e_{y} = \\frac{M_{y}}{N}`}
          substituted={`e_{y} = \\frac{${momentoY.toFixed(
            2
          )}\\ \\text{kN} \\cdot \\text{m}}{${normal.toFixed(2)}\\ \\text{kN}}`}
          result={excentricidadY.toFixed(2)}
          unit="m"
          showFormulas={showFormulas}
        />

        {/* --- TENSIONES EN X E Y --- */}
        <FormulaBlock
          title="Tensión Máxima X"
          tooltip="Tensión Máxima en eje X, determinada con diagrama trapecial o triangular según excentricidad"
          symbolic={symbolicTensionXMax}
          substituted={substitutedTensionXMax}
          result={tensionMaximaX.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Tensión Mínima X"
          tooltip="Tensión Mínima X, determinada con diagrama trapecial o triangular según excentricidad"
          symbolic={symbolicTensionXMin}
          substituted={substitutedTensionXMin}
          result={tensionMinimaX.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Tensión Máxima Y"
          tooltip="Tensión Máxima Y, determinada con diagrama trapecial o triangular según excentricidad"
          symbolic={symbolicTensionYMax}
          substituted={substitutedTensionYMax}
          result={tensionMaximaY.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Tensión Mínima Y"
          tooltip="Tensión Mínima Y, determinada con diagrama trapecial o triangular según excentricidad"
          symbolic={symbolicTensionYMin}
          substituted={substitutedTensionYMin}
          result={tensionMinimaY.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        {/* --- VERIFICACIONES DE TENSIONES ADMISIBLE --- */}
        <FormulaBlock
          title="Verificación de tensión Máxima X"
          tooltip="La tensión máxima en X debe ser menor o igual a 1.25·qadm"
          symbolic={`\\sigma_{x \\ max} \\leq 1.25\\ q_{adm}`}
          substituted={`\\sigma_{x \\ max} = ${verificacionesBase.tensionMaximaX.toFixed(
            2
          )}\\,kN/m^2 
  \\leq 1.25\\cdot${base.cargaAdmisible.valor.toFixed(2)}\\,kN/m^2`}
          result={
            verificacionesBase.tensionMaximaX <=
            1.25 * base.cargaAdmisible.valor
              ? "Sí"
              : "No"
          }
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación de tensión Máxima Y"
          tooltip="La tensión máxima en Y debe ser menor o igual a 1.25·qadm"
          symbolic={`\\sigma_{y \\ max} \\leq 1.25\\ q_{adm}`}
          substituted={`\\sigma_{y \\ max} = ${verificacionesBase.tensionMaximaY.toFixed(
            2
          )}\\,kN/m^2 
  \\leq 1.25\\cdot${base.cargaAdmisible.valor.toFixed(2)}\\,kN/m^2`}
          result={
            verificacionesBase.tensionMaximaY <=
            1.25 * base.cargaAdmisible.valor
              ? "Sí"
              : "No"
          }
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación de tensiones X"
          tooltip="El promedio de tensiones en X debe ser menor o igual a qadm"
          symbolic={`\\frac{\\sigma_{x \\ max} + \\sigma_{x \\ min}}{2} \\leq q_{adm}`}
          substituted={`\\frac{${verificacionesBase.tensionMaximaX.toFixed(
            2
          )} + ${verificacionesBase.tensionMinimaX.toFixed(2)}}{2}\\,kN/m^2 
  \\leq ${base.cargaAdmisible.valor.toFixed(2)}\\,kN/m^2`}
          result={
            (verificacionesBase.tensionMaximaX +
              verificacionesBase.tensionMinimaX) /
              2 <=
            base.cargaAdmisible.valor
              ? "Sí"
              : "No"
          }
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación de tensiones Y"
          tooltip="El promedio de tensiones en Y debe ser menor o igual a qadm"
          symbolic={`\\frac{\\sigma_{y \\ max} + \\sigma_{y \\ min}}{2} \\leq q_{adm}`}
          substituted={`\\frac{${verificacionesBase.tensionMaximaY.toFixed(
            2
          )} + ${verificacionesBase.tensionMinimaY.toFixed(2)}}{2}\\,kN/m^2 
  \\leq ${base.cargaAdmisible.valor.toFixed(2)}\\,kN/m^2`}
          result={
            (verificacionesBase.tensionMaximaY +
              verificacionesBase.tensionMinimaY) /
              2 <=
            base.cargaAdmisible.valor
              ? "Sí"
              : "No"
          }
          showFormulas={showFormulas}
        />

        {/* --- ASENTAMIENTOS --- */}
        <FormulaBlock
          title="Asentamiento Medio"
          tooltip="Relación entre carga y módulo de balasto"
          symbolic={`s_{med} = \\frac{N}{k \\cdot a_{x} \\cdot a_{y}}`}
          substituted={`s_{med} = \\frac{${normal.toFixed(
            2
          )}\\ kN}{${base.moduloBalasto.valor.toFixed(2)} \\cdot ${b_x.toFixed(
            2
          )}\\ m \\cdot ${b_y.toFixed(2)}\\ m}`}
          result={(asentamientoMedio * 1000).toFixed(2)}
          unit="mm"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Asentamiento Máximo"
          tooltip="Incluye efectos de momentos en X e Y"
          symbolic={`s_{max} = \\frac{1}{k} \\left( \\frac{N}{a_{x} \\cdot a_{y}} + \\frac{6 \\cdot M_{x}}{a_{x} \\cdot a_{y}^{2}} + \\frac{6 \\cdot M_{y}}{a_{y} \\cdot a_{x}^{2}} \\right)`}
          substituted={`s_{max} = \\frac{1}{${base.moduloBalasto.valor.toFixed(
            2
          )}} \\left( \\frac{${normal.toFixed(2)}\\ kN}{${b_x.toFixed(
            2
          )}\\ m \\cdot ${b_y.toFixed(
            2
          )}\\ m} + \\frac{6 \\cdot ${momentoX.toFixed(
            2
          )}\\ kN·m}{${b_x.toFixed(2)}\\ m \\cdot (${b_y.toFixed(
            2
          )})^2\\ m^2} + \\frac{6 \\cdot ${momentoY.toFixed(
            2
          )}\\ kN·m}{${b_y.toFixed(2)}\\ m \\cdot (${b_x.toFixed(
            2
          )})^2\\ m^2} \\right)`}
          result={(asentamientoMaximo * 1000).toFixed(2)}
          unit="mm"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Asentamiento Mínimo"
          tooltip="Incluye efectos de momentos en X e Y. Debe ser mayor a 0"
          symbolic={`s_{min} = \\frac{1}{k} \\left( \\frac{N}{a_{x} \\cdot a_{y}} - \\frac{6 \\cdot M_{x}}{a_{x} \\cdot a_{y}^{2}} - \\frac{6 \\cdot M_{y}}{a_{y} \\cdot a_{x}^{2}} \\right)`}
          substituted={`s_{min} = \\frac{1}{${base.moduloBalasto.valor.toFixed(
            2
          )}} \\left( \\frac{${normal.toFixed(2)}\\ kN}{${b_x.toFixed(
            2
          )}\\ m \\cdot ${b_y.toFixed(
            2
          )}\\ m} - \\frac{6 \\cdot ${momentoX.toFixed(
            2
          )}\\ kN·m}{${b_x.toFixed(2)}\\ m \\cdot (${b_y.toFixed(
            2
          )})^2\\ m^2} - \\frac{6 \\cdot ${momentoY.toFixed(
            2
          )}\\ kN·m}{${b_y.toFixed(2)}\\ m \\cdot (${b_x.toFixed(
            2
          )})^2\\ m^2} \\right)`}
          result={(asentamientoMinimo * 1000).toFixed(2)}
          unit="mm"
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación de Asentamiento Medio"
          tooltip="Debe cumplirse s medio ≤ 35 mm"
          symbolic={`s_{med} \\leq 35\\ mm`}
          substituted={`${(asentamientoMedio * 1000).toFixed(
            2
          )}\\ mm \\leq 35\\ mm`}
          result={verificaAsentamientoMedio ? "Sí" : "No"}
          showFormulas={showFormulas}
        />

        {/* --- DISTORSIÓN ANGULAR --- */}
        <FormulaBlock
          title="Distorsión Angular"
          tooltip="Relación entre diferencia de asentamientos y la diagonal de la base"
          symbolic={`\\beta = \\frac{s_{max} - s_{min}}{\\sqrt{a_{x}^{2} + a_{y}^{2}}}`}
          substituted={`\\beta = \\frac{${(asentamientoMaximo * 1000).toFixed(
            2
          )}\\ mm - ${(asentamientoMinimo * 1000).toFixed(
            2
          )}\\ mm}{\\sqrt{({${b_x.toFixed(2)}\\ \\text{m})^{2} + (${b_y.toFixed(
            2
          )}\\ \\text{m})^{2}}}}`}
          result={distorsionAngular.toFixed(4)}
          showFormulas={showFormulas}
        />

        <FormulaBlock
          title="Verificación de Asentamiento Diferencial"
          tooltip="Debe cumplirse β ≤ 1/500"
          symbolic={`\\beta \\leq 0.002`}
          substituted={`\\beta = ${distorsionAngular.toFixed(4)} \\leq 0.002`}
          result={verificaAsentamientoDiferencial ? "Sí" : "No"}
          showFormulas={showFormulas}
        />
      </div>
    </div>
  );
};

export default FormulasVerificacionesBase;
