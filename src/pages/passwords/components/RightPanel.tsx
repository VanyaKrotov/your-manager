import { FC, useCallback, useEffect, useState } from "react";
import {
  ButtonToolbar,
  Dropdown,
  FlexboxGrid,
  IconButton,
  InputPicker,
  Message,
  toaster,
} from "rsuite";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import copy from "copy-to-clipboard";

import { decryptPassword } from "helpers/passwords";
import { Password } from "types/passwords";

import { pageView, passwords, user } from "store";

import Textarea from "components/textarea";
import {
  PanelContainer,
  PanelTitle,
  PanelContent,
  PanelBottomControl,
} from "components/panels";

import CopyField from "./CopyField";
import { Section, SectionContent, SectionTitle } from "./styles";

import TrashIcon from "@rsuite/icons/Trash";
import ArrowIcon from "icons/arrow-forward.svg";
import MoreIcon from "icons/more.svg";
import LockIcon from "icons/lock.svg";
import UnLockIcon from "icons/unlock.svg";

interface RightPanelProps {
  item: Password;
  onClosePanel: () => void;
  onEditItem: (value: number) => void;
}

const RightPanel: FC<RightPanelProps> = ({
  item,
  onClosePanel,
  onEditItem,
}) => {
  const [encPassword, setEncPassword] = useState("");

  const { t } = useTranslation();

  const { pickerGroups } = passwords;

  const {
    id,
    title,
    description,
    username,
    domain,
    password,
    lastUpdated,
    dateCreated,
    groupId,
  } = item;

  const onOpenPassword = useCallback(async () => {
    if (encPassword) {
      return setEncPassword("");
    }

    user
      .getPrivateKey()
      .then((key) => setEncPassword(decryptPassword(password, key)));
  }, [password, encPassword]);

  const onCopy = useCallback(
    (fieldName: keyof Password) => () => {
      copy(String(item[fieldName])) &&
        toaster.push(
          <Message type="success">
            {t("template copied", { fieldName })}
          </Message>
        );
    },
    [item, t]
  );

  const onCopyPassword = useCallback(() => {
    copy(encPassword) &&
      toaster.push(
        <Message type="success">
          {t("template copied", { fieldName: "password" })}
        </Message>
      );
  }, [encPassword, t]);

  const onRemoveItem = useCallback(
    async () => passwords.removePassword(id).then(onClosePanel),
    [id, onClosePanel]
  );

  useEffect(() => {
    setEncPassword("");
  }, [id]);

  return (
    <PanelContainer data-layer="1">
      <PanelContent>
        <PanelTitle>
          <FlexboxGrid align="middle" justify="space-between">
            <FlexboxGrid.Item>
              <h4>{title}</h4>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <ButtonToolbar className="m-r--10">
                <IconButton
                  appearance="subtle"
                  icon={encPassword ? <LockIcon /> : <UnLockIcon />}
                  onClick={onOpenPassword}
                />
                <Dropdown
                  renderToggle={(props, ref) => (
                    <IconButton
                      {...props}
                      ref={ref}
                      icon={<MoreIcon />}
                      appearance="subtle"
                    />
                  )}
                  placement="bottomEnd"
                >
                  <Dropdown.Item onClick={() => onEditItem(id)}>
                    {t("Edit")}
                  </Dropdown.Item>
                </Dropdown>
              </ButtonToolbar>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </PanelTitle>
        <Section>
          <SectionTitle>{t("Username")}: </SectionTitle>
          <SectionContent>
            <CopyField onCopy={onCopy("username")}>{username}</CopyField>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>{t("Password")}: </SectionTitle>
          <SectionContent>
            <CopyField onCopy={encPassword ? onCopyPassword : undefined}>
              {encPassword || "********"}
            </CopyField>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>{t("Domain")}: </SectionTitle>
          <SectionContent className="domain">
            <CopyField onCopy={onCopy("domain")}>{domain}</CopyField>
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>{t("Group")}: </SectionTitle>
          <SectionContent>
            <InputPicker
              cleanable={false}
              data={pickerGroups}
              value={groupId}
              readOnly
            />
          </SectionContent>
        </Section>

        <Section data-block>
          <SectionTitle>{t("Description")}: </SectionTitle>
          <SectionContent data-full-width>
            <Textarea value={description} readOnly />
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>{t("Created at")}: </SectionTitle>
          <SectionContent data-inline>
            <time>
              {format(
                dateCreated,
                `dd MMM yyyy '${t("in")}' HH:mm`,
                pageView.formatOptions
              )}
            </time>
          </SectionContent>
        </Section>
      </PanelContent>
      <PanelBottomControl>
        <FlexboxGrid
          justify="space-between"
          className="full-height p-10"
          align="middle"
        >
          <FlexboxGrid.Item>
            <IconButton icon={<ArrowIcon />} onClick={onClosePanel} />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <time>
              {lastUpdated
                ? format(
                    lastUpdated,
                    `dd MMM yyyy '${t("in")}' HH:mm`,
                    pageView.formatOptions
                  )
                : t("Not updated")}
            </time>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <IconButton
              icon={<TrashIcon />}
              className="delete-button"
              onClick={onRemoveItem}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </PanelBottomControl>
    </PanelContainer>
  );
};

export default observer(RightPanel);
