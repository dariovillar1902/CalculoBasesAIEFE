export interface BaseHormigonVerificacionCorte {
  id: number;
  cargaTotal: number;
  resistenciaRequeridaX: number;
  resistenciaRequeridaY: number;
  resistenciaNominalX: number;
  resistenciaNominalY: number;
  resistenciaDisenoX: number;
  resistenciaDisenoY: number;
  cumpleVerificacion: boolean;
}
