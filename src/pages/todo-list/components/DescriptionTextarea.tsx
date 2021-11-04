import { FC, useEffect, useState } from "react";
import { InputProps } from "rsuite";

import Textarea from "components/textarea";

interface DescriptionTextareaProps extends InputProps {
  value: string;
  onEdit: (value: string) => void;
}

const DescriptionTextarea: FC<DescriptionTextareaProps> = ({
  value,
  onEdit,
  ...rest
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <Textarea
      value={currentValue}
      onChange={(value) => setCurrentValue(value as string)}
      onBlur={() => onEdit(currentValue)}
      {...rest}
    />
  );
};

export default DescriptionTextarea;
