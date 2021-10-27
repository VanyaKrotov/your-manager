import { observer } from "mobx-react";
import { FC, useCallback } from "react";
import { List, ListItem } from "../../../components/todo-list";
import { notes, user } from "../../../store";
import { NotesFilter } from "../types";

import TextImageIcon from "@rsuite/icons/TextImage";

interface NotesNavigationProps {
  changeFilter: (newFilter: Partial<NotesFilter>) => void;
  filter: NotesFilter;
}

const NotesNavigation: FC<NotesNavigationProps> = ({
  changeFilter,
  filter: { active },
}) => {
  const onAddNote = useCallback((title: string) => {
    notes.addNote({ title, userId: user.userId });

    return true;
  }, []);

  const onActiveNote = useCallback(
    (noteId: number) => () => changeFilter({ active: noteId }),
    [changeFilter]
  );

  return (
    <div className="screen-height">
      <List onAddItem={onAddNote} addPlaceholder="Add note" className="p-10">
        {notes.items.map(({ title, id }) => (
          <ListItem
            key={id}
            onClick={onActiveNote(id)}
            active={id === active}
            icon={<TextImageIcon />}
          >
            {title}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default observer(NotesNavigation);
