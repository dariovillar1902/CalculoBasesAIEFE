import React from "react";
import { useAutomatico } from "../../context/automatico-context";
import "./AjustesModal.scss";

interface AjustesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AjustesModal: React.FC<AjustesModalProps> = ({ isOpen, onClose }) => {
  const {
    automatico,
    setAutomatico,
    invertirResultados,
    setInvertirResultados,
    mostrarFormulas,
    setMostrarFormulas,
  } = useAutomatico();

  if (!isOpen) return null;

  return (
    <div className="ajustes-modal-backdrop" onClick={onClose}>
      <div className="ajustes-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Ajustes</h2>

        <label className="ajuste-item">
          <input
            type="checkbox"
            checked={automatico}
            onChange={(e) => setAutomatico(e.target.checked)}
          />
          Activar procesamiento automático
        </label>

        <label className="ajuste-item">
          <input
            type="checkbox"
            checked={invertirResultados}
            onChange={(e) => setInvertirResultados(e.target.checked)}
          />
          Invertir orden de resultados
        </label>

        <label className="ajuste-item">
          <input
            type="checkbox"
            checked={mostrarFormulas}
            onChange={(e) => setMostrarFormulas(e.target.checked)}
          />
          Mostrar fórmulas
        </label>

        <div className="ajustes-section">
          <h3>Reglamentos de Referencia:</h3>
          <ul>
            <li>
              <a
                href="http://contenidos.inpres.gob.ar/docs/Reglamentos/CIRSOC-201-Reglamento.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                CIRSOC 201-05 (Reglamento de Estructuras de Hormigón, Argentina)
              </a>
            </li>
            <li>
              <a
                href="https://www.transportes.gob.es/recursos_mfom/1820100.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                EHE-08 (Instrucción de Hormigón Estructural, España)
              </a>
            </li>
            <li>
              <a
                href="https://civilshare.wordpress.com/wp-content/uploads/2016/07/aci_318s_14_en_espanol.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                ACI 318 (Requisitos de Reglamento para Concreto Estructural)
              </a>
            </li>
          </ul>
        </div>

        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AjustesModal;
