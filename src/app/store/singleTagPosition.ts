import { makeAutoObservable } from "mobx";

class SingleTagPosition {
    position: { x: number, y: number } = { x: 0, y: 0 };
    
    constructor() {
        makeAutoObservable(this);
    }

    setPosition(position: { x: number, y: number }) : void {
        console.log('POSITION ' + position.x + ' ' + position.y);
        this.position = position
        
    }
}

export default new SingleTagPosition()