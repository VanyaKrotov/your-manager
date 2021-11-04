import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import {
  ButtonToolbar,
  Dropdown,
  FlexboxGrid,
  IconButton,
  SelectPicker,
} from "rsuite";
import { useTranslation } from "react-i18next";

import Editor from "components/editor";
import EditableTitle from "components/editable-title";
import CodeEditor from "components/code-editor";

import { notes, pageView } from "store";

import { NoteType, SubType } from "enums/notes";

import { NotesFilter, NotesFilterHandler } from "../types";
import { SUB_TYPE_OPTIONS } from "../utils/constants";

import MoreIcon from "@rsuite/icons/More";

const TitleContainer = styled.div`
  height: 55px;
  padding: 0px 10px;
`;

const EditorContainer = styled.div`
  height: calc(100% - 55px);
`;

const Title = styled(EditableTitle)`
  font-size: 22px !important;
  color: var(--rs-primary-700);
`;

interface NotesContentProps {
  filter: NotesFilter;
  changeFilter: NotesFilterHandler;
}

const NotesContent: FC<NotesContentProps> = ({
  filter: { active },
  changeFilter,
}) => {
  const { items } = notes;

  const { t } = useTranslation();

  const currentItem = useMemo(
    () => items.find(({ id }) => id === active),
    [active, items]
  );

  const onSaveEditorContent = useCallback(
    (event) => {
      const { id, title } = currentItem!;
      const content = event.target.getContent();

      notes.updateNote(id, { content, title });
    },
    [currentItem]
  );

  const onSaveCodeEditorContent = useCallback(
    (content) => {
      const { id, title } = currentItem!;

      notes.updateNote(id, { content, title });
    },
    [currentItem]
  );

  const onChangeSubType = useCallback(
    (nextType) => {
      const { id } = currentItem!;

      notes.updateNote(id, { subType: nextType });
    },
    [currentItem]
  );

  const onSaveTitle = useCallback(
    (title) => {
      const { id } = currentItem!;

      notes.updateNote(id, { title });
    },
    [currentItem]
  );

  const onDeleteItem = useCallback(() => {
    changeFilter({ active: null });

    notes.deleteNote(currentItem!.id);
  }, [currentItem, changeFilter]);

  const onChangePriority = useCallback(
    () => notes.changePriority(currentItem!.id),
    [currentItem]
  );

  if (!currentItem) {
    return (
      <div className="full-height flex-center">
        <h4>{t("Note not selected")}</h4>
      </div>
    );
  }

  const {
    content = "",
    title,
    dateCreated,
    priority,
    type,
    subType,
  } = currentItem;

  const isRichEditor = subType === SubType.Rich;

  return (
    <div className="full-height">
      <TitleContainer>
        <FlexboxGrid
          align="middle"
          justify="space-between"
          className="full-height"
        >
          <FlexboxGrid.Item>
            <Title onSave={onSaveTitle} readOnly={type === NoteType.time}>
              {title!}
            </Title>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <FlexboxGrid
              className="full-height w-300"
              align="middle"
              justify="space-between"
            >
              <FlexboxGrid.Item>
                <time>
                  {format(
                    new Date(dateCreated),
                    `'${t("created at")}' d MMM yyyy '${t("in")}' HH:mm`,
                    pageView.formatOptions
                  )}
                </time>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <ButtonToolbar>
                  <SelectPicker
                    size="sm"
                    searchable={false}
                    cleanable={false}
                    placement="bottomEnd"
                    data={SUB_TYPE_OPTIONS}
                    onChange={onChangeSubType}
                    value={subType}
                  />
                  <Dropdown
                    renderToggle={(props, ref) => (
                      <IconButton
                        ref={ref}
                        {...props}
                        icon={<MoreIcon />}
                        size="sm"
                      />
                    )}
                    placement="bottomEnd"
                  >
                    <Dropdown.Item onClick={onChangePriority}>
                      {priority ? t("Remove") : t("Add to")} {t("priority")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={onDeleteItem}
                      className="delete-button"
                    >
                      {t("Delete note")}
                    </Dropdown.Item>
                  </Dropdown>
                </ButtonToolbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </TitleContainer>
      <EditorContainer>
        {isRichEditor ? (
          <Editor
            initialValue={content}
            onSaveContent={onSaveEditorContent}
            onBlur={onSaveEditorContent}
          />
        ) : (
          <CodeEditor content={content} onSave={onSaveCodeEditorContent} />
        )}
      </EditorContainer>
    </div>
  );
};

export default observer(NotesContent);
