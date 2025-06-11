export interface BaseHormigonVerificacionPunzonado {
  id: number;
  esfuerzoAxilMayorado: number;
  cargaTotal: number;
  resistenciaRequerida: number;
  b0: number;
  b: number;
  resistenciaNominal: number;
  resistenciaDiseno: number;
  cumpleVerificacion: boolean;
}
