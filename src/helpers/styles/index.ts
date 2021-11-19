import { isElectron } from "definition";
import { TITLE_BAR_HEIGHT } from "title-bar/constants";

export const getWindowHeight = (size: string) =>
  `calc(${size} - ${isElectron ? TITLE_BAR_HEIGHT : "0"}px)`;
