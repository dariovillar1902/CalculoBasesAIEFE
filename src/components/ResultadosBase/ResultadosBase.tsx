import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  fetchDimensionesBase,
  fetchCalculoCuantia,
  fetchVerificaPunzonado,
  fetchVerificaCorte,
  fetchCalculoArmadura,
  fetchCalculoArmaduraConDiametros,
  fetchEsfuerzosBase,
  fetchVerificacionesBase,
} from "../../store/slices/baseHormigonResultsSlice.ts";
import "katex/dist/katex.min.css";
import "./ResultadosBase.scss";
import { useAutomatico } from "../../context/automatico-context.tsx";
import DiagramaPlantaBase from "../DiagramaPlantaBase.tsx";
import DiagramaVistaXBase from "../DiagramaVistaXBase.tsx";
import DiagramaVistaYBase from "../DiagramaVistaYBase.tsx";
import FormulasDimensionesBase from "../FormulasDimensionesBase/FormulasDimensionesBase.tsx";
import FormulasCalculoCuantia from "../FormulasCalculoCuantia/FormulasCalculoCuantia.tsx";
import FormulasVerificacionPunzonado from "../FormulasVerificacionPunzonado/FormulasVerificacionPunzonado.tsx";
import FormulasVerificacionCorte from "../FormulasVerificacionCorte/FormulasVerificacionCorte.tsx";
import FormulasCalculoArmadura from "../FormulasCalculoArmadura/FormulasCalculoArmadura.tsx";
import FormulasEsfuerzosBase from "../FormulasEsfuerzosBase/FormulasEsfuerzosBase.tsx";
import FormulasVerificacionesBase from "../FormulasVerificacionesBase/FormulasVerificacionesBase.tsx";
import {
  exportBaseHormigonCsv,
  exportBaseHormigonExcel,
  exportBaseHormigonPdf,
} from "../../store/slices/baseHormigonExcelSlice.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownUpAcrossLine,
  faArrowsUpDown,
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
    esfuerzosBase,
    verificacionesBase,
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

  const [reverseFormulas, setReverseFormulas] = useState(false);

  const base = useAppSelector((state) =>
    state.baseHormigon.data.find((b) => b.id === baseId)
  );

  const steps = [
    {
      action: () => fetchDimensionesBase(baseId),
      label: "Estimando dimensiones...",
    },
    {
      action: () => fetchEsfuerzosBase(baseId),
      label: "Obteniendo esfuerzos...",
    },
    {
      action: () => fetchVerificacionesBase(baseId),
      label: "Ejecutando verificaciones...",
    },
    {
      action: () => fetchCalculoCuantia(baseId),
      label: "Calculando cuantía...",
    },
    {
      action: () => fetchVerificaPunzonado(baseId),
      label: "Verificando punzonado...",
    },
    { action: () => fetchVerificaCorte(baseId), label: "Verificando corte..." },
    {
      action: () => fetchCalculoArmadura(baseId),
      label: "Calculando armadura...",
    },
  ];

  useEffect(() => {
    if (!baseId || !automatico) return;

    const runSteps = async () => {
      setShowResults(true);

      for (let i = 0; i < steps.length; i++) {
        setStatusMessage(steps[i].label);
        setProgress(((i + 1) / steps.length) * 100);

        try {
          await dispatch(steps[i].action()).unwrap();
        } catch (err) {
          console.error(`Error en paso "${steps[i].label}":`, err);
          setStatusMessage(`Error en: ${steps[i].label}`);
          break;
        }

        await new Promise((res) => setTimeout(res, 500));
        setCurrentStep(i + 1);
      }
    };

    runSteps();
  }, [baseId, automatico, dispatch]);

  const handleNextStep = async () => {
    if (!showResults) setShowResults(true);
    if (currentStep < steps.length) {
      setStatusMessage(steps[currentStep].label);
      setProgress(((currentStep + 1) / steps.length) * 100);

      try {
        await dispatch(steps[currentStep].action()).unwrap();
      } catch (err) {
        console.error(`Error en paso "${steps[currentStep].label}":`, err);
        setStatusMessage(`Error en: ${steps[currentStep].label}`);
      }

      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleExport = async (
    exportFn: typeof exportBaseHormigonExcel,
    filename: string
  ) => {
    try {
      const resultAction = await dispatch(exportFn(baseId));
      if (exportFn.fulfilled.match(resultAction)) {
        const blob = resultAction.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      console.error(`Exportación ${filename} fallida`);
    }
  };

  return (
    <div className="resultados-base">
      <div className="export-buttons flex space-x-4 mb-4">
        <button
          onClick={() =>
            handleExport(exportBaseHormigonExcel, "BaseHormigon.xlsx")
          }
          className="icon-btn bg-green-600 hover:bg-green-700"
          title="Exportar a Excel"
        >
          <FontAwesomeIcon icon={faFileExcel} size="lg" />
        </button>
        <button
          onClick={() =>
            handleExport(exportBaseHormigonCsv, "BaseHormigon.csv")
          }
          className="icon-btn bg-yellow-600 hover:bg-yellow-700"
          title="Exportar a CSV"
        >
          <FontAwesomeIcon icon={faFileCsv} size="lg" />
        </button>
        <button
          onClick={() =>
            handleExport(exportBaseHormigonPdf, "BaseHormigon.pdf")
          }
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

      {/* Barras X/Y */}
      <div className="flex space-x-4 items-center mb-4">
        <label className="text-gray-800">
          Diámetro Barras X (mm):
          <select
            value={barraX ?? ""}
            onChange={(e) => {
              const newX = Number(e.target.value);
              setBarraX(newX);
              if (!isNaN(newX) && barraY !== null) {
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
              if (!isNaN(newY) && barraX !== null) {
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
        <button
          onClick={() => setReverseFormulas((prev) => !prev)}
          className="ml-4 p-2 rounded-md bg-gray-200 hover:bg-gray-300 shadow"
          title="Invertir orden de resultados"
        >
          <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
        </button>
      </div>

      <h2>Resultados</h2>
      <h3 className="text-xl font-semibold mb-4">{base?.nombre ?? ""}</h3>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="status-message">{statusMessage}</p>

      {/* Conditional formulas order */}
      {reverseFormulas ? (
        <>
          <div className="diagramas-container">
            {showResults && dimensionesBase && calculoArmadura && base && (
              <>
                <div className="estructura-diagrama fade-in">
                  <h3>PLANTA</h3>
                  <DiagramaPlantaBase
                    dimensionesBase={dimensionesBase}
                    calculoArmadura={calculoArmadura}
                    baseHormigon={base}
                  />
                </div>
                <div className="estructura-diagrama fade-in">
                  <h3>VISTA DIRECCIÓN X</h3>
                  <DiagramaVistaXBase
                    dimensionesBase={dimensionesBase}
                    baseHormigon={base}
                  />
                </div>
                <div className="estructura-diagrama fade-in">
                  <h3>VISTA DIRECCIÓN Y</h3>
                  <DiagramaVistaYBase
                    dimensionesBase={dimensionesBase}
                    baseHormigon={base}
                  />
                </div>
              </>
            )}
          </div>
          {showResults && (
            <>
              {calculoArmadura && calculoCuantia && dimensionesBase && base && (
                <FormulasCalculoArmadura
                  calculoArmadura={calculoArmadura}
                  base={base}
                  dimensionesBase={dimensionesBase}
                  cuantia={calculoCuantia}
                />
              )}
              {verificaCorte && dimensionesBase && base && (
                <FormulasVerificacionCorte
                  verificaCorte={verificaCorte}
                  base={base}
                  dimensionesBase={dimensionesBase}
                />
              )}
              {verificaPunzonado && dimensionesBase && base && (
                <FormulasVerificacionPunzonado
                  verificaPunzonado={verificaPunzonado}
                  base={base}
                  dimensionesBase={dimensionesBase}
                />
              )}
              {calculoCuantia && dimensionesBase && base && (
                <FormulasCalculoCuantia
                  calculoCuantia={calculoCuantia}
                  base={base}
                  dimensionesBase={dimensionesBase}
                />
              )}
              {verificacionesBase &&
                esfuerzosBase &&
                dimensionesBase &&
                base && (
                  <FormulasVerificacionesBase
                    verificacionesBase={verificacionesBase}
                    esfuerzosBase={esfuerzosBase}
                    base={base}
                    dimensionesBase={dimensionesBase}
                  />
                )}
              {esfuerzosBase && dimensionesBase && base && (
                <FormulasEsfuerzosBase
                  base={base}
                  dimensionesBase={dimensionesBase}
                  esfuerzosBase={esfuerzosBase}
                />
              )}
              {dimensionesBase && base && (
                <FormulasDimensionesBase
                  dimensionesBase={dimensionesBase}
                  base={base}
                />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {/* Formulas first, then diagrams (current order) */}
          {showResults && dimensionesBase && base && (
            <FormulasDimensionesBase
              dimensionesBase={dimensionesBase}
              base={base}
            />
          )}
          {showResults && esfuerzosBase && dimensionesBase && base && (
            <FormulasEsfuerzosBase
              base={base}
              dimensionesBase={dimensionesBase}
              esfuerzosBase={esfuerzosBase}
            />
          )}
          {showResults &&
            verificacionesBase &&
            esfuerzosBase &&
            dimensionesBase &&
            base && (
              <FormulasVerificacionesBase
                verificacionesBase={verificacionesBase}
                esfuerzosBase={esfuerzosBase}
                base={base}
                dimensionesBase={dimensionesBase}
              />
            )}
          {showResults && calculoCuantia && dimensionesBase && base && (
            <FormulasCalculoCuantia
              calculoCuantia={calculoCuantia}
              base={base}
              dimensionesBase={dimensionesBase}
            />
          )}
          {showResults && verificaPunzonado && dimensionesBase && base && (
            <FormulasVerificacionPunzonado
              verificaPunzonado={verificaPunzonado}
              base={base}
              dimensionesBase={dimensionesBase}
            />
          )}
          {showResults && verificaCorte && dimensionesBase && base && (
            <FormulasVerificacionCorte
              verificaCorte={verificaCorte}
              base={base}
              dimensionesBase={dimensionesBase}
            />
          )}
          {showResults &&
            calculoArmadura &&
            calculoCuantia &&
            dimensionesBase &&
            base && (
              <FormulasCalculoArmadura
                calculoArmadura={calculoArmadura}
                base={base}
                dimensionesBase={dimensionesBase}
                cuantia={calculoCuantia}
              />
            )}
          <div className="diagramas-container">
            {showResults && dimensionesBase && calculoArmadura && base && (
              <>
                <div className="estructura-diagrama fade-in">
                  <h3>PLANTA</h3>
                  <DiagramaPlantaBase
                    dimensionesBase={dimensionesBase}
                    calculoArmadura={calculoArmadura}
                    baseHormigon={base}
                  />
                </div>
                <div className="estructura-diagrama fade-in">
                  <h3>VISTA DIRECCIÓN X</h3>
                  <DiagramaVistaXBase
                    dimensionesBase={dimensionesBase}
                    baseHormigon={base}
                  />
                </div>
                <div className="estructura-diagrama fade-in">
                  <h3>VISTA DIRECCIÓN Y</h3>
                  <DiagramaVistaYBase
                    dimensionesBase={dimensionesBase}
                    baseHormigon={base}
                  />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultadosBase;
