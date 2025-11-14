// Diccionario que asocia cada nombre de campo con una descripción legible.
// Estas descripciones se usan normalmente para tooltips, etiquetas o ayuda contextual en formularios.
export const fieldDescriptions: Record<string, string> = {
  nombre: "Nombre identificador de la base",

  // Esfuerzos y cargas aplicadas a la base
  esfuerzoAxil: "Fuerza axial aplicada sobre la base",
  esfuerzoCorteX: "Esfuerzo cortante en dirección X",
  esfuerzoCorteY: "Esfuerzo cortante en dirección Y",
  momentoX: "Momento flector en dirección X",
  momentoY: "Momento flector en dirección Y",
  cargaAdmisible: "Presión máxima que el suelo puede soportar",
  moduloBalastoVertical: "Módulo de balasto vertical del suelo",

  // Datos geométricos y parámetros de carga
  porcentajeCargaD: "Porcentaje de carga muerta aplicada",
  porcentajeCargaL: "Porcentaje de carga viva aplicada",
  anchoColumnaX: "Ancho de la columna en dirección X",
  anchoColumnaY: "Ancho de la columna en dirección Y",
  pesoEspecificoSuelo: "Densidad del suelo en la zona de fundación",
  nivelFundacion: "Profundidad desde el nivel del terreno hasta la base",
  pesoEspecificoHormigon: "Densidad del hormigón utilizado",
  resistenciaCaracteristicaHormigon:
    "Resistencia característica a compresión del hormigón",
  recubrimientoHormigon: "Espesor de recubrimiento del hormigón sobre el acero",
  tensionFluenciaAcero: "Tensión de fluencia del acero de refuerzo",
  diametroBarrasX: "Diámetro de las barras de refuerzo en dirección X",
  diametroBarrasY: "Diámetro de las barras de refuerzo en dirección Y",

  // Parámetros económicos y de costos
  costoM3Hormigon:
    "Precio por m3 de Hormigón (valor de referencia Noviembre 2025, para H25)",
  costoKgAcero:
    "Precio por kg de acero (valor de referencia Noviembre 2025, para barras ADN 420)",
  costoM3Excavacion:
    "Precio por m3 de excavación (valor de referencia Noviembre 2025, para excavación poco profunda)",
  coeficienteEsponjamiento: "Coeficiente de esponjamiento del suelo",
};

// Opciones de unidades disponibles por tipo de magnitud.
// Se utilizan para poblar selects dinámicos según el tipo de campo.
export const unitOptions: Record<string, string[]> = {
  fuerza: ["N", "kN", "tf"],
  momento: ["N·m", "kN·m", "tf·m"],
  presion: ["Pa", "kPa", "MPa", "kg/cm²"],
  rigidez: ["kN/m³", "MN/m³"],
  porcentaje: ["%", "-"],
  longitud: ["mm", "cm", "m"],
  densidad: ["kN/m³", "N/m³", "kg/m³"],
  texto: [], // Para campos sin unidad
  precio: ["$"], // Para valores monetarios
};
