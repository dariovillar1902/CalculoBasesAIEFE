import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  fetchDimensionesBase,
  fetchVerificaTensionAdmisible,
  fetchCalculoCuantia,
  fetchVerificaPunzonado,
  fetchVerificaCorte,
  fetchCalculoArmadura,
  fetchCalculoArmaduraConDiametros,
} from "../../store/slices/baseHormigonResultsSlice.ts";
import "katex/dist/katex.min.css";
import "./ResultadosBase.scss";
import { useAutomatico } from "../../context/automatico-context.tsx";
import DiagramaPlantaBase from "../DiagramaPlantaBase.tsx";
import DiagramaVistaXBase from "../DiagramaVistaXBase.tsx";
import DiagramaVistaYBase from "../DiagramaVistaYBase.tsx";
import FormulasDimensionesBase from "../FormulasDimensionesBase/FormulasDimensionesBase.tsx";
import FormulasVerificacionTensionAdmisible from "../FormulasVerificacionTensionAdmisible/FormulasVerificacionTensionAdmisible.tsx";
import FormulasCalculoCuantia from "../FormulasCalculoCuantia/FormulasCalculoCuantia.tsx";
import FormulasVerificacionPunzonado from "../FormulasVerificacionPunzonado/FormulasVerificacionPunzonado.tsx";
import FormulasVerificacionCorte from "../FormulasVerificacionCorte/FormulasVerificacionCorte.tsx";
import FormulasCalculoArmadura from "../FormulasCalculoArmadura/FormulasCalculoArmadura.tsx";
import {
  exportBaseHormigonCsv,
  exportBaseHormigonExcel,
  exportBaseHormigonPdf,
} from "../../store/slices/baseHormigonExcelSlice.ts";

