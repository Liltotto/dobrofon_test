import { makeAutoObservable } from "mobx";

// type Props = {
//     setVisible: (arg0: boolean) => void
// }

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