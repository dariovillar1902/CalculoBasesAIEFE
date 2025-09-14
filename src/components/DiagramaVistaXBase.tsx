import React, { useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigon } from "../types/BaseHormigon";

const DiagramaVistaXBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  baseHormigon: BaseHormigon;
}> = ({ dimensionesBase, baseHormigon }) => {
  const stageRef = useRef(null);
  const scaleFactor = 100;
  const width = 500;
  const height = 400;

  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - baseHormigon.nivelFundacion.valor * scaleFactor) / 2;

  const smallRectWidth = baseHormigon.anchoColumnaX.valor * scaleFactor;
  const smallRectHeight =
    (baseHormigon.nivelFundacion.valor - dimensionesBase.altura) * scaleFactor;

  const largeRectWidth = dimensionesBase.anchoX * scaleFactor;
  const largeRectHeight = dimensionesBase.altura * scaleFactor;

  const lineY = startY + smallRectHeight + largeRectHeight - 0.05 * scaleFactor;
  const leftX = startX + 0.05 * scaleFactor;
  const rightX = startX + largeRectWidth - 0.05 * scaleFactor;

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        <Rect
          x={startX + (largeRectWidth - smallRectWidth) / 2}
          y={startY}
          width={smallRectWidth}
          height={smallRectHeight}
          fill="gray"
          stroke="black"
          strokeWidth={2}
        />

        <Rect
          x={startX}
          y={startY + smallRectHeight}
          width={largeRectWidth}
          height={largeRectHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        <Line
          points={[leftX, lineY, rightX, lineY]}
          stroke="blue"
          strokeWidth={2}
        />

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

        <Text
          x={startX}
          y={startY + smallRectHeight + largeRectHeight + 25}
          width={largeRectWidth}
          text={`ax = ${dimensionesBase.anchoX} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

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

        <Text
          x={startX + largeRectWidth + 20}
          y={startY + smallRectHeight + largeRectHeight / 2}
          width={100}
          text={`h = ${dimensionesBase.altura} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

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

        <Text
          x={startX + (largeRectWidth - smallRectWidth) / 2.5}
          y={startY - 30}
          text={`cx = ${baseHormigon.anchoColumnaX.valor} m`}
          fontSize={16}
          fill="black"
          align="center"
        />

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

        <Text
          x={startX + largeRectWidth + 15}
          y={startY + smallRectHeight / 2 - 10}
          text={`NSZ = -${
            baseHormigon.nivelFundacion.valor - dimensionesBase.altura
          } m`}
          fontSize={16}
          fill="black"
          align="center"
        />
      </Layer>
    </Stage>
  );
};

export default DiagramaVistaXBase;
