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

   // const popUpRef = useRef<HTMLDivElement>(null);

   // const [outOfScreen, setOutOfScreen] = useState(false);

    //const [posY, setPosY] = useState(0);

    const rootClasses = [popUpCl.myPopUpWindow];

    if (visible) {
        rootClasses.push(popUpCl.active);
    }

    if (singleTag) {
        rootClasses.push(popUpCl.singleTag);
    }



    // useEffect(() => {
    //     if(singleTag)
    // })


    // const [rect, setRect] = useState<DOMRect>({});

    // useEffect(() => {
    //     if (popUpRef.current && visible) {
    //         setRect(popUpRef.current.getBoundingClientRect())

    //         console.log(rect);
    //         console.log('inner height ' + window.innerHeight);
    //         console.log('rect bottom ' + rect.bottom, 'rect height ' + rect.height, 'top ' + rect.top);
    //         console.log(window.innerHeight - rect.bottom, 'unga bumga ' + rect.height);
    //         if (window.innerHeight - rect.top < rect.height) {
    //             //console.log(window.innerHeight - rect.bottom, rect.height);
    //             //rootClasses.push(popUpCl.out_of_screen);
    //             setPosY(position.y - rect.height)
    //         }
    //         else {

    //             setPosY(position.y)
    //         }
    //     }
    // }, [popUpRef.current, visible])


    // const clickHandlerAddButton = (e: MouseEvent) => {
    //     const rect = (e.target as HTMLElement).getBoundingClientRect();
    //     setPopupPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });
    //     setVisible(true)
    // }

    // const detectIsWindowOut = () => {
    //     if (popUpRef.current) {
    //         console.log(popUpRef.current);
    //         const rect = popUpRef.current.getBoundingClientRect();
    //         // console.log(rect);
    //         // console.log('inner height ' + window.innerHeight);
    //         // console.log('rect bottom ' + rect.bottom, 'rect height ' + rect.height, 'top ' + rect.top);
    //         // console.log(window.innerHeight - rect.bottom, 'unga bumga ' + rect.height);
    //         if (window.innerHeight - rect.bottom < rect.height) {
    //             console.log(window.innerHeight - rect.bottom, rect.height);
    //             //rootClasses.push(popUpCl.out_of_screen);
    //             return position.y - rect.height
    //         }
    //         else {
    //             console.log('pos y ' + position.y);
    //             return position.y
    //         }
    //     }

    // }





    return (
        <div
            className={rootClasses.join(' ')}
            style={{ top: position.y, left: position.x }}
            onClick={(event) => event.stopPropagation()}
            //ref={popUpRef}
        >
            <div>
                {children}
            </div>

        </div>
    );
};