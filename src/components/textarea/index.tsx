import { FC, useEffect, useRef } from "react";
import { Input, InputProps } from "rsuite";
import autosize from "autosize";

interface TextareaProps extends InputProps {}

const Textarea: FC<TextareaProps> = ({ style, ...props }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    autosize(ref.current);
  }, []);

  useEffect(() => {
    autosize.update(ref.current);
  }, [props.value]);

  return (
    <Input
      {...props}
      as="textarea"
      ref={ref}
      style={{ resize: "none", ...style }}
    />
  );
};

export default Textarea;
