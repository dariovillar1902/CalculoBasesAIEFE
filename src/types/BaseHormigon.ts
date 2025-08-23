import type { ValueUnitPair } from "./ValueUnitPair";

export interface BaseHormigon {
  id: number;
  nombre: string;

  // Parámetros básicos
  esfuerzoAxil: ValueUnitPair;
  esfuerzoCorteX: ValueUnitPair;
  esfuerzoCorteY: ValueUnitPair;
  momentoX: ValueUnitPair;
  momentoY: ValueUnitPair;
  cargaAdmisible: ValueUnitPair;
  moduloBalastoVertical: ValueUnitPair;

  // Ajustes avanzados
  porcentajeCargaD: ValueUnitPair;
  porcentajeCargaL: ValueUnitPair;
  anchoColumnaX: ValueUnitPair;
  anchoColumnaY: ValueUnitPair;
  pesoEspecificoSuelo: ValueUnitPair;
  nivelFundacion: ValueUnitPair;
  pesoEspecificoHormigon: ValueUnitPair;
  resistenciaCaracteristicaHormigon: ValueUnitPair;
  recubrimientoHormigon: ValueUnitPair;
  tensionFluenciaAcero: ValueUnitPair;
  diametroBarrasX: ValueUnitPair;
  diametroBarrasY: ValueUnitPair;
}
