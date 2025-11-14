import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

/**
 * Props que recibe el componente Tooltip.
 * - text: contenido del tooltip, permitido en HTML para mostrar formato o saltos de línea.
 */
type Props = {
  text: string;
};

/**
 * Componente Tooltip:
 * Muestra un icono de información y, al pasar el mouse, aparece un texto explicativo.
 * Se usa para brindar aclaraciones o detalles adicionales sobre un dato o una fórmula.
 */
const Tooltip: React.FC<Props> = ({ text }) => (
  // Contenedor principal del tooltip. La clase CSS define posición y comportamiento visual.
  <span className="tooltipWrapper">
    {/* Ícono circular de información, que el usuario reconoce como elemento interactivo */}
    <FontAwesomeIcon icon={faCircleInfo} className="tooltipIcon" />

    {/* Texto del tooltip que aparece al posar el mouse.
        Se utiliza dangerouslySetInnerHTML porque el texto puede incluir HTML.
        Se controla el HTML desde la aplicación para evitar riesgos de seguridad. */}
    <span className="tooltipText" dangerouslySetInnerHTML={{ __html: text }} />
  </span>
);

export default Tooltip;
