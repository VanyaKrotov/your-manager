import { FC, useCallback, useMemo } from "react";
import styled from "styled-components";
import EditableTitle from "../../../components/editable-title";
import Star from "../../../icons/Star";
import { todoList } from "../../../store";
import TodoIcon from "../../../components/todo-list/ItemIcon";
import { List, ListItem } from "../../../components/todo-list";
import { TodoState } from "../../../types/todo-list";
import CloseIcon from "@rsuite/icons/Close";
import { FlexboxGrid, IconButton } from "rsuite";
import ArrowRightIcon from "@rsuite/icons/ArrowRight";
import TrashIcon from "@rsuite/icons/Trash";
import { formatDistance } from "date-fns";
import DescriptionTextarea from "./DescriptionTextarea";

const Container = styled.div`
  height: 100vh;
  border-left: 1px solid var(--rs-divider-border);
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 56px);
  overflow-y: auto;
  padding: 15px;
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  & h4 {
    flex: auto;
    font-weight: normal;
    margin-left: 15px;
  }

  & svg {
    height: 22px;
    width: auto;
  }

  & span {
    cursor: pointer;
  }
`;

const ListContainer = styled.div`
  height: fit-content;
  margin-bottom: 20px;
`;

interface RightSideProps {
  selectedId: number;
  onClose: () => void;
  onChangeState: (id: number, state: TodoState) => void;
}

const RightSide: FC<RightSideProps> = ({
  selectedId,
  onClose,
  onChangeState,
}) => {
  const { todoMap } = todoList;

  const currentItem = useMemo(
    () => (selectedId ? todoMap[selectedId] : null),
    [selectedId, todoMap]
  );

  const { title, state, priority, steps, lastChanged, description } =
    currentItem!;

  const onUpdateTitle = useCallback(
    (title) => {
      todoList.updateItem(selectedId, { title });
    },
    [selectedId]
  );

  const onAddStep = useCallback(
    (title) => {
      todoList.updateItem(selectedId, {
        steps: steps.concat({
          id: steps.length + 1,
          priority: false,
          title,
          state: TodoState.InProgress,
        }),
      });

      return true;
    },
    [selectedId, steps]
  );

  const onRemoveStep = useCallback(
    (stepId: number) => {
      todoList.updateItem(selectedId, {
        steps: steps.filter(({ id }) => id !== stepId),
      });
    },
    [selectedId, steps]
  );

  const onEditStepTitle = useCallback(
    (stepId) => (title: string) => {
      const index = steps.findIndex(({ id }) => id === stepId);
      const newSteps = [...steps];

      if (newSteps[index].title === title) {
        return;
      }

      newSteps[index].title = title;

      todoList.updateItem(selectedId, {
        steps: newSteps,
      });
    },
    [steps, selectedId]
  );

  const onEditStepState = useCallback(
    (stepId) => () => {
      const index = steps.findIndex(({ id }) => id === stepId);
      const newSteps = [...steps];
      const state =
        newSteps[index].state === TodoState.Done
          ? TodoState.InProgress
          : TodoState.Done;

      if (newSteps[index].state === state) {
        return;
      }

      newSteps[index].state = state;

      todoList.updateItem(selectedId, {
        steps: newSteps,
      });
    },
    [selectedId, steps]
  );

  const isDone = state === TodoState.Done;

  return (
    <Container>
      <ScrollContainer>
        <TitleContainer>
          <span
            className="hover-icon flex-block"
            onClick={() =>
              onChangeState(
                selectedId,
                isDone ? TodoState.InProgress : TodoState.Done
              )
            }
          >
            <TodoIcon state={state} hovered />
          </span>
          <h4>
            <EditableTitle onSave={onUpdateTitle}>{title}</EditableTitle>
          </h4>
          <span
            className="hover-icon flex-block"
            onClick={() =>
              todoList.updateItem(selectedId, { priority: !priority })
            }
          >
            <Star filled={priority} />
          </span>
        </TitleContainer>

        <ListContainer>
          <List addPlaceholder="Add step" onAddItem={onAddStep}>
            {steps.map(({ id, title, state }) => (
              <ListItem
                key={id}
                icon={
                  <span
                    className="hover-icon"
                    title={
                      state === TodoState.InProgress
                        ? "Mark as done"
                        : "Move back to in progress"
                    }
                    onClick={onEditStepState(id)}
                  >
                    <TodoIcon state={state} hovered />
                  </span>
                }
                postfix={
                  <span
                    title="Remove step"
                    className="hover-icon centered-span"
                    onClick={() => onRemoveStep(id)}
                  >
                    <CloseIcon className="icon-14" />
                  </span>
                }
              >
                <EditableTitle onSave={onEditStepTitle(id)}>
                  {title}
                </EditableTitle>
              </ListItem>
            ))}
          </List>
        </ListContainer>

        <DescriptionTextarea
          placeholder="Add notes"
          onEdit={(description) =>
            todoList.updateItem(selectedId, { description })
          }
          value={description}
        />
      </ScrollContainer>

      <FlexboxGrid
        className="full-width p-10 b-top"
        align="middle"
        justify="space-between"
      >
        <FlexboxGrid.Item>
          <IconButton
            icon={<ArrowRightIcon />}
            appearance="subtle"
            onClick={onClose}
            title="Close frame"
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className="align-center">
          {lastChanged
            ? `last changed ${formatDistance(lastChanged!, new Date(), {
                includeSeconds: true,
              })} ago`
            : "Not updated"}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <IconButton
            onClick={() => {
              onClose();
              todoList.removeItem(selectedId);
            }}
            className="delete-button"
            icon={<TrashIcon />}
            appearance="subtle"
            title="Delete task"
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
};

export default RightSide;
