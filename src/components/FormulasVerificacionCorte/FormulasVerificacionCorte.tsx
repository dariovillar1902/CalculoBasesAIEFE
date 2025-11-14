// Importa los estilos visuales específicos para esta sección
import "./FormulasVerificacionCorte.scss";

// Importa el componente que muestra cada fórmula con su resultado
import FormulaBlock from "../FormulaBlock/FormulaBlock";

// Importa los tipos de datos que se usan para representar la base de hormigón
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonVerificacionCorte } from "../../types/BaseHormigonVerificacionCorte";

// Define los datos que este componente necesita para funcionar
type Props = {
  base: BaseHormigon; // Datos generales de la base de hormigón
  dimensionesBase: BaseHormigonDimensiones; // Medidas físicas de la base
  verificaCorte: BaseHormigonVerificacionCorte; // Resultados de la verificación a corte
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

// Componente principal que muestra todas las fórmulas relacionadas con la verificación a corte
const FormulasVerificacionCorte: React.FC<Props> = ({
  base,
  dimensionesBase,
  verificaCorte,
  showFormulas,
}) => {
  // Se extraen los valores necesarios desde los datos recibidos
  const P = base.esfuerzoAxil.valor; // Carga axial aplicada
  const ax = dimensionesBase.anchoX; // Ancho de la base en dirección X
  const ay = dimensionesBase.anchoY; // Ancho de la base en dirección Y
  const gammaHA = base.pesoEspecificoHormigon.valor; // Peso específico del hormigón armado
  const gammaPrima = base.pesoEspecificoSuelo.valor; // Peso específico del suelo
  const h = dimensionesBase.altura; // Altura total de la base
  const Df = base.nivelFundacion.valor; // Profundidad de fundación
  const cx = base.anchoColumnaX.valor; // Ancho de la columna en dirección X
  const cy = base.anchoColumnaY.valor; // Ancho de la columna en dirección Y
  const d = h - base.recubrimientoHormigon.valor - 0.02; // Altura útil del hormigón (se descuenta recubrimiento y margen)
  const fc = base.resistenciaCaracteristicaHormigon.valor; // Resistencia característica del hormigón

  // Se devuelve el contenido visual del componente
  return (
    <div className="katex-container">
      <div className="corte-container">
        <h2 className="corte-title">Verificación de Corte</h2>

        {/* Fórmula para calcular la carga total sobre la base */}
        <FormulaBlock
          title="Carga Total"
          tooltip={`P: Carga<br/>ax, ay: Dimensiones<br/>γH°A°: Peso hormigón armado<br/>γ′: Peso específico del suelo<br/>h: Altura<br/>Df: Profundidad de fundación`}
          symbolic="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h)"
          substituted={`q = \\frac{${P}\\ \\text{kN}}{${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${ay.toFixed(
            2
          )}\\ \\text{m}} + ${gammaHA}\\ \\text{kN/m}^3 \\cdot ${h.toFixed(
            2
          )}\\ \\text{m} + ${gammaPrima}\\ \\text{kN/m}^3 \\cdot (${Df}\\ \\text{m} - ${h.toFixed(
            2
          )}\\ \\text{m})`}
          result={verificaCorte.cargaTotal.toFixed(2)}
          unit="kN/m²"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular la resistencia requerida en dirección X */}
        <FormulaBlock
          title="Resistencia Requerida en X"
          tooltip={`q: Carga total<br/>ax, ay: Dimensiones<br/>cx: Excentricidad<br/>d: Altura útil`}
          symbolic="V_{ux} = q \cdot \left( \frac{a_x - c_x}{2} - d \right) \cdot a_y"
          substituted={`V_{ux} = ${verificaCorte.cargaTotal.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot \\left( \\frac{${ax.toFixed(
            2
          )}\\ \\text{m} - ${cx}\\ \\text{m}}{2} - ${d.toFixed(
            2
          )}\\ \\text{m} \\right) \\cdot ${ay.toFixed(2)}\\ \\text{m}`}
          result={verificaCorte.resistenciaRequeridaX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular la resistencia requerida en dirección Y */}
        <FormulaBlock
          title="Resistencia Requerida en Y"
          tooltip={`q: Carga total<br/>ax, ay: Dimensiones<br/>cy: Excentricidad<br/>d: Altura útil`}
          symbolic="V_{uy} = q \cdot \left( \frac{a_y - c_y}{2} - d \right) \cdot a_x"
          substituted={`V_{uy} = ${verificaCorte.cargaTotal.toFixed(
            2
          )}\\ \\text{kN/m}^2 \\cdot \\left( \\frac{${ay.toFixed(
            2
          )}\\ \\text{m} - ${cy}\\ \\text{m}}{2} - ${d.toFixed(
            2
          )}\\ \\text{m} \\right) \\cdot ${ax.toFixed(2)}\\ \\text{m}`}
          result={verificaCorte.resistenciaRequeridaY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular la resistencia nominal en dirección X */}
        <FormulaBlock
          title="Resistencia Nominal en X"
          tooltip={`ay: Dimensión<br/>d: Altura útil<br/>f′c: Resistencia del concreto`}
          symbolic="V_{nx} = a_y \cdot d \cdot \frac{\sqrt{f'_c}}{6}"
          substituted={`V_{nx} = ${ay.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\frac{\\sqrt{${fc}\\ \\text{MPa}}}{6}`}
          result={verificaCorte.resistenciaNominalX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular la resistencia nominal en dirección Y */}
        <FormulaBlock
          title="Resistencia Nominal en Y"
          tooltip={`ax: Dimensión<br/>d: Altura útil<br/>f′c: Resistencia del concreto`}
          symbolic="V_{ny} = a_x \cdot d \cdot \frac{\sqrt{f'_c}}{6}"
          substituted={`V_{ny} = ${ax.toFixed(
            2
          )}\\ \\text{m} \\cdot ${d.toFixed(
            2
          )}\\ \\text{m} \\cdot \\frac{\\sqrt{${fc}\\ \\text{MPa}}}{6}`}
          result={verificaCorte.resistenciaNominalY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular la resistencia de diseño en dirección X */}
        <FormulaBlock
          title="Resistencia de Diseño en X"
          tooltip={`Vnx: Resistencia nominal<br/>Factor de reducción: 0.75`}
          symbolic="V_{dx} = 0.75 \cdot V_{nx}"
          substituted={`V_{dx} = 0.75 \\cdot ${verificaCorte.resistenciaNominalX.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaCorte.resistenciaDisenoX.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Fórmula para calcular la resistencia de diseño en dirección Y */}
        <FormulaBlock
          title="Resistencia de Diseño en Y"
          tooltip={`Vny: Resistencia nominal<br/>Factor de reducción: 0.75`}
          symbolic="V_{dy} = 0.75 \cdot V_{ny}"
          substituted={`V_{dy} = 0.75 \\cdot ${verificaCorte.resistenciaNominalY.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaCorte.resistenciaDisenoY.toFixed(2)}
          unit="kN"
          showFormulas={showFormulas}
        />

        {/* Verificación final: compara si las resistencias requeridas están dentro del límite de diseño */}
        <FormulaBlock
          title="Verificación a Corte"
          tooltip={`Verifica que Vux ≤ Vdx y Vuy ≤ Vdy<br/>Si ambas condiciones se cumplen, la base es segura frente al corte`}
          symbolic="V_{ux} \leq V_{dx}, \quad V_{uy} \leq V_{dy}"
          substituted={`V_{ux} = ${verificaCorte.resistenciaRequeridaX.toFixed(
            2
          )}\\ \\text{kN} \\leq ${verificaCorte.resistenciaDisenoX.toFixed(
            2
          )}\\ \\text{kN},\\quad V_{uy} = ${verificaCorte.resistenciaRequeridaY.toFixed(
            2
          )}\\ \\text{kN} \\leq ${verificaCorte.resistenciaDisenoY.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaCorte.cumpleVerificacion ? "Sí" : "No"}
          showFormulas={showFormulas}
          reference="Art. 11.12.2.1 CIRSOC 201-05. Página 286"
        />
      </div>
    </div>
  );
};

export default FormulasVerificacionCorte;
