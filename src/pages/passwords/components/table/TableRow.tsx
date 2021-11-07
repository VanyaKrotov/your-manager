import { FC, useCallback, useState } from "react";
import { ButtonToolbar, Checkbox, IconButton, Message, toaster } from "rsuite";
import copy from "copy-to-clipboard";

import { TableRow as TableRowContainer, TableCol } from "./styles";
import { Password } from "types/passwords";

import CopyField from "../CopyField";

import MoreIcon from "icons/more.svg";
import LockIcon from "icons/lock.svg";
import UnLockIcon from "icons/unlock.svg";
import { modals, user } from "store";
import { ModalType } from "store/modals/types";
import { encryptPassword } from "helpers/passwords";

interface TableRowProps {
  data: Password;
}

const TableRow: FC<TableRowProps> = ({ data }) => {
  const [show, setShow] = useState("");
  const { title, domain, groupId, username, password } = data;

  const onOpenPassword = useCallback(async () => {
    try {
      let key = user.sessionPrivateKey;
      if (!key) {
        key = await new Promise((resolve, reject) =>
          modals.open(ModalType.PrivateKeyConfirm, {
            resolve,
            reject,
          })
        );
      }

      setShow(encryptPassword(password, key!));
    } catch (error) {}
  }, [password]);

  const onCopy = useCallback(
    (fieldName: keyof Password) => () => {
      copy(String(data[fieldName])) &&
        toaster.push(<Message type="success">{fieldName} copied!</Message>);
    },
    [data]
  );

  const onCopyPassword = show ? () => copy(show) : undefined;

  return (
    <TableRowContainer>
      <TableCol xs={1} sm={1} md={1} lg={1} data-padding className="flex-block">
        <Checkbox className="custom-checkbox" />
      </TableCol>
      <TableCol xs={4} sm={4} md={4} lg={4} data-padding>
        {title}
      </TableCol>
      <TableCol xs={4} sm={4} md={4} lg={5}>
        <CopyField onCopy={onCopy("username")}>{username}</CopyField>
      </TableCol>
      <TableCol xs={3} sm={4} md={4} lg={4}>
        <span className="domain">
          <CopyField onCopy={onCopy("domain")}>{domain}</CopyField>
        </span>
      </TableCol>
      <TableCol xs={4} sm={4} md={5} lg={5}>
        <CopyField onCopy={onCopyPassword}>{show || "********"}</CopyField>
      </TableCol>
      <TableCol xs={4} sm={3} md={3} lg={3} data-padding>
        {groupId}
      </TableCol>
      <TableCol xs={4} sm={4} md={3} lg={2}>
        <ButtonToolbar className="align-right">
          <IconButton
            icon={show ? <LockIcon /> : <UnLockIcon />}
            size="sm"
            onClick={onOpenPassword}
            appearance="subtle"
          />
          <IconButton icon={<MoreIcon />} size="sm" appearance="subtle" />
        </ButtonToolbar>
      </TableCol>
    </TableRowContainer>
  );
};

export default TableRow;
