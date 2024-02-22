// @flow 

import cl from './MyModal.module.scss';

type Props = {
    children: React.ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void
};

export const MyModal = ({children, visible, setVisible} : Props) => {

    const rootClasses = [cl.myModal];

    if(visible){
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};