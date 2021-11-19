import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { pageView } from "store";

import { watchChangeTitle } from "title-bar/utils";

import {
  ButtonControl,
  Container,
  IconControl,
  TitleControl,
  Button,
} from "./styles";

import MinimizeIcon from "icons/title-bar/minimize.svg";
import MaximizeIcon from "icons/title-bar/maximize.svg";
import RestoreIcon from "icons/title-bar/restore.svg";
import CloseIcon from "icons/title-bar/close.svg";
import LogoIcon from "icons/logo.svg";

const TitleBar = () => {
  const [title, setTitle] = useState(document.title);

  const { isMaximizeWindow } = pageView;

  useEffect(() => {
    const observer = watchChangeTitle(() => {
      setTitle(document.title);
    });

    window.dispatchEvent(new CustomEvent("bind-title-buttons"));

    const maximize = () => pageView.changIisMaximizeWindow(true);
    const restored = () => pageView.changIisMaximizeWindow(false);

    window.addEventListener("window-maximized", maximize);
    window.addEventListener("window-restored", restored);

    return () => {
      window.removeEventListener("window-maximized", maximize);
      window.removeEventListener("window-restored", restored);
      observer.disconnect();
    };
  }, []);

  return (
    <Container>
      <IconControl>
        <LogoIcon />
      </IconControl>
      <TitleControl>{title}</TitleControl>
      <ButtonControl>
        <Button id="minimize-window">
          <MinimizeIcon />
        </Button>
        <Button id="maximize-window">
          {isMaximizeWindow ? <RestoreIcon /> : <MaximizeIcon />}
        </Button>
        <Button id="close-window">
          <CloseIcon />
        </Button>
      </ButtonControl>
    </Container>
  );
};

export default observer(TitleBar);
