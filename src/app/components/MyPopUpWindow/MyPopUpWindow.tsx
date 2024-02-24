// @flow 

import { useRef } from 'react';
import popUpCl from './myPopUpWindow.module.scss';

type Props = {
    children: React.ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void
    position: { x: number, y: number }
    singleTag?: boolean
};

export const MyPopUpWindow = ({ children, visible, setVisible, position, singleTag }: Props) => {

    const popUpRef = useRef<HTMLDivElement>(null);
    

    const rootClasses = [popUpCl.myPopUpWindow];

    if (visible) {
        rootClasses.push(popUpCl.active);
    }

    if (singleTag) {
        rootClasses.push(popUpCl.singleTag);
    }

    const detectIsWindowOut = () => {
        if (popUpRef.current){
            const rect = popUpRef.current.getBoundingClientRect();
            console.log('inner height ' + window.innerHeight );
            console.log('rect bottom ' + rect.bottom,'rect height ' + rect.height, 'top ' + rect.top); 
            console.log( window.innerHeight - rect.bottom, 'unga bumga ' + rect.height);
            if (window.innerHeight - rect.top < rect.height) {
                console.log(window.innerHeight - rect.bottom, rect.height);
                
                return position.y - rect.height
            }
            else {
                console.log('pos y ' + position.y);
                return position.y
            }
        } 
        
    }



    return (
        <div
            className={rootClasses.join(' ')}
            style={{ top: detectIsWindowOut(), left: position.x }}
            onClick={(event) => event.stopPropagation()}
            ref={popUpRef}
        >
            {children}
        </div>
    );
};