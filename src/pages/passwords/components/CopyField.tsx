import { FC, MouseEventHandler, useCallback } from "react";
import { FlexboxGrid, IconButton } from "rsuite";

import { CopyContainer, CopyInput } from "./styles";

import CopyIcon from "icons/copy.svg";

interface CopyFieldProps {
  children: string;
  onCopy?: MouseEventHandler<HTMLElement>;
}

const CopyField: FC<CopyFieldProps> = ({ children, onCopy }) => {
  const onFocus = useCallback((event: any) => event.target.select(), []);

  return (
    <CopyContainer data-copy={Boolean(onCopy)}>
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item colspan={20}>
          <CopyInput value={children} size="sm" onFocus={onFocus} />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>
          <IconButton
            icon={<CopyIcon />}
            size="sm"
            appearance="subtle"
            onClick={onCopy}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </CopyContainer>
  );
};

export default CopyField;
