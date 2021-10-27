import { Editor as LibEditor, IAllProps } from "@tinymce/tinymce-react";

import { useResizeWindow } from "../../hooks";
import { EDITOR_INIT_OPTIONS } from "./constants";

import config from "../../config.json";

interface EditorProps extends IAllProps {}

const Editor = (props: EditorProps) => {
  const { height } = useResizeWindow();

  return (
    <LibEditor
      {...props}
      apiKey={config.tinyApiKey}
      init={{
        height,
        ...EDITOR_INIT_OPTIONS,
      }}
    />
  );
};

export default Editor;
