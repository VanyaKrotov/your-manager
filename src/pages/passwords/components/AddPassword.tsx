import { decryptPassword, encryptPassword } from "helpers/passwords";
import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "rsuite";
import { passwords, user } from "store";

import { PasswordForm } from "../forms";
import { PasswordFormValue } from "../forms/PasswordForm";

interface CreatePasswordProps {
  open: number;
  onClose: () => void;
}

const AddPassword: FC<CreatePasswordProps> = ({ open, onClose }) => {
  const [initialValues, setInitialValues] = useState<PasswordFormValue | null>(
    null
  );

  const { t } = useTranslation();

  const { list } = passwords;

  const currentItem = useMemo(
    () => list.find(({ id }) => id === open),
    [list, open]
  );

  const onSubmit = useCallback(
    async (values) => {
      try {
        const key = await user.getPrivateKey();

        const password = encryptPassword(values.password, key);

        const savedValues = Object.assign(values, {
          password,
        });

        if (currentItem) {
          await passwords.editPassword(savedValues);
        } else {
          await passwords.addPassword(savedValues);
        }

        onClose();
      } catch (error) {
        console.log(error);
      }
    },
    [onClose, currentItem]
  );

  useEffect(() => {
    if (!currentItem) {
      return;
    }

    user.getPrivateKey().then((key) =>
      setInitialValues({
        ...currentItem,
        password: decryptPassword(currentItem.password, key),
      })
    );
  }, [currentItem]);

  return (
    <Modal open={Boolean(open)} onClose={onClose}>
      <Modal.Header>
        <h5>{currentItem ? t("Editing") : t("Add new password")}</h5>
      </Modal.Header>
      <Modal.Body className="p-10">
        <PasswordForm onSubmit={onSubmit} initialValues={initialValues} />
      </Modal.Body>
    </Modal>
  );
};

export default observer(AddPassword);
