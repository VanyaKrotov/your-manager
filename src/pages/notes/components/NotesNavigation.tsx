import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useMemo } from "react";
import { SelectPicker } from "rsuite";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { List, ListItem } from "components/list";
import ContextMenu from "components/context-menu";

import { notes, user } from "store";

import { NoteType } from "enums/notes";

import { NotesFilter } from "../types";

import Star from "icons/Star";
import TrashIcon from "@rsuite/icons/Trash";
import TextImageIcon from "@rsuite/icons/TextImage";

const StyledList = styled(List)`
  & + .add-control {
    border-radius: 0;
    background: transparent;
    border-top: 1px solid var(--rs-divider-border);
  }
`;

interface NotesNavigationProps {
  changeFilter: (newFilter: Partial<NotesFilter>) => void;
  filter: NotesFilter;
}

const NotesNavigation: FC<NotesNavigationProps> = ({
  changeFilter,
  filter: { active },
}) => {
  const { sortedItems, todayItem, timeItems } = notes;
  const { t } = useTranslation();

  const onAddNote = useCallback(
    (title: string) => {
      notes
        .addNote({ title, userId: user.userId, type: NoteType.base })
        .then(
          (addedNote) => addedNote && changeFilter({ active: addedNote.id })
        );

      return true;
    },
    [changeFilter]
  );

  const onActiveNote = useCallback(
    (noteId: number) => () => changeFilter({ active: noteId }),
    [changeFilter]
  );

  const onDeleteNote = useCallback(
    (key) => {
      const noteId = Number(key);

      if (active === noteId) {
        changeFilter({ active: sortedItems?.[0]?.id });
      }

      notes.deleteNote(noteId);
    },
    [changeFilter, active, sortedItems]
  );

  const contextMenuItems = useMemo(
    () => [
      {
        label: t("Delete note"),
        handler: onDeleteNote,
        icon: <TrashIcon />,
        className: "delete-button",
      },
    ],
    [onDeleteNote, t]
  );

  const onChangeItem = useCallback(
    (item) => changeFilter({ active: item }),
    [changeFilter]
  );

  useEffect(() => {
    if (!active) {
      changeFilter({ active: todayItem?.id });
    }
  }, [todayItem, changeFilter, active]);

  return (
    <div className="screen-height">
      <ContextMenu items={contextMenuItems} id="notes-context" />
      <StyledList
        onAddItem={onAddNote}
        addPlaceholder={t("Add note")}
        className="p-10"
        empty={!sortedItems.length}
        emptyPlaceholder={`${t("No entries note")} [+]`}
        title={
          <SelectPicker
            data={timeItems}
            style={{ width: "100%" }}
            appearance="subtle"
            cleanable={false}
            value={active!}
            placeholder={t("Everyday note")}
            onChange={onChangeItem}
          />
        }
      >
        {sortedItems.map(({ title, id, priority }) => (
          <ListItem
            key={id}
            onClick={onActiveNote(id)}
            contextMenuId="notes-context"
            contextMenuUId={id}
            active={id === active}
            icon={<TextImageIcon />}
            postfix={
              <Star
                filled={priority}
                onClick={() => notes.changePriority(id)}
              />
            }
          >
            {title}
          </ListItem>
        ))}
      </StyledList>
    </div>
  );
};

export default observer(NotesNavigation);
