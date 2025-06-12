import React, { useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../types/BaseHormigonArmadura";

const DiagramaVistaYBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  calculoArmadura: BaseHormigonArmadura;
}> = ({ dimensionesBase, calculoArmadura }) => {
  const stageRef = useRef(null);
  const scaleFactor = 100;
  const width = 600;
  const height = 400;

  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - 2.5 * scaleFactor) / 2;

  const smallRectWidth = 0.4 * scaleFactor;
  const smallRectHeight = (2.5 - dimensionesBase.altura) * scaleFactor;

  const largeRectWidth = dimensionesBase.anchoY * scaleFactor;
  const largeRectHeight = dimensionesBase.altura * scaleFactor;

  const lineY = startY + smallRectHeight + largeRectHeight - 0.05 * scaleFactor;
  const leftX = startX + 0.05 * scaleFactor;
  const rightX = startX + largeRectWidth - 0.05 * scaleFactor;

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        {/* Small Rectangle */}
        <Rect
          x={startX + (largeRectWidth - smallRectWidth) / 2}
          y={startY}
          width={smallRectWidth}
          height={smallRectHeight}
          fill="gray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Large Rectangle */}
        <Rect
          x={startX}
          y={startY + smallRectHeight}
          width={largeRectWidth}
          height={largeRectHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Horizontal Blue Line inside the Large Rectangle */}
        <Line
          points={[leftX, lineY, rightX, lineY]}
          stroke="green"
          strokeWidth={2}
        />

        {/* Vertical Blue Lines at both ends */}
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

        {/* Horizontal Line Below Large Rectangle */}
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

        {/* Text Below Large Rectangle */}
        <Text
          x={startX}
          y={startY + smallRectHeight + largeRectHeight + 25}
          width={largeRectWidth}
          text={`ax = ${dimensionesBase.anchoY} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Vertical Line to the Right of Large Rectangle */}
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

        {/* Text to the Right of Large Rectangle */}
        <Text
          x={startX + largeRectWidth + 20}
          y={startY + smallRectHeight + largeRectHeight / 2}
          width={100}
          text={`h = ${dimensionesBase.altura} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Horizontal Line Above Small Rectangle */}
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

        {/* Text Above Small Rectangle */}
        <Text
          x={startX + (largeRectWidth - smallRectWidth) / 2.25}
          y={startY - 30}
          text={`cy = 0.4 m`}
          fontSize={16}
          fill="black"
          align="center"
        />

        {/* Extended Vertical Line Above Large Rectangle */}
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

        {/* Text Centered Vertically with Small Rectangle */}
        <Text
          x={startX + largeRectWidth + 15}
          y={startY + smallRectHeight / 2 - 10}
          text={`NSZ = -1.95 m`}
          fontSize={16}
          fill="black"
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default DiagramaVistaYBase;
