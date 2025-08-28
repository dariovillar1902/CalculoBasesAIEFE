export interface BaseHormigonDimensiones {
  id: number;
  area: number;
  anchoX: number;
  anchoY: number;
  vueloX: number;
  vueloY: number;
  verificaVuelos: boolean;
  altura: number;

  // Nuevas variables de cálculo
  cargaDiseno: number; // Pd
  tensionPromedio: number; // qAvg
  relacionLados: number; // AnchoX / AnchoY
  areaNecesaria: number; // Área antes del ajuste
}
