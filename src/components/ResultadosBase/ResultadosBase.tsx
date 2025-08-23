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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCsv,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

const ResultadosBase: React.FC = () => {
  const location = useLocation();
  const baseId: number = location.state?.baseId;
  const dispatch = useAppDispatch();
  const { automatico } = useAutomatico();
  const [showResults, setShowResults] = useState(false);

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

  const base = useAppSelector((state) =>
    state.baseHormigon.data.find((b) => b.id === baseId)
  );

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
      if (!showResults) setShowResults(true);
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
    if (!showResults) setShowResults(true);
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
      <div className="export-buttons flex space-x-4 mb-4">
        <button
          onClick={handleExportExcel}
          className="icon-btn bg-green-600 hover:bg-green-700"
          title="Exportar a Excel"
        >
          <FontAwesomeIcon icon={faFileExcel} size="lg" />
        </button>

        <button
          onClick={handleExportCsv}
          className="icon-btn bg-yellow-600 hover:bg-yellow-700"
          title="Exportar a CSV"
        >
          <FontAwesomeIcon icon={faFileCsv} size="lg" />
        </button>

        <button
          onClick={handleExportPdf}
          className="icon-btn bg-red-600 hover:bg-red-700"
          title="Exportar a PDF"
        >
          <FontAwesomeIcon icon={faFilePdf} size="lg" />
        </button>
      </div>

      {!automatico && currentStep < steps.length && (
        <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 mb-4"
          onClick={handleNextStep}
        >
          Continuar Procesamiento
        </button>
      )}

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

      <h2>Resultados</h2>
      <h3 className="text-xl font-semibold mb-4">{base?.nombre ?? ""}</h3>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="status-message">{statusMessage}</p>

      <div className="diagramas-container">
        {showResults && dimensionesBase && calculoArmadura && (
          <div className="estructura-diagrama fade-in">
            <h3> PLANTA </h3>
            <DiagramaPlantaBase
              dimensionesBase={dimensionesBase}
              calculoArmadura={calculoArmadura}
            />
          </div>
        )}

        {showResults && dimensionesBase && calculoArmadura && (
          <div className="estructura-diagrama fade-in">
            <h3> VISTA DIRECCIÓN X </h3>
            <DiagramaVistaXBase
              dimensionesBase={dimensionesBase}
              calculoArmadura={calculoArmadura}
            />
          </div>
        )}

        {showResults && dimensionesBase && calculoArmadura && (
          <div className="estructura-diagrama fade-in">
            <h3> VISTA DIRECCIÓN Y </h3>
            <DiagramaVistaYBase
              dimensionesBase={dimensionesBase}
              calculoArmadura={calculoArmadura}
            />
          </div>
        )}
      </div>
      {showResults &&
        calculoArmadura &&
        base &&
        dimensionesBase &&
        calculoCuantia && (
          <div className="fade-in formulas-container">
            <FormulasCalculoArmadura
              calculoArmadura={calculoArmadura}
              base={base}
              dimensionesBase={dimensionesBase}
              cuantia={calculoCuantia}
            />
          </div>
        )}

      {showResults && verificaCorte && base && dimensionesBase && (
        <div className="fade-in formulas-container">
          <FormulasVerificacionCorte
            verificaCorte={verificaCorte}
            base={base}
            dimensionesBase={dimensionesBase}
          />
        </div>
      )}

      {showResults && verificaPunzonado && base && dimensionesBase && (
        <div className="fade-in formulas-container">
          <FormulasVerificacionPunzonado
            verificaPunzonado={verificaPunzonado}
            base={base}
            dimensionesBase={dimensionesBase}
          />
        </div>
      )}

      {showResults && calculoCuantia && base && dimensionesBase && (
        <div className="fade-in formulas-container">
          <FormulasCalculoCuantia
            calculoCuantia={calculoCuantia}
            base={base}
            dimensionesBase={dimensionesBase}
          />
        </div>
      )}

      {showResults && verificaTensionAdmisible && base && dimensionesBase && (
        <div className="fade-in formulas-container">
          <FormulasVerificacionTensionAdmisible
            verificaTensionAdmisible={verificaTensionAdmisible}
            base={base}
            dimensionesBase={dimensionesBase}
          />
        </div>
      )}

      {showResults && dimensionesBase && base && (
        <div className="fade-in formulas-container">
          <FormulasDimensionesBase
            dimensionesBase={dimensionesBase}
            base={base}
          />
        </div>
      )}
    </div>
  );
};

export default ResultadosBase;
