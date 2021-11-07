export enum ModalType {
  PrivateKeyConfirm,
}

export interface ModalState {
  open: boolean;
  props: Record<string, any>;
}
