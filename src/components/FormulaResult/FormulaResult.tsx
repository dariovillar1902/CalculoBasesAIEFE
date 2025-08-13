import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  value: string;
  unit?: string;
};

const FormulaResult: React.FC<Props> = ({ value, unit }) => (
  <>
    <FontAwesomeIcon icon={faArrowRight} className="arrowIcon" />
    <h3>
      {value} {unit}
    </h3>
  </>
);

export default FormulaResult;
