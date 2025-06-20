export interface BaseHormigon {
  id: number;
  esfuerzoAxil: { valor: number; unidad: string; tipo: string };
  porcentajeCargaD: { valor: number; unidad: string; tipo: string };
  porcentajeCargaL: { valor: number; unidad: string; tipo: string };
  anchoColumnaX: { valor: number; unidad: string; tipo: string };
  anchoColumnaY: { valor: number; unidad: string; tipo: string };
  cargaAdmisible: { valor: number; unidad: string; tipo: string };
  pesoEspecificoSuelo: { valor: number; unidad: string; tipo: string };
  nivelFundacion: { valor: number; unidad: string; tipo: string };
  pesoEspecificoHormigon: { valor: number; unidad: string; tipo: string };
  resistenciaCaracteristicaHormigon: {
    valor: number;
    unidad: string;
    tipo: string;
  };
  recubrimientoHormigon: { valor: number; unidad: string; tipo: string };
  tensionFluenciaAcero: { valor: number; unidad: string; tipo: string };
  diametroBarrasX: { valor: number; unidad: string; tipo: string };
  diametroBarrasY: { valor: number; unidad: string; tipo: string };
}
