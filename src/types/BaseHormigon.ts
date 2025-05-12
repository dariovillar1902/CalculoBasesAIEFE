export interface BaseHormigon {
  id: number;
  esfuerzoAxil: number;
  porcentajeCargaD: number;
  porcentajeCargaL: number;
  anchoColumnaX: number;
  anchoColumnaY: number;
  cargaAdmisible: number;
  pesoEspecificoSuelo: number;
  nivelFundacion: number;
  factorSeguridad: number;
  pesoEspecificoHormigon: number;
  resistenciaCaracteristicaHormigon: number;
  recubrimientoHormigon: number;
  tensionFluenciaAcero: number;
}
