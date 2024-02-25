import { makeAutoObservable } from "mobx";


class SingleTagData {
    id: number = 0;
    input_value: string = '';
    color: string = '';
    toDelete: boolean = false;
    
    
    constructor() {
        makeAutoObservable(this);
    }

    setId(id: number) : void {
        this.id = id
    }

    setInputValue(input_value: string) : void {
        this.input_value = input_value
    }

    setColor(color: string) : void {
        this.color = color
    }

    setToDelete(toDelete: boolean) : void {
        this.toDelete = toDelete
    }

}

export default new SingleTagData()