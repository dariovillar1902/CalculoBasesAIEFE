import React from "react";
// Importa el contexto que maneja los estados de los ajustes automáticos
import { useAutomatico } from "../../context/automatico-context";
// Importa los estilos específicos para este componente
import "./AjustesModal.scss";

// Define las propiedades que recibe el componente AjustesModal
interface AjustesModalProps {
  isOpen: boolean; // Indica si el modal está abierto o cerrado
  onClose: () => void; // Función que se ejecuta para cerrar el modal
}

// Componente principal que muestra el modal de ajustes
const AjustesModal: React.FC<AjustesModalProps> = ({ isOpen, onClose }) => {
  // Extrae del contexto los valores actuales y funciones para modificar los ajustes
  const {
    automatico, // Indica si el procesamiento automático está activado
    setAutomatico, // Función para activar/desactivar el procesamiento automático
    invertirResultados, // Indica si se deben invertir los resultados
    setInvertirResultados, // Función para cambiar el orden de los resultados
    mostrarFormulas, // Indica si se deben mostrar las fórmulas
    setMostrarFormulas, // Función para mostrar/ocultar las fórmulas
  } = useAutomatico();

  // Si el modal no está abierto, no se muestra nada en pantalla
  if (!isOpen) return null;

  return (
    // Fondo oscuro que cubre la pantalla y permite cerrar el modal al hacer clic fuera
    <div className="ajustes-modal-backdrop" onClick={onClose}>
      {/* Contenedor principal del modal. El click en este div no cierra el modal */}
      <div className="ajustes-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Ajustes</h2>

        {/* Opción para activar o desactivar el procesamiento automático */}
        <label className="ajuste-item">
          <input
            type="checkbox"
            checked={automatico}
            onChange={(e) => setAutomatico(e.target.checked)}
          />
          Activar procesamiento automático
        </label>

        {/* Opción para invertir el orden de los resultados */}
        <label className="ajuste-item">
          <input
            type="checkbox"
            checked={invertirResultados}
            onChange={(e) => setInvertirResultados(e.target.checked)}
          />
          Invertir orden de resultados
        </label>

        {/* Opción para mostrar u ocultar las fórmulas utilizadas */}
        <label className="ajuste-item">
          <input
            type="checkbox"
            checked={mostrarFormulas}
            onChange={(e) => setMostrarFormulas(e.target.checked)}
          />
          Mostrar fórmulas
        </label>

        {/* Sección con enlaces a reglamentos técnicos de referencia */}
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

        {/* Botón para cerrar el modal */}
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AjustesModal;
