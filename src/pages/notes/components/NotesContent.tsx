import { observer } from "mobx-react-lite";
import { FC, useCallback, useMemo } from "react";
import { notes, pageView } from "../../../store";
import { NotesFilter, NotesFilterHandler } from "../types";
import Editor from "../../../components/editor";
import EditableTitle from "../../../components/editable-title";
import styled from "styled-components";
import { Dropdown, FlexboxGrid, IconButton } from "rsuite";
import MoreIcon from "@rsuite/icons/More";
import { format } from "date-fns";
import { NoteType } from "../../../enums/notes";
import { useTranslation } from "react-i18next";

const TitleContainer = styled.div`
  height: 50px;
  padding: 0px 10px;
`;

const EditorContainer = styled.div`
  height: calc(100% - 50px);
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

  const onSaveContent = useCallback(
    (event) => {
      const { id, title } = currentItem!;
      const content = event.target.getContent();

      notes.updateNote(id, { content, title });
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

  const { content = "", title, dateCreated, priority, type } = currentItem;

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
              className="full-height w-200"
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
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </TitleContainer>
      <EditorContainer>
        <Editor
          initialValue={content}
          onSaveContent={onSaveContent}
          onBlur={onSaveContent}
        />
      </EditorContainer>
    </div>
  );
};

export default observer(NotesContent);
