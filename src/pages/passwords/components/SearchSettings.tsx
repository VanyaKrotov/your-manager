import { Checkbox, CheckboxGroup, IconButton, Popover, Whisper } from "rsuite";
import SearchOptionsIcon from "icons/options.svg";
import { observer } from "mobx-react";
import { pageView } from "store";
import { useTranslation } from "react-i18next";

const SearchSettings = () => {
  const { t } = useTranslation();
  const { passwordsSearchOptions, changePasswordsSearchOptions } = pageView;

  return (
    <Whisper
      trigger="click"
      speaker={
        <Popover>
          <p className="title p-10">{t("Search fields")}</p>
          <CheckboxGroup
            onChange={changePasswordsSearchOptions}
            value={passwordsSearchOptions}
          >
            <Checkbox value="title">{t("Title")}</Checkbox>
            <Checkbox value="username">{t("Username")}</Checkbox>
            <Checkbox value="domain">{t("Domain")}</Checkbox>
            <Checkbox value="description">{t("Description")}</Checkbox>
          </CheckboxGroup>
        </Popover>
      }
      placement="bottomEnd"
    >
      <IconButton icon={<SearchOptionsIcon />} />
    </Whisper>
  );
};

export default observer(SearchSettings);
