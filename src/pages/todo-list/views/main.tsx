import PageContent from "../../../components/page-content";
import TodoGroupControl from "../components/TodoGroupControl";
import TodoListContent from "../components/TodoListContent";
import { useTodoListFilter } from "../utils/useTodoListFilter";

const TodoList = () => {
  const { filter, onChange } = useTodoListFilter();

  return (
    <PageContent
      navigation={
        <TodoGroupControl
          activeKey={filter.group}
          changeActiveGroup={(group) => onChange({ group })}
        />
      }
    >
      <TodoListContent filter={filter} changeFilter={onChange} />
    </PageContent>
  );
};

export default TodoList;
