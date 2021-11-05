import { createUsernameSymbols } from "helpers/user";
import { FC } from "react";
import { Avatar } from "rsuite";

import { User } from "types/user";

import { StyledList, StyledListItem } from "./styles";

interface UserListProps {
  users: User[];
  active: number;
  onSelect: (userId: number) => void;
}

const UserList: FC<UserListProps> = ({ users, active, onSelect }) => (
  <StyledList>
    {users.map(({ username, id }) => (
      <StyledListItem
        key={id}
        data-active={id === active}
        onClick={() => onSelect(id)}
      >
        <Avatar size="xs">{createUsernameSymbols(username)}</Avatar> {username}
      </StyledListItem>
    ))}
  </StyledList>
);

export default UserList;
