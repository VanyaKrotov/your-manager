import { FC } from "react";

import { Password } from "types/passwords";

import TableRow from "./TableRow";

interface TableBodyProps {}

const TableBody: FC<TableBodyProps> = ({}) => {
  const items: Password[] = [
    {
      id: 1,
      title: "passwords 1",
      userId: 1,
      username: "Ivan",
      password: "slkdjas;lkdjlkasjdlkajslkdjalksjdlkasd",
      dateCreated: new Date().getTime(),
      lastOpened: null,
      lastUpdated: null,
      groupId: 2,
      description: "aslkdjaslkdjlaskjdlaksjdlkas",
      domain: "domain",
    },
    {
      id: 2,
      title: "passwords 2",
      userId: 1,
      username: "Ivan",
      password: "slkdjas;lkdjlkasjdlkajslkdjalksjdlkasd",
      dateCreated: new Date().getTime(),
      lastOpened: null,
      lastUpdated: null,
      groupId: 2,
      description: "aslkdjaslkdjlaskjdlaksjdlkas",
      domain: "domain",
    },
  ];

  return (
    <>
      {items.map((item) => (
        <TableRow data={item} key={item.id} />
      ))}
    </>
  );
};

export default TableBody;
