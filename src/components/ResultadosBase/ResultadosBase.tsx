import { useEffect, useState, type JSX } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import {
  fetchBaseHormigon,
  fetchDimensionesBase,
  fetchCalculoCuantia,
  fetchVerificaPunzonado,
  fetchVerificaCorte,
  fetchCalculoArmadura,
  fetchCalculoArmaduraConDiametros,
  fetchEsfuerzosBase,
  fetchVerificacionesBase,
  fetchComputo,
} from "../../store/slices/baseHormigonResultsSlice.ts";
import {
  exportBaseHormigonCsv,
  exportBaseHormigonExcel,
  exportBaseHormigonPdf,
} from "../../store/slices/baseHormigonExcelSlice.ts";

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
import FormulasComputo from "../FormulasComputo/FormulasComputo.tsx";
import ResumenVerificaciones from "../ResumenVerificaciones/ResumenVerificaciones.tsx";

import "katex/dist/katex.min.css";
import "./ResultadosBase.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCsv,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

const BAR_DIAMETERS = [10, 12, 16, 20, 25];

const stepsConfig = (baseId: number) => [
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
  { action: () => fetchCalculoCuantia(baseId), label: "Calculando cuantía..." },
  {
    action: () => fetchVerificaPunzonado(baseId),
    label: "Verificando punzonado...",
  },
  { action: () => fetchVerificaCorte(baseId), label: "Verificando corte..." },
  {
    action: () => fetchCalculoArmadura(baseId),
    label: "Calculando armadura...",
  },
  { action: () => fetchComputo(baseId), label: "Realizando cómputo..." },
  { action: () => Promise.resolve(), label: "Resumiendo verificaciones..." },
  { action: () => Promise.resolve(), label: "Generando diagramas..." },
];

