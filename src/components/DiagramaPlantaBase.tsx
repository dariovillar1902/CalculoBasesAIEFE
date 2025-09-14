import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../types/BaseHormigonArmadura";
import type { BaseHormigon } from "../types/BaseHormigon";

const DiagramaPlantaBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  calculoArmadura: BaseHormigonArmadura;
  baseHormigon: BaseHormigon;
}> = ({ dimensionesBase, calculoArmadura, baseHormigon }) => {
  const stageRef = useRef(null);
  const scaleFactor = 100;
  const width = 500;
  const height = 400;

  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - dimensionesBase.anchoY * scaleFactor) / 2;
  const ay_cm = dimensionesBase.anchoY * 100;
  const ax_cm = dimensionesBase.anchoX * 100;

  const sx_cm = calculoArmadura.separacionBarrasX;
  const sy_cm = calculoArmadura.separacionBarrasY;

  const Nx = Math.floor(ay_cm / sx_cm) + 1;
  const Ny = Math.floor(ax_cm / sy_cm) + 1;

  const spacingY = (dimensionesBase.anchoY * scaleFactor) / (Nx - 1);
  const spacingX = (dimensionesBase.anchoX * scaleFactor) / (Ny - 1);

  const lines = Array.from({ length: Nx }, (_, i) => startY + i * spacingY);
  const verticalLines = Array.from(
    { length: Ny },
    (_, i) => startX + i * spacingX
  );

  useEffect(() => {
    if (!dimensionesBase || !calculoArmadura) return;
  }, [dimensionesBase, calculoArmadura]);

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        <Rect
          x={(width - dimensionesBase.anchoX * scaleFactor) / 2}
          y={(height - dimensionesBase.anchoY * scaleFactor) / 2}
          width={dimensionesBase.anchoX * scaleFactor}
          height={dimensionesBase.anchoY * scaleFactor}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

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

        <Text
          x={(width - dimensionesBase.anchoX * scaleFactor) / 2}
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            dimensionesBase.anchoY * scaleFactor +
            30
          }
          width={dimensionesBase.anchoX * scaleFactor}
          text={`ax = ${dimensionesBase.anchoX} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        <Line
          points={[
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              dimensionesBase.anchoX * scaleFactor +
              10,
            (height - dimensionesBase.anchoY * scaleFactor) / 2,
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              dimensionesBase.anchoX * scaleFactor +
              10,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              dimensionesBase.anchoY * scaleFactor,
          ]}
          stroke="black"
          strokeWidth={2}
        />

        <Text
          x={
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
            dimensionesBase.anchoX * scaleFactor +
            20
          }
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            (dimensionesBase.anchoY * scaleFactor) / 2
          }
          width={100}
          text={`ay = ${dimensionesBase.anchoY} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        <Rect
          x={
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
            (dimensionesBase.anchoX * scaleFactor -
              baseHormigon.anchoColumnaX.valor * scaleFactor) /
              2
          }
          y={
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
            (dimensionesBase.anchoY * scaleFactor -
              baseHormigon.anchoColumnaY.valor * scaleFactor) /
              2
          }
          width={baseHormigon.anchoColumnaX.valor * scaleFactor}
          height={baseHormigon.anchoColumnaY.valor * scaleFactor}
          fill="gray"
          stroke="black"
          strokeWidth={2}
        />

        <Line
          points={[
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              (dimensionesBase.anchoX * scaleFactor -
                baseHormigon.anchoColumnaX.valor * scaleFactor) /
                2,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              (dimensionesBase.anchoY * scaleFactor -
                baseHormigon.anchoColumnaY.valor * scaleFactor) /
                2 +
              baseHormigon.anchoColumnaY.valor * scaleFactor +
              10,
            (width - dimensionesBase.anchoX * scaleFactor) / 2 +
              (dimensionesBase.anchoX * scaleFactor -
                baseHormigon.anchoColumnaX.valor * scaleFactor) /
                2 +
              baseHormigon.anchoColumnaX.valor * scaleFactor,
            (height - dimensionesBase.anchoY * scaleFactor) / 2 +
              (dimensionesBase.anchoY * scaleFactor -
                baseHormigon.anchoColumnaY.valor * scaleFactor) /
                2 +
              baseHormigon.anchoColumnaY.valor * scaleFactor +
              10,
          ]}
          stroke="black"
          strokeWidth={2}
        />

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
          text={`cx = ${baseHormigon.anchoColumnaX.valor} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

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
          text={`cy = ${baseHormigon.anchoColumnaY.valor} m`}
          fontSize={16}
          fill="black"
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default DiagramaPlantaBase;
