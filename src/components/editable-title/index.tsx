import { FC, useCallback, useEffect, useState } from "react";
import { Input, InputProps } from "rsuite";
import styled from "styled-components";

const Container = styled.span`
  input,
  input:focus {
    padding: 0;
    box-shadow: none;
    border: none;
    background: transparent;
    font-size: inherit;
  }
`;

interface EditableTitleProps extends InputProps {
  onSave: (title: string) => void;
  children: string;
}

const EditableTitle: FC<EditableTitleProps> = ({
  children,
  onSave,
  ...restProps
}) => {
  const [value, setValue] = useState(children);

  const onSaveHandler = useCallback(() => onSave(value), [onSave, value]);

  useEffect(() => {
    setValue(children);
  }, [children]);

  return (
    <Container className="full-width">
      <Input
        {...restProps}
        value={value}
        onChange={(val) => setValue(val as string)}
        onBlur={onSaveHandler}
      />
    </Container>
  );
};

export default EditableTitle;
