import { FC, useCallback, useState } from "react";
import {
  ButtonToolbar,
  Checkbox,
  Dropdown,
  IconButton,
  Message,
  toaster,
} from "rsuite";
import copy from "copy-to-clipboard";
import { observer } from "mobx-react";

import { decryptPassword } from "helpers/passwords";

import { user, passwords } from "store";
import { Password } from "types/passwords";

import {
  TableRow as TableRowContainer,
  TableCol,
  StopPropTableCol,
} from "./styles";

import CopyField from "../CopyField";

import MoreIcon from "icons/more.svg";
import LockIcon from "icons/lock.svg";
import UnLockIcon from "icons/unlock.svg";
import { useTranslation } from "react-i18next";

interface TableRowProps {
  data: Password;
  selected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onSelect: (id: number) => void;
}

const TableRow: FC<TableRowProps> = ({
  data,
  selected,
  onClick,
  onSelect,
  onEdit,
}) => {
  const [show, setShow] = useState("");

  const { id, title, domain, groupId, username, password } = data;
  const { groupsMap } = passwords;

  const { t } = useTranslation();

  const onOpenPassword = useCallback(async () => {
    if (show) {
      return setShow("");
    }

    user.getPrivateKey().then((key) => setShow(decryptPassword(password, key)));
  }, [password, show]);

  const onCopy = useCallback(
    (fieldName: keyof Password) => () => {
      copy(String(data[fieldName])) &&
        toaster.push(
          <Message type="success">
            {t("template copied", { fieldName })}
          </Message>
        );
    },
    [data, t]
  );

  const onCopyPassword = useCallback(() => {
    copy(show) &&
      toaster.push(
        <Message type="success">
          {t("template copied", { fieldName: "password" })}
        </Message>
      );
  }, [show, t]);

  return (
    <TableRowContainer onClick={onClick}>
      <StopPropTableCol
        xs={1}
        sm={1}
        md={1}
        lg={1}
        data-padding
        className="flex-block"
      >
        <Checkbox
          className="custom-checkbox"
          checked={selected}
          onChange={() => onSelect(id)}
        />
      </StopPropTableCol>
      <TableCol xs={4} sm={4} md={4} lg={4} data-padding>
        {title}
      </TableCol>
      <StopPropTableCol xs={4} sm={4} md={4} lg={5}>
        <CopyField onCopy={onCopy("username")}>{username}</CopyField>
      </StopPropTableCol>
      <StopPropTableCol xs={3} sm={4} md={4} lg={4}>
        <span className="domain">
          <CopyField onCopy={onCopy("domain")}>{domain}</CopyField>
        </span>
      </StopPropTableCol>
      <StopPropTableCol xs={4} sm={4} md={5} lg={5}>
        <CopyField onCopy={show ? onCopyPassword : undefined}>
          {show || "********"}
        </CopyField>
      </StopPropTableCol>
      <StopPropTableCol xs={4} sm={3} md={3} lg={3} data-padding>
        <time>{groupsMap[groupId]?.title}</time>
      </StopPropTableCol>
      <StopPropTableCol xs={4} sm={4} md={3} lg={2}>
        <ButtonToolbar className="align-right">
          <IconButton
            icon={show ? <LockIcon /> : <UnLockIcon />}
            size="sm"
            onClick={onOpenPassword}
            appearance="subtle"
          />
          <Dropdown
            renderToggle={(props, ref) => (
              <IconButton
                {...props}
                ref={ref}
                icon={<MoreIcon />}
                size="sm"
                appearance="subtle"
              />
            )}
            placement="bottomEnd"
          >
            <Dropdown.Item onClick={onEdit}>{t("Edit")}</Dropdown.Item>
            <Dropdown.Item
              className="delete-button"
              onClick={() => passwords.removePassword(id)}
            >
              {t("Delete")}
            </Dropdown.Item>
          </Dropdown>
        </ButtonToolbar>
      </StopPropTableCol>
    </TableRowContainer>
  );
};

export default observer(TableRow);
