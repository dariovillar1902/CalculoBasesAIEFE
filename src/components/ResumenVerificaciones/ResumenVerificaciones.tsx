import FormulaBlock from "../FormulaBlock/FormulaBlock";
import type { BaseHormigonVerificaciones } from "../../types/BaseHormigonVerificaciones";
import type { BaseHormigonEsfuerzos } from "../../types/BaseHormigonEsfuerzos";
import type { BaseHormigon } from "../../types/BaseHormigon";
import type { BaseHormigonDimensiones } from "../../types/BaseHormigonDimensiones";
import type { BaseHormigonVerificacionCorte } from "../../types/BaseHormigonVerificacionCorte";
import type { BaseHormigonVerificacionPunzonado } from "../../types/BaseHormigonVerificacionPunzonado";

// Componente que muestra un resumen de todas las verificaciones realizadas para la base
// Incluye vuelco, tensiones, asentamientos, punzonado y corte
// Está pensado para que cualquier persona, incluso no programadora, pueda entender qué se está evaluando

type Props = {
  esfuerzosBase: BaseHormigonEsfuerzos; // Esfuerzos que actúan en la base
  base: BaseHormigon; // Datos principales de la base de hormigón
  dimensionesBase: BaseHormigonDimensiones; // Dimensiones geométricas calculadas
  verificacionesBase: BaseHormigonVerificaciones; // Resultados de verificaciones generales
  verificaCorte: BaseHormigonVerificacionCorte; // Verificación estructural a corte
  verificaPunzonado: BaseHormigonVerificacionPunzonado; // Verificación estructural a punzonado
  showFormulas: boolean; // Indica si se deben mostrar las fórmulas matemáticas
};

const ResumenVerificaciones: React.FC<Props> = ({
  base,
  verificacionesBase,
  verificaCorte,
  verificaPunzonado,
  showFormulas,
}) => {
  // Desestructuramos los valores más importantes para simplificar el código y hacerlo más legible
  const {
    coeficienteSeguridadVuelco,
    verificaVuelco,
    asentamientoMedio,
    verificaAsentamientoMedio,
    distorsionAngular,
    verificaAsentamientoDiferencial,
  } = verificacionesBase;

  return (
    <div className="katex-container">
      {" "}
      {/* Contenedor general que mantiene el estilo de fórmulas */}
      <div className="verificacion-container">
        {" "}
        {/* Contenedor principal de la sección */}
        <h2 className="verificacion-title">Resumen de Verificaciones</h2>{" "}
        {/* Título principal */}
        {/* Cada FormulaBlock representa una verificación estructural o geotécnica */}
        <FormulaBlock
          title="Verificación de Vuelco" // Nombre de la verificación
          tooltip="Debe cumplirse FSv ≥ 1.5" // Aclaración explicativa
          symbolic={`FS_{v} \\geq 1.5`} // Fórmula simbólica
          substituted={`FS_{v} = ${coeficienteSeguridadVuelco.toFixed(
            2
          )} \\geq 1.5`} // Fórmula con valores sustituidos
          result={verificaVuelco ? "Sí" : "No"} // Indica si cumple o no
          showFormulas={showFormulas}
        />
        {/* Verificación de tensiones máximas en la dirección X */}
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
        {/* Verificación de tensiones máximas en Y */}
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
        {/* Verificación de tensión promedio en X */}
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
        {/* Verificación de tensión promedio en Y */}
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
        {/* Verificación de asentamiento medio */}
        <FormulaBlock
          title="Verificación de Asentamiento Medio"
          tooltip="Debe cumplirse s_med ≤ 35 mm"
          symbolic={`s_{med} \\leq 35\\ mm`}
          substituted={`${(asentamientoMedio * 1000).toFixed(
            2
          )}\\ mm \\leq 35\\ mm`}
          result={verificaAsentamientoMedio ? "Sí" : "No"}
          showFormulas={showFormulas}
        />
        {/* Verificación de asentamiento diferencial (distorsión angular) */}
        <FormulaBlock
          title="Verificación de Asentamiento Diferencial"
          tooltip="Debe cumplirse β ≤ 1/500"
          symbolic={`\\beta \\leq 0.002`}
          substituted={`\\beta = ${distorsionAngular.toFixed(4)} \\leq 0.002`}
          result={verificaAsentamientoDiferencial ? "Sí" : "No"}
          showFormulas={showFormulas}
        />
        {/* Verificación estructural a punzonado */}
        <FormulaBlock
          title="Verificación a Punzonado"
          tooltip={`Verifica que Vu ≤ V_d<br/>Si se cumple, la base resiste el punzonado`}
          symbolic="V_u \\leq V_d"
          substituted={`V_u = ${verificaPunzonado.resistenciaRequerida.toFixed(
            2
          )}\\ \\text{kN} \\leq ${verificaPunzonado.resistenciaDiseno.toFixed(
            2
          )}\\ \\text{kN}`}
          result={verificaPunzonado.cumpleVerificacion ? "Sí" : "No"}
          showFormulas={showFormulas}
          reference="Art. 11.12.2.2 CIRSOC 201-05. Página 287" // Referencia normativa
        />
        {/* Verificación estructural a corte */}
        <FormulaBlock
          title="Verificación a Corte"
          tooltip={`Verifica que Vux ≤ Vdx y Vuy ≤ Vdy<br/>Si ambas condiciones se cumplen, la base es segura frente al corte`}
          symbolic="V_{ux} \\leq V_{dx}, \\quad V_{uy} \\leq V_{dy}"
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
          reference="Art. 11.12.2.1 CIRSOC 201-05. Página 286" // Referencia normativa
        />
      </div>
    </div>
  );
};

export default ResumenVerificaciones;
