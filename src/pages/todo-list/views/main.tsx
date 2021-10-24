import { Content, FlexboxGrid } from "rsuite";
import TodoGroupControl from "../components/TodoGroupControl";
import TodoListContent from "../components/TodoListContent";
import { useTodoListFilter } from "../utils/useTodoListFilter";

const TodoList = () => {
  const { filter, onChange } = useTodoListFilter();

  // const filteredItems = useMemo(() => {}, []);

  return (
    <>
      <Content>
        <FlexboxGrid className="full-height">
          <FlexboxGrid.Item className="full-height" colspan={4}>
            <TodoGroupControl
              activeKey={filter.group}
              changeActiveGroup={(group) => onChange({ group })}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={20}>
            <TodoListContent filter={filter} changeFilter={onChange} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </>
  );
};

export default TodoList;
