import { makeAutoObservable } from "mobx";

class Modal {
    modalMode: string = 'create'; // 'create' || 'update'
    isOpen: boolean = false;

    constructor () {
        makeAutoObservable(this);
    }

    switchOpen(param: string) {
        this.changeModalMode(param);
        this.isOpen = !this.isOpen;
    }

    changeModalMode(value: string) {
        this.modalMode = value;
    }

}

export default new Modal();