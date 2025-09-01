export interface BaseHormigonVerificaciones {
  id: number;
  coeficienteSeguridadVuelco: number;
  verificaVuelco: boolean;
  coeficienteSeguridadDeslizamiento: number;
  verificaDeslizamiento: boolean;
  excentricidadX: number;
  excentricidadY: number;
  tensionMaximaX: number;
  tensionMinimaX: number;
  tensionMaximaY: number;
  tensionMinimaY: number;
  verificaTensionAdmisible: boolean;
  asentamientoMedio: number;
  asentamientoMaximo: number;
  asentamientoMinimo: number;
  distorsionAngular: number;
  verificaAsentamientoMedio: boolean;
  verificaAsentamientoDiferencial: boolean;
}
