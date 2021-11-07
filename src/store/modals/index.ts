import { makeAutoObservable } from "mobx";
import { DEFAULT_MODAL_STATE } from "./constants";
import { ModalState, ModalType } from "./types";

class ModalsStore {
  public data: Record<ModalType, ModalState> = {
    [ModalType.PrivateKeyConfirm]: DEFAULT_MODAL_STATE,
  };

  constructor() {
    makeAutoObservable(this);
  }

  public open(type: ModalType, props: Record<string, any> = {}) {
    this.data[type].open = true;
    this.data[type].props = props;
  }

  public close(type: ModalType) {
    this.data[type].open = false;
    this.data[type].props = {};
  }
}

export default ModalsStore;
