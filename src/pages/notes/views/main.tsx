import { observer } from "mobx-react";

import PageContent from "components/page-content";

import NotesContent from "../components/NotesContent";
import NotesNavigation from "../components/NotesNavigation";
import useNotesFilter from "../utils/useNotesFilter";

const Notes = () => {
  const [filter, changeFilter] = useNotesFilter();

  return (
    <PageContent
      navigation={
        <NotesNavigation filter={filter} changeFilter={changeFilter} />
      }
    >
      <NotesContent filter={filter} changeFilter={changeFilter} />
    </PageContent>
  );
};

export default observer(Notes);
