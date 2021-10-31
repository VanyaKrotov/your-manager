import { FC, useCallback, useState } from "react";
import { FlexboxGrid, Input } from "rsuite";

import { AddItemContainer } from "./styles";

import PlusIcon from "@rsuite/icons/Plus";
import AddOutlineIcon from "@rsuite/icons/AddOutline";

interface AddListItemProps {
  onAddItem: (title: string) => boolean;
  placeholder?: string;
}

const AddListItem: FC<AddListItemProps> = ({
  onAddItem,
  placeholder = "Add task",
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const onRemoveFocused = useCallback(() => setFocused(false), [setFocused]);

  const onPressEnterHandler = useCallback(
    (event) => {
      if (onAddItem(value)) {
        setValue("");
      }
    },
    [onAddItem, value]
  );

  const isShowInput = Boolean(value || focused);

  return (
    <AddItemContainer
      onClick={() => setFocused(true)}
      data-focused={focused}
      className="add-control"
    >
      <FlexboxGrid align="middle" justify="space-between">
        <FlexboxGrid.Item colspan={2}>
          {isShowInput ? <AddOutlineIcon /> : <PlusIcon />}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={22}>
          {isShowInput ? (
            <Input
              size="sm"
              autoFocus
              value={value}
              onChange={(value) => setValue(value as string)}
              onPressEnter={onPressEnterHandler}
              placeholder="Typing todo title..."
              onBlur={onRemoveFocused}
            />
          ) : (
            <p>{placeholder}</p>
          )}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </AddItemContainer>
  );
};

export default AddListItem;
