// @flow 

import popUpCl from './myPopUpWindow.module.scss';

type Props = {
    children: React.ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void
    position: { x: number, y: number }
    singleTag?: boolean
};

export const MyPopUpWindow = ({ children, visible, setVisible, position, singleTag }: Props) => {
    const rootClasses = [popUpCl.myPopUpWindow];

    if (visible) {
        rootClasses.push(popUpCl.active);
    }

    if (singleTag) {
        rootClasses.push(popUpCl.singleTag);
    }




    return (
        <div
            className={rootClasses.join(' ')}
            style={{ top: position.y, left: position.x }}
            onClick={(event) => event.stopPropagation()}
        >        
                {children}
        </div>
    );
};