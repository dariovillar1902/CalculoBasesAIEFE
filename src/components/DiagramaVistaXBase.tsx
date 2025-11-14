import React, { useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigon } from "../types/BaseHormigon";

/**
 * Componente que dibuja la vista en X de una base de hormigón.
 * Utiliza react-konva para generar un diagrama esquemático que ayuda a visualizar
 * las dimensiones geométricas de la base y la columna.
 */
const DiagramaVistaXBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  baseHormigon: BaseHormigon;
}> = ({ dimensionesBase, baseHormigon }) => {
  // Referencia al "escenario" de Konva, permite exportar o manipular el canvas si hiciera falta
  const stageRef = useRef(null);

  // Factor de escala para convertir metros a píxeles dentro del dibujo
  const scaleFactor = 100;

  // Tamaño total del área donde se va a dibujar el diagrama
  const width = 500;
  const height = 400;

  // Calculamos la posición inicial para centrar la base en el área de dibujo
  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - baseHormigon.nivelFundacion.valor * scaleFactor) / 2;

  // Dimensiones de la columna (parte superior)
  const smallRectWidth = baseHormigon.anchoColumnaX.valor * scaleFactor;
  const smallRectHeight =
    (baseHormigon.nivelFundacion.valor - dimensionesBase.altura) * scaleFactor;

  // Dimensiones de la base de hormigón (parte inferior)
  const largeRectWidth = dimensionesBase.anchoX * scaleFactor;
  const largeRectHeight = dimensionesBase.altura * scaleFactor;

  // Ubicación de una línea horizontal usada como referencia visual
  const lineY = startY + smallRectHeight + largeRectHeight - 0.05 * scaleFactor;

  // Extremos izquierdo y derecho para varias líneas de referencia
  const leftX = startX + 0.05 * scaleFactor;
  const rightX = startX + largeRectWidth - 0.05 * scaleFactor;

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        {/* Rectángulo que representa la columna en sección */}
        <Rect
          x={startX + (largeRectWidth - smallRectWidth) / 2} // Centrado horizontalmente sobre la base
          y={startY}
          width={smallRectWidth}
          height={smallRectHeight}
          fill="gray" // Color de relleno
          stroke="black" // Borde
          strokeWidth={2}
        />

        {/* Rectángulo que representa la base de hormigón */}
        <Rect
          x={startX}
          y={startY + smallRectHeight} // Se dibuja debajo de la columna
          width={largeRectWidth}
          height={largeRectHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Línea azul que marca una referencia visual en la parte superior de la base */}
        <Line
          points={[leftX, lineY, rightX, lineY]}
          stroke="blue"
          strokeWidth={2}
        />

        {/* Pequeñas líneas verticales en los extremos de la línea azul */}
        <Line
          points={[leftX, lineY, leftX, lineY - 0.05 * scaleFactor]}
          stroke="blue"
          strokeWidth={2}
        />
        <Line
          points={[rightX, lineY, rightX, lineY - 0.05 * scaleFactor]}
          stroke="blue"
          strokeWidth={2}
        />

        {/* Línea que marca el ancho total de la base */}
        <Line
          points={[
            startX,
            startY + smallRectHeight + largeRectHeight + 10,
            startX + largeRectWidth,
            startY + smallRectHeight + largeRectHeight + 10,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Texto que muestra el ancho de la base en metros */}
        <Text
          x={startX}
          y={startY + smallRectHeight + largeRectHeight + 25}
          width={largeRectWidth}
          text={`ax = ${dimensionesBase.anchoX} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Línea vertical que marca la altura de la base */}
        <Line
          points={[
            startX + largeRectWidth + 10,
            startY + smallRectHeight,
            startX + largeRectWidth + 10,
            startY + smallRectHeight + largeRectHeight,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Texto que indica la altura de la base */}
        <Text
          x={startX + largeRectWidth + 20}
          y={startY + smallRectHeight + largeRectHeight / 2}
          width={100}
          text={`h = ${dimensionesBase.altura} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Línea que marca el ancho de la columna */}
        <Line
          points={[
            startX + (largeRectWidth - smallRectWidth) / 2,
            startY - 10,
            startX + (largeRectWidth - smallRectWidth) / 2 + smallRectWidth,
            startY - 10,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Texto con el ancho de la columna */}
        <Text
          x={startX + (largeRectWidth - smallRectWidth) / 2.5}
          y={startY - 30}
          text={`cx = ${baseHormigon.anchoColumnaX.valor} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Línea vertical que marca la altura libre entre columna y base (NSZ) */}
        <Line
          points={[
            startX + largeRectWidth + 10,
            startY,
            startX + largeRectWidth + 10,
            startY + smallRectHeight,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Texto que indica la altura NSZ (nivel superior de zapata) */}
        <Text
          x={startX + largeRectWidth + 15}
          y={startY + smallRectHeight / 2 - 10}
          text={`NSZ = -${(
            baseHormigon.nivelFundacion.valor - dimensionesBase.altura
          ).toFixed(2)} m`}
          fontSize={16}
          fill="black"
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default DiagramaVistaXBase;