const ResultadosBase: React.FC = () => {
  const location = useLocation();
  const baseId: number = location.state?.baseId;
  const dispatch = useAppDispatch();
  const { automatico, invertirResultados, mostrarFormulas } = useAutomatico();

  const [showResults, setShowResults] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Iniciando...");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [barraX, setBarraX] = useState<number | null>(null);
  const [barraY, setBarraY] = useState<number | null>(null);

  const {
    base,
    dimensionesBase,
    esfuerzosBase,
    verificacionesBase,
    verificaPunzonado,
    verificaCorte,
    calculoCuantia,
    calculoArmadura,
    computo,
    loading,
  } = useAppSelector((state) => state.baseHormigonResults);

  const steps = baseId ? stepsConfig(baseId) : [];

  // Fetch base
  useEffect(() => {
    if (baseId) dispatch(fetchBaseHormigon(baseId));
  }, [baseId, dispatch]);

  useEffect(() => {
    if (!baseId || !automatico) return;

    const runSteps = async () => {
      setShowResults(true);
      for (let i = 0; i < steps.length; i++) {
        const { action, label } = steps[i];
        setStatusMessage(label);
        setProgress(((i + 1) / steps.length) * 100);

        try {
          const result = action();
          if (result instanceof Promise) {
            await result;
          } else {
            await dispatch(result).unwrap();
          }
        } catch (err) {
          console.error(`Error en paso "${label}":`, err);
          setStatusMessage(`Error en: ${label}`);
          break;
        }

        await new Promise((res) => setTimeout(res, 1000));
        setCurrentStep(i + 1);
      }
    };

    runSteps();
  }, [baseId, automatico, dispatch]);

  const handleNextStep = async () => {
    if (!showResults) setShowResults(true);
    if (currentStep < steps.length) {
      const { action, label } = steps[currentStep];
      setStatusMessage(label);
      setProgress(((currentStep + 1) / steps.length) * 100);

      try {
        await dispatch(action()).unwrap();
      } catch (err) {
        console.error(`Error en paso "${label}":`, err);
        setStatusMessage(`Error en: ${label}`);
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

  if (loading.base || !base) return <div className="spinner" />;

  const stepComponents: (JSX.Element | null)[] = [
    dimensionesBase && base ? (
      <div key="dimensiones" className="fade-in formulas-container">
        <FormulasDimensionesBase
          dimensionesBase={dimensionesBase}
          base={base}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    esfuerzosBase && dimensionesBase && base ? (
      <div key="esfuerzos" className="fade-in formulas-container">
        <FormulasEsfuerzosBase
          base={base}
          dimensionesBase={dimensionesBase}
          esfuerzosBase={esfuerzosBase}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    verificacionesBase && esfuerzosBase && dimensionesBase && base ? (
      <div key="verificaciones" className="fade-in formulas-container">
        <FormulasVerificacionesBase
          verificacionesBase={verificacionesBase}
          esfuerzosBase={esfuerzosBase}
          base={base}
          dimensionesBase={dimensionesBase}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    calculoCuantia && dimensionesBase && base ? (
      <div key="cuantia" className="fade-in formulas-container">
        <FormulasCalculoCuantia
          calculoCuantia={calculoCuantia}
          base={base}
          dimensionesBase={dimensionesBase}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    verificaPunzonado && dimensionesBase && base ? (
      <div key="punzonado" className="fade-in formulas-container">
        <FormulasVerificacionPunzonado
          verificaPunzonado={verificaPunzonado}
          base={base}
          dimensionesBase={dimensionesBase}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    verificaCorte && dimensionesBase && base ? (
      <div key="corte" className="fade-in formulas-container">
        <FormulasVerificacionCorte
          verificaCorte={verificaCorte}
          base={base}
          dimensionesBase={dimensionesBase}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    calculoArmadura && calculoCuantia && dimensionesBase && base ? (
      <div key="armadura" className="fade-in formulas-container">
        <FormulasCalculoArmadura
          calculoArmadura={calculoArmadura}
          base={base}
          dimensionesBase={dimensionesBase}
          cuantia={calculoCuantia}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    computo && calculoArmadura && calculoCuantia && dimensionesBase && base ? (
      <div key="computo" className="fade-in formulas-container">
        <FormulasComputo
          calculoArmadura={calculoArmadura}
          base={base}
          dimensionesBase={dimensionesBase}
          cuantia={calculoCuantia}
          computo={computo}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    verificacionesBase &&
    verificaCorte &&
    verificaPunzonado &&
    esfuerzosBase &&
    dimensionesBase &&
    base ? (
      <div key="resumen" className="fade-in formulas-container">
        <ResumenVerificaciones
          verificacionesBase={verificacionesBase}
          verificaCorte={verificaCorte}
          verificaPunzonado={verificaPunzonado}
          esfuerzosBase={esfuerzosBase}
          base={base}
          dimensionesBase={dimensionesBase}
          showFormulas={mostrarFormulas}
        />
      </div>
    ) : null,
    dimensionesBase && calculoArmadura && base ? (
      <div
        key="diagramas"
        className="fade-in diagramas-container"
        style={{ justifyContent: "center", gap: "20px" }}
      >
        <div className="estructura-diagrama">
          <h3>PLANTA</h3>
          <DiagramaPlantaBase
            dimensionesBase={dimensionesBase}
            calculoArmadura={calculoArmadura}
            baseHormigon={base}
          />
        </div>
        <div className="estructura-diagrama">
          <h3>VISTA X</h3>
          <DiagramaVistaXBase
            dimensionesBase={dimensionesBase}
            baseHormigon={base}
          />
        </div>
        <div className="estructura-diagrama">
          <h3>VISTA Y</h3>
          <DiagramaVistaYBase
            dimensionesBase={dimensionesBase}
            baseHormigon={base}
          />
        </div>
      </div>
    ) : null,
  ];

  const displayedSteps = invertirResultados
    ? [...stepComponents].filter(Boolean).reverse().slice(0, currentStep)
    : stepComponents.filter(Boolean).slice(0, currentStep);

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

      <div className="flex space-x-4 items-center mb-4">
        {["X", "Y"].map((dir) => {
          const value = dir === "X" ? barraX : barraY;
          const setter = dir === "X" ? setBarraX : setBarraY;
          const otherValue = dir === "X" ? barraY : barraX;

          return (
            <label key={dir} className="text-gray-800">
              Diámetro Barras {dir} (mm):
              <select
                value={value ?? ""}
                onChange={(e) => {
                  const newVal = Number(e.target.value);
                  setter(newVal);
                  if (!isNaN(newVal) && otherValue !== null) {
                    dispatch(
                      fetchCalculoArmaduraConDiametros({
                        id: baseId,
                        diametroX: dir === "X" ? newVal : barraX!,
                        diametroY: dir === "Y" ? newVal : barraY!,
                      })
                    );
                  }
                }}
                className="ml-2 px-2 py-1 border rounded-md w-24 bg-white text-black"
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {BAR_DIAMETERS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>

      <h2>Resultados - {base.nombre}</h2>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="status-message">{statusMessage}</p>

      <div className="resultados-steps">
        {displayedSteps.map((step, i) => (
          <div key={i}>{step}</div>
        ))}
      </div>
    </div>
  );
};

export default ResultadosBase;
