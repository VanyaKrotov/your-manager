import { useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { FlexboxGrid } from "rsuite";

import { pageView, passwords } from "store";

import { getItemsByFilter, usePasswordsFilter } from "../utils";
import { Header, Content, RightPanel, AddPassword } from "../components";

const Passwords = () => {
  const [editItem, setEditItem] = useState(0);
  const [filter, changeFilter] = usePasswordsFilter();

  const { active } = filter;
  const { sortedItems } = passwords;
  const { passwordsSearchOptions } = pageView;

  const filteredPasswords = useMemo(
    () => getItemsByFilter(sortedItems, filter, passwordsSearchOptions),
    [filter, sortedItems, passwordsSearchOptions]
  );

  const activeItem = useMemo(
    () => sortedItems.find(({ id }) => id === active),
    [active, sortedItems]
  );

  const [first, second] = useMemo(() => (active ? [18, 6] : [24, 0]), [active]);

  const onClosePanel = useCallback(
    () => changeFilter({ active: undefined }),
    [changeFilter]
  );

  const onOpenCreate = useCallback(() => setEditItem(-1), []);
  const onCloseCreate = useCallback(() => setEditItem(0), []);

  return (
    <FlexboxGrid justify="space-between">
      <AddPassword open={editItem} onClose={onCloseCreate} />

      <FlexboxGrid.Item colspan={first}>
        <div className="m-20">
          <Header
            filter={filter}
            changeFilter={changeFilter}
            onOpenCreate={onOpenCreate}
          />
          <Content
            filter={filter}
            changeFilter={changeFilter}
            items={filteredPasswords}
            onEdit={setEditItem}
          />
        </div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={second}>
        {activeItem && (
          <RightPanel
            item={activeItem}
            onClosePanel={onClosePanel}
            onEditItem={setEditItem}
          />
        )}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default observer(Passwords);
