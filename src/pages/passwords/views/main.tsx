import { usePasswordsFilter } from "../utils";
import { Header, Content } from "../components";

const Passwords = () => {
  const [filter, changeFilter] = usePasswordsFilter();

  return (
    <div className="m-20">
      <Header filter={filter} changeFilter={changeFilter} />
      <Content filter={filter} changeFilter={changeFilter} />
    </div>
  );
};

export default Passwords;
