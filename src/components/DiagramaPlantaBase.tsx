import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../types/BaseHormigonArmadura";

const DiagramaPlantaBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  calculoArmadura: BaseHormigonArmadura;
}> = ({ dimensionesBase, calculoArmadura }) => {
  const stageRef = useRef(null);
  const scaleFactor = 100;
  const width = 600;
  const height = 400;

  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - dimensionesBase.anchoY * scaleFactor) / 2;
  const spacingY =
    (dimensionesBase.anchoY * scaleFactor) /
    (calculoArmadura.cantidadBarrasX - 1); // Even spacing within rectangle height
  const lines = Array.from(
    { length: calculoArmadura.cantidadBarrasX },
    (_, i) => startY + i * spacingY
  );

  const spacingX =
    (dimensionesBase.anchoX * scaleFactor) /
    (calculoArmadura.cantidadBarrasY - 1); // Even spacing across width
  const verticalLines = Array.from(
    { length: calculoArmadura.cantidadBarrasY },
    (_, i) => startX + i * spacingX
  );

  useEffect(() => {
    if (!dimensionesBase || !calculoArmadura) return;
    // Handle any updates if necessary
  }, [dimensionesBase, calculoArmadura]);

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        {/* Rectangle */}
        <Rect
          x={(width - dimensionesBase.anchoX * scaleFactor) / 2}
          y={(height - dimensionesBase.anchoY * scaleFactor) / 2}
          width={dimensionesBase.anchoX * scaleFactor}
          height={dimensionesBase.anchoY * scaleFactor}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Horizontal blue lines inside the rectangle */}
        {lines.map((yPosition, index) => (
          <Line
            key={index}
            points={[
              startX,
              yPosition,
              startX + dimensionesBase.anchoX * scaleFactor,
              yPosition,
            ]}
            stroke="blue"
            strokeWidth={2}
          />
        ))}

        {/* Vertical blue lines inside the rectangle */}
        {verticalLines.map((xPosition, index) => (
          <Line
            key={`v-${index}`}
            points={[
              xPosition,
              startY,
              xPosition,
              startY + dimensionesBase.anchoY * scaleFactor,
            ]}
            stroke="green"
            strokeWidth={2}
          />
        ))}

        {/* Horizontal line below the rectangle */}
        <Line
          points={[
            (width - dimensionesBase.anchoX * scaleFactor) / 2,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              dimensionesBase.anchoY * scaleFactor +
              10,
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              dimensionesBase.anchoX * scaleFactor,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              dimensionesBase.anchoY * scaleFactor +
              10,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Centered text for "ax" below horizontal line */}
        <Text
          x={(width - dimensionesBase.anchoX * scaleFactor) / 2} // Aligning to the left of the line
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            dimensionesBase.anchoY * scaleFactor +
            30
          } // Positioning below the line
          width={dimensionesBase.anchoX * scaleFactor} // Ensuring centering
          text={`ax = ${dimensionesBase.anchoX} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Vertical line to the right of the rectangle */}
        <Line
          points={[
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              dimensionesBase.anchoX * scaleFactor +
              10, // Right of rectangle + 10px space
            (height - dimensionesBase.anchoY * scaleFactor) / 2, // Top aligned with rectangle
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              dimensionesBase.anchoX * scaleFactor +
              10, // Same X
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              dimensionesBase.anchoY * scaleFactor, // Bottom aligned with rectangle
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Centered text for "ay" to the right of vertical line */}
        <Text
          x={
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
            dimensionesBase.anchoX * scaleFactor +
            20
          } // Placed to the right of the vertical line
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            (dimensionesBase.anchoY * scaleFactor) / 2
          } // Centered vertically
          width={100} // Setting a width to properly align
          text={`ay = ${dimensionesBase.anchoY} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        <Rect
          x={
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
            (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2
          }
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2
          }
          width={0.4 * scaleFactor}
          height={0.25 * scaleFactor}
          fill="gray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Horizontal line below the inner rectangle */}
        <Line
          points={[
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2 +
              0.25 * scaleFactor +
              10,
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2 +
              0.4 * scaleFactor,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2 +
              0.25 * scaleFactor +
              10,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Text below the inner rectangle */}
        <Text
          x={
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
            (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2 -
            15
          }
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2 +
            0.25 * scaleFactor +
            20
          }
          text={`cx = 0.4 m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Vertical line to the right of the inner rectangle */}
        <Line
          points={[
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2 +
              0.4 * scaleFactor +
              10,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2,
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2 +
              0.4 * scaleFactor +
              10,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2 +
              0.25 * scaleFactor,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        {/* Text to the right of the inner rectangle */}
        <Text
          x={
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
            (dimensionesBase.anchoX * scaleFactor - 0.4 * scaleFactor) / 2 +
            0.4 * scaleFactor +
            10
          }
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            (dimensionesBase.anchoY * scaleFactor - 0.25 * scaleFactor) / 2 +
            (0.25 * scaleFactor) / 4
          }
          width={100}
          text={`cy = 0.25 m`}
          fontSize={16}
          fill="black"
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default DiagramaPlantaBase;
