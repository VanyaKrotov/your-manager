import { Editor as LibEditor, IAllProps } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { pageView } from "store";

import { EDITOR_INIT_OPTIONS } from "./constants";

import config from "config.json";

const Editor = (props: IAllProps) => {
  const [reloading, setReloading] = useState(false);
  const { t } = useTranslation();

  const { isDarkTheme, smallLanguage, language, theme } = pageView;

  useEffect(() => {
    setReloading(true);

    setTimeout(() => setReloading(false), 500);
  }, [theme, language]);

  if (reloading) {
    return <div className="flex-center full-height">{t("Loading")} ...</div>;
  }

  return (
    <LibEditor
      {...props}
      apiKey={config.tinyApiKey}
      init={{
        skin: isDarkTheme ? "oxide-dark" : undefined,
        content_css: isDarkTheme ? "dark" : undefined,
        language: smallLanguage,
        ...EDITOR_INIT_OPTIONS,
      }}
    />
  );
};

export default observer(Editor);