const ResultadosBase: React.FC = () => {
  const location = useLocation();
  const baseId: number = location.state?.baseId;
  const dispatch = useAppDispatch();
  const { automatico } = useAutomatico();

  const {
    dimensionesBase,
    verificaTensionAdmisible,
    verificaPunzonado,
    verificaCorte,
    calculoCuantia,
    calculoArmadura,
  } = useAppSelector((state) => state.baseHormigonResults);

  const [statusMessage, setStatusMessage] = useState("Iniciando...");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [barraX, setBarraX] = useState<number | null>(null);
  const [barraY, setBarraY] = useState<number | null>(null);

  const steps = [
    {
      action: () => dispatch(fetchDimensionesBase(baseId)),
      label: "Estimando dimensiones...",
      key: "dimensionesBase",
    },
    {
      action: () => dispatch(fetchVerificaTensionAdmisible(baseId)),
      label: "Verificando tensión admisible...",
      key: "verificaTensionAdmisible",
    },
    {
      action: () => dispatch(fetchCalculoCuantia(baseId)),
      label: "Calculando cuantía...",
      key: "calculoCuantia",
    },
    {
      action: () => dispatch(fetchVerificaPunzonado(baseId)),
      label: "Verificando punzonado...",
      key: "verificaPunzonado",
    },
    {
      action: () => dispatch(fetchVerificaCorte(baseId)),
      label: "Verificando corte...",
      key: "verificaCorte",
    },
    {
      action: () => dispatch(fetchCalculoArmadura(baseId)),
      label: "Calculando armadura...",
      key: "calculoArmadura",
    },
  ];

  useEffect(() => {
    if (!baseId) return;

    const processStep = async (stepIndex: number) => {
      setStatusMessage(steps[stepIndex].label);
      setProgress(((stepIndex + 1) / steps.length) * 100);

      steps[stepIndex].action();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (automatico && stepIndex < steps.length - 1) {
        processStep(stepIndex + 1);
      }
    };

    if (automatico) {
      processStep(0);
    }
  }, [baseId]);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setStatusMessage(steps[currentStep].label);
      setProgress(((currentStep + 1) / steps.length) * 100);
      steps[currentStep].action();
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleExportExcel = async () => {
    try {
      const resultAction = await dispatch(exportBaseHormigonExcel(baseId));
      if (exportBaseHormigonExcel.fulfilled.match(resultAction)) {
        const blob = resultAction.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "BaseHormigon.xlsx";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      console.error("Exportación fallida");
    }
  };

  const handleExportCsv = async () => {
    try {
      const resultAction = await dispatch(exportBaseHormigonCsv(baseId));
      if (exportBaseHormigonCsv.fulfilled.match(resultAction)) {
        const blob = resultAction.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "BaseHormigon.csv";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      console.error("Exportación CSV fallida");
    }
  };

  const handleExportPdf = async () => {
    try {
      const resultAction = await dispatch(exportBaseHormigonPdf(baseId));
      if (exportBaseHormigonPdf.fulfilled.match(resultAction)) {
        const blob = resultAction.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "BaseHormigon.pdf";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      console.error("Exportación PDF fallida");
    }
  };

  return (
    <div className="resultados-base">
      <button
        className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-green-700 mb-4"
        onClick={handleExportExcel}
      >
        Exportar a Excel
      </button>
      <button
        className="bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-700 mb-4 ml-2"
        onClick={handleExportCsv}
      >
        Exportar a CSV
      </button>
      <button
        className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-700 mb-4 ml-2"
        onClick={handleExportPdf}
      >
        Exportar a PDF
      </button>

      {!automatico && currentStep < steps.length && (
        <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 mb-4"
          onClick={handleNextStep}
        >
          Continuar Procesamiento
        </button>
      )}

      <h2>Resultados</h2>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="status-message">{statusMessage}</p>
      <div className="flex space-x-4 items-center mb-4">
        <label className="text-gray-800">
          Diámetro Barras X (mm):
          <select
            value={barraX ?? ""}
            onChange={(e) => {
              const newX = Number(e.target.value);
              setBarraX(newX);
              if (!isNaN(newX) && barraY !== null && !isNaN(barraY)) {
                dispatch(
                  fetchCalculoArmaduraConDiametros({
                    id: baseId,
                    diametroX: newX,
                    diametroY: barraY,
                  })
                );
              }
            }}
            className="ml-2 px-2 py-1 border rounded-md w-24 bg-white text-black"
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {[10, 12, 16, 20, 25].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="text-gray-800">
          Diámetro Barras Y (mm):
          <select
            value={barraY ?? ""}
            onChange={(e) => {
              const newY = Number(e.target.value);
              setBarraY(newY);
              if (!isNaN(newY) && barraX !== null && !isNaN(barraX)) {
                dispatch(
                  fetchCalculoArmaduraConDiametros({
                    id: baseId,
                    diametroX: barraX,
                    diametroY: newY,
                  })
                );
              }
            }}
            className="ml-2 px-2 py-1 border rounded-md w-24 bg-white text-black"
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {[10, 12, 16, 20, 25].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="diagramas-container">
        {dimensionesBase && calculoArmadura && (
          <div className="estructura-diagrama">
            <h3> PLANTA </h3>
            <DiagramaPlantaBase
              dimensionesBase={dimensionesBase}
              calculoArmadura={calculoArmadura}
            />
          </div>
        )}

        {dimensionesBase && calculoArmadura && (
          <div className="estructura-diagrama">
            <h3> VISTA DIRECCIÓN X </h3>
            <DiagramaVistaXBase
              dimensionesBase={dimensionesBase}
              calculoArmadura={calculoArmadura}
            />
          </div>
        )}

        {dimensionesBase && calculoArmadura && (
          <div className="estructura-diagrama">
            <h3> VISTA DIRECCIÓN Y </h3>
            <DiagramaVistaYBase
              dimensionesBase={dimensionesBase}
              calculoArmadura={calculoArmadura}
            />
          </div>
        )}
      </div>
      {calculoArmadura && (
        <FormulasCalculoArmadura calculoArmadura={calculoArmadura} />
      )}

      {verificaCorte && (
        <FormulasVerificacionCorte verificaCorte={verificaCorte} />
      )}

      {verificaPunzonado && (
        <FormulasVerificacionPunzonado verificaPunzonado={verificaPunzonado} />
      )}

      {calculoCuantia && (
        <FormulasCalculoCuantia calculoCuantia={calculoCuantia} />
      )}

      {verificaTensionAdmisible !== null && (
        <FormulasVerificacionTensionAdmisible
          verificaTensionAdmisible={verificaTensionAdmisible}
        />
      )}

      {dimensionesBase && (
        <FormulasDimensionesBase dimensionesBase={dimensionesBase} />
      )}
    </div>
  );
};

export default ResultadosBase;
