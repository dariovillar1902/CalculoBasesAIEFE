import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  value: string;
  unit?: string;
};

const FormulaResult: React.FC<Props> = ({ value, unit }) => (
  <>
    <FontAwesomeIcon icon={faArrowRight} className="arrowIcon" />
    <h3>
      {unit === "$" && unit}
      {value}{" "}
      {value === "Sí" && (
        <FontAwesomeIcon icon={faCheck} size="lg" className="checkIcon" />
      )}
      {value === "No" && (
        <FontAwesomeIcon icon={faXmark} size="lg" className="xMarkIcon" />
      )}
      {unit !== "$" && unit}
    </h3>
  </>
);

export default FormulaResult;
