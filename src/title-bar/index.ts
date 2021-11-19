import { createGlobalStyle } from "styled-components";

import { TITLE_BAR_HEIGHT } from "./constants";

export const TitleGlobalStyle = createGlobalStyle`
    #title-bar {
        min-height: ${TITLE_BAR_HEIGHT}px;
    }

    #root {
        height: calc(100% - ${TITLE_BAR_HEIGHT}px);
        overflow: hidden;
    }

    .screen-height {
        height: calc(100vh - ${TITLE_BAR_HEIGHT}px);
    }

    .rs-modal-wrapper, .rs-modal-backdrop, .rs-drawer-wrapper, .rs-drawer-backdrop, .rs-drawer-top {
        top: ${TITLE_BAR_HEIGHT}px;
    }

    .rs-drawer-full.rs-drawer-bottom, .rs-drawer-full.rs-drawer-top {
        height: calc(100% - (60px + ${TITLE_BAR_HEIGHT}px));
    }
`;

export { default as TitleBar } from "./components/TitleBar";
