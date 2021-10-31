import { FC } from "react";
import { Dropdown } from "rsuite";
import { ContextMenu as ContextMenuLib, MenuItem } from "react-contextmenu";

import { ContextMenuItem } from "./types";
import { handlerBuilder } from "./utils";

interface ContextMenuProps {
  items: ContextMenuItem[];
  id: string;
}

const ContextMenu: FC<ContextMenuProps> = ({ id, items }) => (
  <ContextMenuLib id={id}>
    <Dropdown.Menu>
      {items.map(({ handler, label, icon, className }, index) => (
        <MenuItem onClick={handlerBuilder(handler)} key={index}>
          <Dropdown.Item icon={icon} className={className}>
            {label}
          </Dropdown.Item>
        </MenuItem>
      ))}
    </Dropdown.Menu>
  </ContextMenuLib>
);

export default ContextMenu;
