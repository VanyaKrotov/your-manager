import { Content, Header } from "rsuite";

import { SearchHeader } from "../components";
import { useSearch } from "../utils";

const Search = () => {
  const [search, changeSearch] = useSearch();

  return (
    <>
      <Header>
        <SearchHeader search={search} changeSearch={changeSearch} />
      </Header>
      <Content>content</Content>
    </>
  );
};

export default Search;
