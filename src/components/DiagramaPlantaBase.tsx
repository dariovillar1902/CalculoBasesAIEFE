import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";
import type { BaseHormigonDimensiones } from "../types/BaseHormigonDimensiones";
import type { BaseHormigonArmadura } from "../types/BaseHormigonArmadura";
import type { BaseHormigon } from "../types/BaseHormigon";

/**
 * Componente que dibuja la planta de la base de hormigón usando react-konva.
 * Muestra:
 * - la geometría de la base
 * - la malla de armaduras (barras en X e Y)
 * - la columna centrada
 * - las cotas de dimensiones
 */
const DiagramaPlantaBase: React.FC<{
  dimensionesBase: BaseHormigonDimensiones;
  calculoArmadura: BaseHormigonArmadura;
  baseHormigon: BaseHormigon;
}> = ({ dimensionesBase, calculoArmadura, baseHormigon }) => {
  // Referencia al escenario de Konva (no se usa activamente pero queda disponible para exportar o manipular)
  const stageRef = useRef(null);

  // Factor para convertir metros a píxeles en el dibujo
  const scaleFactor = 100;

  // Tamaño fijo del área de dibujo
  const width = 500;
  const height = 400;

  // Calculamos posición inicial para centrar el rectángulo de la base
  const startX = (width - dimensionesBase.anchoX * scaleFactor) / 2;
  const startY = (height - dimensionesBase.anchoY * scaleFactor) / 2;

  // Convertimos dimensiones de la base a centímetros para cálculos de espaciamiento
  const ay_cm = dimensionesBase.anchoY * 100;
  const ax_cm = dimensionesBase.anchoX * 100;

  // Separaciones entre barras en cm según el cálculo de armadura
  const sx_cm = calculoArmadura.separacionBarrasX;
  const sy_cm = calculoArmadura.separacionBarrasY;

  // Cantidad de barras necesarias en cada dirección
  const Nx = Math.floor(ay_cm / sx_cm) + 1;
  const Ny = Math.floor(ax_cm / sy_cm) + 1;

  // Distancia entre barras representada gráficamente (en píxeles)
  const spacingY = (dimensionesBase.anchoY * scaleFactor) / (Nx - 1);
  const spacingX = (dimensionesBase.anchoX * scaleFactor) / (Ny - 1);

  // Generamos las posiciones horizontales donde irán las barras en Y
  const lines = Array.from({ length: Nx }, (_, i) => startY + i * spacingY);

  // Generamos las posiciones verticales donde irán las barras en X
  const verticalLines = Array.from(
    { length: Ny },
    (_, i) => startX + i * spacingX
  );

  // Efecto para recalcular el dibujo si cambian dimensiones o armaduras
  useEffect(() => {
    if (!dimensionesBase || !calculoArmadura) return;
  }, [dimensionesBase, calculoArmadura]);

  return (
    <Stage width={width} height={height} ref={stageRef}>
      <Layer>
        {/* Dibujo del rectángulo principal de la base */}
        <Rect
          x={(width - dimensionesBase.anchoX * scaleFactor) / 2}
          y={(height - dimensionesBase.anchoY * scaleFactor) / 2}
          width={dimensionesBase.anchoX * scaleFactor}
          height={dimensionesBase.anchoY * scaleFactor}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Barras horizontales (dirección X) */}
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

        {/* Barras verticales (dirección Y) */}
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

        {/* Cota de ancho X (ax) */}
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

        {/* Cota de ancho Y (ay) */}
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

        {/* Rectángulo de la columna centrado en la base */}
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

        {/* Cota cx (ancho de columna en dirección X) */}
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

        {/* Cota cy (ancho de columna en dirección Y) */}
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
