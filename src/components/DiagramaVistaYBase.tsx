import React, { useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigon } from "../types/BaseHormigon";

/**
 * Componente que dibuja la vista en Y de una base de hormigón.
 * Similar a la vista en X, pero usando las dimensiones correspondientes al eje Y.
 * El objetivo es representar de forma visual y esquemática las proporciones de la base y la columna.
 */
const DiagramaVistaYBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  baseHormigon: BaseHormigon;
}> = ({ dimensionesBase, baseHormigon }) => {
  // Referencia al escenario de Konva (canvas), útil si se necesita exportar o manipular la imagen
  const stageRef = useRef(null);

  // Factor de escala para representar metros en píxeles
  const scaleFactor = 100;

  // Dimensiones del área donde se dibuja el diagrama
  const width = 500;
  const height = 400;

  // Calculamos posición inicial para centrar la base dentro del canvas
  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - baseHormigon.nivelFundacion.valor * scaleFactor) / 2;

  // Dimensiones en Y de la columna (parte superior del dibujo)
  const smallRectWidth = baseHormigon.anchoColumnaY.valor * scaleFactor;
  const smallRectHeight =
    (baseHormigon.nivelFundacion.valor - dimensionesBase.altura) * scaleFactor;

  // Dimensiones en Y de la base de hormigón (parte inferior)
  const largeRectWidth = dimensionesBase.anchoY * scaleFactor;
  const largeRectHeight = dimensionesBase.altura * scaleFactor;

  // Línea horizontal de referencia visual en la parte superior de la base
  const lineY = startY + smallRectHeight + largeRectHeight - 0.05 * scaleFactor;

  // Extremos izquierdo y derecho para líneas auxiliares
  const leftX = startX + 0.05 * scaleFactor;
  const rightX = startX + largeRectWidth - 0.05 * scaleFactor;

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        {/* Rectángulo que representa la columna en la vista Y */}
        <Rect
          x={startX + (largeRectWidth - smallRectWidth) / 2} // centrado horizontal
          y={startY}
          width={smallRectWidth}
          height={smallRectHeight}
          fill="gray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Rectángulo que representa la base completa */}
        <Rect
          x={startX}
          y={startY + smallRectHeight} // comienza debajo de la columna
          width={largeRectWidth}
          height={largeRectHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Línea verde de referencia en la parte superior de la base */}
        <Line
          points={[leftX, lineY, rightX, lineY]}
          stroke="green"
          strokeWidth={2}
        />
        {/* Marcas verticales pequeñas en los extremos de la línea */}
        <Line
          points={[leftX, lineY, leftX, lineY - 0.05 * scaleFactor]}
          stroke="green"
          strokeWidth={2}
        />
        <Line
          points={[rightX, lineY, rightX, lineY - 0.05 * scaleFactor]}
          stroke="green"
          strokeWidth={2}
        />

        {/* Línea que marca el ancho total de la base en Y */}
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

        {/* Texto que indica el ancho 'ay' de la base */}
        <Text
          x={startX}
          y={startY + smallRectHeight + largeRectHeight + 25}
          width={largeRectWidth}
          text={`ay = ${dimensionesBase.anchoY} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Línea vertical indicando la altura de la base */}
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

        {/* Texto que muestra la altura 'h' de la base */}
        <Text
          x={startX + largeRectWidth + 20}
          y={startY + smallRectHeight + largeRectHeight / 2}
          width={100}
          text={`h = ${dimensionesBase.altura} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Línea que representa el ancho de la columna en Y */}
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

        {/* Texto que indica el ancho de columna 'cy' */}
        <Text
          x={startX + (largeRectWidth - smallRectWidth) / 2.25}
          y={startY - 30}
          text={`cy = ${baseHormigon.anchoColumnaY.valor} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Línea vertical que marca NSZ (nivel superior de zapata) */}
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

        {/* Texto que indica la altura del tramo NSZ */}
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

export default DiagramaVistaYBase;
