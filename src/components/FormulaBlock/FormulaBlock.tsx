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
  reference?: string;
};

const FormulaBlock: React.FC<Props> = ({
  title,
  tooltip,
  symbolic,
  substituted,
  result,
  unit,
  showFormulas,
  reference,
}) => (
  <div className="dimensiones-item">
    <h3>
      {title}
      <Tooltip text={tooltip} />
    </h3>

    {showFormulas && <BlockMath math={symbolic} />}
    {showFormulas && <BlockMath math={substituted} />}

    <FormulaResult value={result} unit={unit} />

    {reference && <p className="formula-reference">{reference}</p>}
  </div>
);

export default FormulaBlock;
