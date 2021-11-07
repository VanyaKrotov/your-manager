import { FC, useCallback } from "react";
import { Modal } from "rsuite";
import { passwords } from "store";

import { PasswordForm } from "../forms";

interface CreatePasswordProps {
  open: boolean;
  onClose: () => void;
}

const AddPassword: FC<CreatePasswordProps> = ({ open, onClose }) => {
  const onSubmit = useCallback((values) => {
    // passwords.
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <h5>Add new password</h5>
      </Modal.Header>
      <Modal.Body className="p-10">
        <PasswordForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default AddPassword;
