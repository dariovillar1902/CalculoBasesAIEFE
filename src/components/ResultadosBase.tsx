import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import {
  fetchDimensionesBase,
  fetchVerificaTensionAdmisible,
  fetchCalculoCuantia,
} from "../store/slices/baseHormigonResultsSlice";

const ResultadosBase: React.FC = () => {
  const location = useLocation();
  const baseId: number = location.state?.baseId;
  const dispatch = useAppDispatch();
  const { dimensionesBase, verificaTensionAdmisible, calculoCuantia } =
    useAppSelector((state) => state.baseHormigon);

  const steps = [
    {
      action: () => dispatch(fetchDimensionesBase(baseId)),
      label: "Estimando dimensiones...",
      state: dimensionesBase,
    },
    {
      action: () => dispatch(fetchVerificaTensionAdmisible(baseId)),
      label: "Verificando tensión admisible...",
      state: verificaTensionAdmisible,
    },
    {
      action: () => dispatch(fetchCalculoCuantia(baseId)),
      label: "Calculando cuantía...",
      state: calculoCuantia,
    },
  ];

  useEffect(() => {
    if (!baseId) return;

    const runStepsSequentially = async () => {
      for (const step of steps) {
        step.action();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      }
    };

    runStepsSequentially();
  }, [baseId]);

  return (
    <div>
      {steps.map((step, index) => (
        <div key={index}>
          <h3>{step.label}</h3>
          <pre>{JSON.stringify(step.state, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default ResultadosBase;
