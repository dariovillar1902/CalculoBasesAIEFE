export interface BaseHormigonCuantia {
  id: number;
  esfuerzoAxilMayorado: number;
  cargaMayorada: number;
  momentoMayoradoX: number;
  momentoMayoradoY: number;
  momentoNominalX: number;
  momentoNominalY: number;
  factorAdimensionalX: number;
  factorAdimensionalY: number;
  cuantiaMecanicaX: number;
  cuantiaMecanicaY: number;
  cuantiaCalculoX: number;
  cuantiaCalculoY: number;
  cuantiaMaxima: number;
  verificaCuantiaMaxima: boolean;
  cuantiaMinima: number;
  cuantiaAdoptadaX: number;
  cuantiaAdoptadaY: number;
  areaAceroX: number;
  areaAceroY: number;
}
