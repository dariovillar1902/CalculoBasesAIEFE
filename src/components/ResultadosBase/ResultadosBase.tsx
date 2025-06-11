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
} from "../../store/slices/baseHormigonResultsSlice.ts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./ResultadosBase.scss";

const ResultadosBase: React.FC = () => {
  const location = useLocation();
  const baseId: number = location.state?.baseId;
  const dispatch = useAppDispatch();

  const {
    dimensionesBase,
    verificaTensionAdmisible,
    verificaPunzonado,
    verificaCorte,
    calculoCuantia,
    calculoArmadura,
    loading,
  } = useAppSelector((state) => state.baseHormigonResults);

  const [statusMessage, setStatusMessage] = useState("Iniciando...");
  const [progress, setProgress] = useState(0);
  const results = {
    dimensionesBase,
    verificaTensionAdmisible,
    calculoCuantia,
    calculoArmadura,
  };

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

    const fetchResultsSequentially = async () => {
      setProgress(0);

      for (let i = 0; i < steps.length; i++) {
        setStatusMessage(steps[i].label);
        setProgress(((i + 1) / steps.length) * 100);
        steps[i].action();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      }

      setStatusMessage("Procesamiento completado.");
    };

    fetchResultsSequentially();
  }, [baseId]);

  return (
    <div className="resultados-base">
      <h2>Resultados</h2>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="status-message">{statusMessage}</p>

      <div className="katex-container">
        {dimensionesBase && (
          <div className="dimensiones-container">
            <h2 className="dimensiones-title">Dimensiones Base</h2>
            <div className="dimensiones-item">
              <h3>Área:</h3>
              <BlockMath math="A = 1.05 \cdot \frac{P}{q_{adm} - \gamma^{\prime} D_f} \approx a_x a_y" />
              <p>{dimensionesBase.area.toFixed(2)} m²</p>
            </div>
            <div className="dimensiones-item">
              <h3>Ancho X:</h3>
              <BlockMath math="a_x = \sqrt{A_{nec} + \frac{(c_x - c_y)^2}{4}} + \frac{c_x - c_y}{2}" />
              <p>{dimensionesBase.anchoX} m</p>
            </div>
            <div className="dimensiones-item">
              <h3>Ancho Y:</h3>
              <BlockMath math="a_y = \sqrt{A_{nec} + \frac{(c_x - c_y)^2}{4}} - \frac{c_x - c_y}{2}" />
              <p>{dimensionesBase.anchoY} m</p>
            </div>
            <div className="dimensiones-item">
              <h3>Altura:</h3>
              <BlockMath math="h \geq \max \left( \frac{a_{x\text{adop}} - c_x}{5}, \frac{a_{y\text{adop}} - c_y}{5}, 25 \text{ cm} \right)" />
              <p>{dimensionesBase.altura} m</p>
            </div>
            <div className="dimensiones-item">
              <h3>Verifica Vuelos:</h3>
              <BlockMath math="\left| V_x - V_y \right| < 20 \text{ cm}" />
              <p>{dimensionesBase.verificaVuelos ? "Sí" : "No"}</p>
            </div>
          </div>
        )}
      </div>
      <div className="katex-container">
        {verificaTensionAdmisible !== null && (
          <div className="verificacion-container">
            <h2 className="verificacion-title">
              Verificación de Tensión Admisible
            </h2>

            <div className="verificacion-item">
              <h3>Carga Total:</h3>
              <BlockMath math="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h) < q_{adm}" />
              <p>{verificaTensionAdmisible ? "Cumple" : "No cumple"}</p>
            </div>
          </div>
        )}
      </div>
      <div className="katex-container">
        {calculoCuantia && (
          <div className="cuantia-container">
            <h2 className="cuantia-title">Cálculo de Cuantía</h2>

            <div className="cuantia-item">
              <h3>Esfuerzo Axial Mayorado:</h3>
              <BlockMath math="P_u = \max \left( 1.4 P_D, 1.2 P_D + 1.6 P_L \right)" />
              <p>{calculoCuantia.esfuerzoAxilMayorado.toFixed(2)} kN</p>
            </div>

            <div className="cuantia-item">
              <h3>Carga Mayorada:</h3>
              <BlockMath math="q_u = \frac{P_u}{a_x \cdot a_y}" />
              <p>{calculoCuantia.cargaMayorada.toFixed(2)} kN/m²</p>
            </div>

            <div className="cuantia-item">
              <h3>Momento Mayorado X:</h3>
              <BlockMath math="M_{ux} = q_u \cdot \frac{(a_x - c_x)^2}{8} \cdot a_y" />
              <p>{calculoCuantia.momentoMayoradoX.toFixed(2)} kN·m</p>
            </div>

            <div className="cuantia-item">
              <h3>Momento Mayorado Y:</h3>
              <BlockMath math="M_{uy} = q_u \cdot \frac{(a_y - c_y)^2}{8} \cdot a_x" />
              <p>{calculoCuantia.momentoMayoradoY.toFixed(2)} kN·m</p>
            </div>

            <div className="cuantia-item">
              <h3>Área Acero X:</h3>
              <BlockMath math="A_{sx} = \rho_x \cdot a_y \cdot d" />
              <p>{calculoCuantia.areaAceroX.toFixed(2)} cm²</p>
            </div>

            <div className="cuantia-item">
              <h3>Área Acero Y:</h3>
              <BlockMath math="A_{sy} = \rho_y \cdot a_x \cdot d" />
              <p>{calculoCuantia.areaAceroY.toFixed(2)} cm²</p>
            </div>
          </div>
        )}
      </div>
      <div className="katex-container">
        {verificaPunzonado && (
          <div className="punzonado-container">
            <h2 className="punzonado-title">Verificación de Punzonado</h2>

            <div className="punzonado-item">
              <h3>Esfuerzo Axial Mayorado:</h3>
              <BlockMath math="P_u = \max \left( 1.4 P_D, 1.2 P_D + 1.6 P_L \right)" />
              <p>{verificaPunzonado.esfuerzoAxilMayorado.toFixed(2)} kN</p>
            </div>

            <div className="punzonado-item">
              <h3>Carga Total:</h3>
              <BlockMath math="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h)" />
              <p>{verificaPunzonado.cargaTotal.toFixed(2)} kN/m²</p>
            </div>

            <div className="punzonado-item">
              <h3>Resistencia Requerida:</h3>
              <BlockMath math="V_u = P_u - q \cdot (c_x + d) \cdot (c_y + d)" />
              <p>{verificaPunzonado.resistenciaRequerida.toFixed(2)} kN</p>
            </div>

            <div className="punzonado-item">
              <h3>Perímetro Crítico:</h3>
              <BlockMath math="b_0 = 2 \cdot (c_x + c_y) + 4d" />
              <p>{verificaPunzonado.b0.toFixed(2)} m</p>
            </div>

            <div className="punzonado-item">
              <h3>Relación Geométrica:</h3>
              <BlockMath math="b = \frac{\max(c_x, c_y)}{\min(c_x, c_y)}" />
              <p>{verificaPunzonado.b.toFixed(2)}</p>
            </div>

            <div className="punzonado-item">
              <h3>Resistencia Nominal:</h3>
              <BlockMath math="V_n = \min \left( \frac{b_0 \cdot d \cdot \sqrt{f'_c}}{3}, \frac{(1 + 2/b) \cdot b_0 \cdot d \cdot \sqrt{f'_c}}{6}, \frac{(2 + 40 \cdot d/b_0) \cdot b_0 \cdot d \cdot \sqrt{f'_c}}{12} \right)" />
              <p>{verificaPunzonado.resistenciaNominal.toFixed(2)} kN</p>
            </div>

            <div className="punzonado-item">
              <h3>Resistencia de Diseño:</h3>
              <BlockMath math="V_d = 0.75 \cdot V_n" />
              <p>{verificaPunzonado.resistenciaDiseno.toFixed(2)} kN</p>
            </div>

            <div className="punzonado-item">
              <h3>Resultado:</h3>
              <BlockMath math="V_u \leq V_d" />
              <p>
                {verificaPunzonado.cumpleVerificacion ? "Cumple" : "No cumple"}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="katex-container">
        {verificaCorte && (
          <div className="corte-container">
            <h2 className="corte-title">Verificación de Corte</h2>

            <div className="corte-item">
              <h3>Carga Total:</h3>
              <BlockMath math="q = \frac{P}{a_x \cdot a_y} + \gamma_{HA} \cdot h + \gamma' \cdot (D_f - h)" />
              <p>{verificaCorte.cargaTotal.toFixed(2)} kN/m²</p>
            </div>

            <div className="corte-item">
              <h3>Resistencia Requerida en X:</h3>
              <BlockMath math="V_{ux} = q \cdot \left( \frac{a_x - c_x}{2} - d \right) \cdot a_y" />
              <p>{verificaCorte.resistenciaRequeridaX.toFixed(2)} kN</p>
            </div>

            <div className="corte-item">
              <h3>Resistencia Requerida en Y:</h3>
              <BlockMath math="V_{uy} = q \cdot \left( \frac{a_y - c_y}{2} - d \right) \cdot a_x" />
              <p>{verificaCorte.resistenciaRequeridaY.toFixed(2)} kN</p>
            </div>

            <div className="corte-item">
              <h3>Resistencia Nominal en X:</h3>
              <BlockMath math="V_{nx} = a_y \cdot d \cdot \frac{\sqrt{f'_c}}{6}" />
              <p>{verificaCorte.resistenciaNominalX.toFixed(2)} kN</p>
            </div>

            <div className="corte-item">
              <h3>Resistencia Nominal en Y:</h3>
              <BlockMath math="V_{ny} = a_x \cdot d \cdot \frac{\sqrt{f'_c}}{6}" />
              <p>{verificaCorte.resistenciaNominalY.toFixed(2)} kN</p>
            </div>

            <div className="corte-item">
              <h3>Resistencia de Diseño en X:</h3>
              <BlockMath math="V_{dx} = 0.75 \cdot V_{nx}" />
              <p>{verificaCorte.resistenciaDisenoX.toFixed(2)} kN</p>
            </div>

            <div className="corte-item">
              <h3>Resistencia de Diseño en Y:</h3>
              <BlockMath math="V_{dy} = 0.75 \cdot V_{ny}" />
              <p>{verificaCorte.resistenciaDisenoY.toFixed(2)} kN</p>
            </div>

            <div className="corte-item">
              <h3>Resultado:</h3>
              <BlockMath math="V_{ux} \leq V_{dx}, \quad V_{uy} \leq V_{dy}" />
              <p>{verificaCorte.cumpleVerificacion ? "Cumple" : "No cumple"}</p>
            </div>
          </div>
        )}
      </div>
      <div className="katex-container">
        {calculoArmadura && (
          <div className="armadura-container">
            <h2 className="armadura-title">Detalles de Armadura</h2>

            <div className="armadura-item">
              <h3>Barras en X:</h3>
              <BlockMath math="N_x = \left\lceil \frac{A_{sx}}{A_{bx}} \right\rceil" />
              <p>{calculoArmadura.cantidadBarrasX}</p>
            </div>

            <div className="armadura-item">
              <h3>Barras en Y:</h3>
              <BlockMath math="N_y = \left\lceil \frac{A_{sy}}{A_{by}} \right\rceil" />
              <p>{calculoArmadura.cantidadBarrasY}</p>
            </div>

            <div className="armadura-item">
              <h3>Separación Barras X:</h3>
              <BlockMath math="s_x = \min \left( \frac{a_y - 2 \cdot c_c}{N_x - 1}, 2.5 \cdot d, 25 \cdot d_b, 0.3 \right)" />
              <p>{calculoArmadura.separacionBarrasX} cm</p>
            </div>

            <div className="armadura-item">
              <h3>Separación Barras Y:</h3>
              <BlockMath math="s_y = \min \left( \frac{a_x - 2 \cdot c_c}{N_y - 1}, 2.5 \cdot d, 25 \cdot d_b, 0.3 \right)" />
              <p>{calculoArmadura.separacionBarrasY} cm</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultadosBase;
