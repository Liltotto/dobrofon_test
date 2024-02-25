import { makeAutoObservable } from "mobx";


class SingleTagVisibility {
    visible: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    setVisible(visible: boolean) : void {
        this.visible = visible
    }
}

export default new SingleTagVisibility()