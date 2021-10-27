import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo } from "react";
import { notes } from "../../../store";
import { NotesFilter } from "../types";
import Editor from "../../../components/editor";

interface NotesContentProps {
  filter: NotesFilter;
}

const NotesContent: FC<NotesContentProps> = ({ filter: { active } }) => {
  const { items } = notes;

  const currentItem = useMemo(
    () => items.find(({ id }) => id === active),
    [active, items]
  );

  const onSaveContent = useCallback(
    (event) => {
      const { id, title } = currentItem!;
      const content = event.target.getContent();

      notes.updateNote(id, { content, title });
    },
    [currentItem]
  );

  if (!currentItem) {
    return (
      <div className="align-center">
        <h4>Note not selected</h4>
      </div>
    );
  }

  const { content = "" } = currentItem;

  return (
    <Editor
      initialValue={content}
      onSaveContent={onSaveContent}
      onBlur={onSaveContent}
    />
  );
};

export default observer(NotesContent);
