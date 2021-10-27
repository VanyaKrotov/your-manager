import { observer } from "mobx-react";
import { useEffect } from "react";
import PageContent from "../../../components/page-content";
import { notes } from "../../../store";
import NotesContent from "../components/NotesContent";
import NotesNavigation from "../components/NotesNavigation";
import useNotesFilter from "../utils/useNotesFilter";

const Notes = () => {
  const [filter, changeFilter] = useNotesFilter();

  useEffect(() => {
    if (notes.items.length) {
      changeFilter({ active: notes.items[0].id });
    }
  }, [changeFilter]);

  return (
    <PageContent
      navigation={
        <NotesNavigation filter={filter} changeFilter={changeFilter} />
      }
    >
      <NotesContent filter={filter} />
    </PageContent>
  );
};

export default observer(Notes);
