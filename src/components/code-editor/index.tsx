import Editor from "@monaco-editor/react";
import { Theme } from "enums/page-view";
import { observer } from "mobx-react";
import { FC, useCallback, useMemo, useState } from "react";
import { FlexboxGrid, IconButton, SelectPicker } from "rsuite";
import { debounce } from "lodash-es";

import { pageView } from "store";
import { LANGUAGES_LIST } from "./constants";

import { Header, EditorContainer } from "./styled";

import SaveIcon from "icons/save.svg";
import { useTranslation } from "react-i18next";

interface CodeEditorProps {
  content: string;
  onSave: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ content, onSave }) => {
  const [value, setValue] = useState(content);
  const [language, setLanguage] = useState("javascript");

  const { t } = useTranslation();

  const { theme } = pageView;

  const localTheme = useMemo(
    () => ({ [Theme.Light]: "light", [Theme.Dark]: "vs-dark" }[theme]),
    [theme]
  );

  const languagesOptions = useMemo(
    () =>
      LANGUAGES_LIST.map((lang) => ({
        value: lang,
        label: lang,
      })),
    [theme]
  );

  const onSaveContent = useCallback(
    debounce((value: string) => onSave(value), 1000),
    [onSave]
  );

  const onChangeValue = useCallback(
    (value) => {
      setValue(value);
      onSaveContent(value);
    },
    [setValue, onSaveContent]
  );
  const onChangeLanguage = useCallback(
    (language) => setLanguage(language),
    [setLanguage]
  );

  return (
    <div className="full-height">
      <Header>
        <FlexboxGrid
          align="middle"
          justify="space-between"
          className="full-height"
        >
          <FlexboxGrid.Item>
            <SelectPicker
              size="xs"
              data={languagesOptions}
              cleanable={false}
              searchable={false}
              value={language}
              onChange={onChangeLanguage}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <IconButton
              icon={<SaveIcon />}
              size="xs"
              onClick={() => onSaveContent(value)}
            >
              {t("Save")}
            </IconButton>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <EditorContainer>
        <Editor
          height="100%"
          value={value}
          theme={localTheme}
          onChange={onChangeValue}
          language={language}
        />
      </EditorContainer>
    </div>
  );
};

export default observer(CodeEditor);
