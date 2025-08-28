export interface BaseHormigonCuantia {
  id: number;

  esfuerzoAxilMayorado: number; // kN
  cargaMayorada: number; // kN/m²
  cargaMayorada1: number; // kN/m²
  cargaMayorada2: number; // kN/m²

  momentoMayorado: number; // kN·m
  momentoMayoradoX: number; // kN·m
  momentoMayoradoY: number; // kN·m

  momentoNominalX: number; // kN·m
  momentoNominalY: number; // kN·m

  excentricidadMayorada: number; // m

  factorAdimensionalX: number; // adimensional
  factorAdimensionalY: number; // adimensional

  cuantiaMecanicaX: number; // adimensional
  cuantiaMecanicaY: number; // adimensional

  cuantiaCalculoX: number; // adimensional
  cuantiaCalculoY: number; // adimensional

  cuantiaMaxima: number; // adimensional
  verificaCuantiaMaxima: boolean;

  cuantiaMinima: number; // adimensional

  cuantiaAdoptadaX: number; // adimensional
  cuantiaAdoptadaY: number; // adimensional

  areaAceroX: number; // cm²
  areaAceroY: number; // cm²
}
