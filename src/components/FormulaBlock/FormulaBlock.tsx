import { BlockMath } from "react-katex";
import FormulaResult from "../FormulaResult/FormulaResult";
import Tooltip from "../Tooltip/Tooltip";

type Props = {
  title: string;
  tooltip: string;
  symbolic: string;
  substituted: string;
  result: string;
  unit?: string;
  showFormulas: boolean;
};

const FormulaBlock: React.FC<Props> = ({
  title,
  tooltip,
  symbolic,
  substituted,
  result,
  unit,
  showFormulas,
}) => (
  <div className="dimensiones-item">
    <h3>
      {title}
      <Tooltip text={tooltip} />
    </h3>
    {showFormulas && <BlockMath math={symbolic} />}
    {showFormulas && <BlockMath math={substituted} />}
    <FormulaResult value={result} unit={unit} />
  </div>
);

export default FormulaBlock;
