import { observer } from "mobx-react";
import { SHA256 } from "crypto-js";
import { useCallback } from "react";
import { Form, Modal, Input, Button, Checkbox } from "rsuite";
import { modals, user } from "store";
import { ModalType } from "store/modals/types";

const PasswordConfirmation = () => {
  const {
    open,
    props: { resolve, reject },
  } = modals.data[ModalType.PrivateKeyConfirm];
  const { data } = user;

  const closeModal = useCallback(() => {
    modals.close(ModalType.PrivateKeyConfirm);
    reject();
  }, [reject]);

  const onSubmitHandler = useCallback(
    (valid, event) => {
      if (!valid) {
        return;
      }

      const key = event.target.privateKey.value;
      if (data?.privateKey !== SHA256(key).toString()) {
        return;
      }

      resolve(key);
      modals.close(ModalType.PrivateKeyConfirm);

      const saved = event.target.savedKey.checked;
      if (saved) {
        user.changeSessionPrivateKey(key);
      }
    },
    [data?.privateKey, resolve]
  );

  return (
    <Modal open={open} role="alertdialog" size="xs" backdrop="static">
      <Form onSubmit={onSubmitHandler} fluid>
        <Modal.Body>
          <Form.Group>
            <Form.ControlLabel>
              Подтверждение приватного ключа
            </Form.ControlLabel>
            <Form.Control<typeof Input>
              type="password"
              name="privateKey"
              autoFocus
            />
            <Form.Control<typeof Checkbox> name="savedKey" accepter={Checkbox}>
              Запомнить для текущей сессии
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={closeModal} appearance="subtle">
            Cancel
          </Button>
          <Button type="submit" appearance="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default observer(PasswordConfirmation);
