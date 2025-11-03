import type { ValueUnitPair } from "./ValueUnitPair";

export interface BaseHormigon {
  id: number;
  nombre: string;

  // Parámetros básicos
  esfuerzoAxil: ValueUnitPair;
  corteX: ValueUnitPair;
  corteY: ValueUnitPair;
  momentoX: ValueUnitPair;
  momentoY: ValueUnitPair;
  cargaAdmisible: ValueUnitPair;
  moduloBalasto: ValueUnitPair;

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
  costoM3Hormigon: ValueUnitPair;
  costoKgAcero: ValueUnitPair;
  costoM3Excavacion: ValueUnitPair;
  coeficienteEsponjamiento: ValueUnitPair;
}
