import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

type Props = {
  text: string;
};

const Tooltip: React.FC<Props> = ({ text }) => (
  <span className="tooltipWrapper">
    <FontAwesomeIcon icon={faCircleInfo} className="tooltipIcon" />
    <span className="tooltipText" dangerouslySetInnerHTML={{ __html: text }} />
  </span>
);

export default Tooltip;
