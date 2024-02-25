'use client'

import { Reorder, useDragControls } from "framer-motion";
import { SixDotsIcon } from "../UI/SixDots/SixDotsIcon";

import './exampleTagItem.scss'
import { MouseEvent, useEffect, useRef, useState } from "react";

import visible from "@/app/store/singleTagVisibility";
import positioner from "@/app/store/singleTagPosition";
//import { observe } from "mobx";
import { observer } from "mobx-react";

interface IItem {
    id: number;
    name: string;
    color: string;
}

interface Props {
    item: IItem;
    choosedTags: IItem[];
    setChoosedTags: (arg0: IItem[]) => void;
}

export const ExampleTagItem = observer(({ choosedTags, setChoosedTags, item }: Props) => {

    const dragControls = useDragControls();

    const exampleTagRef = useRef<HTMLButtonElement>(null)
    //const [visibleSingleTag, setVisibleSingleTag] = useState<boolean>(false);

    useEffect(() => {
        if (exampleTagRef.current && visible.visible) {
            const rect = exampleTagRef.current.getBoundingClientRect();
            positioner.setPosition({ x: rect.left + window.scrollX - rect.width * 2, y: rect.top + window.scrollY - rect.height * 9 });
            //visible.setVisible(true)
        }

        if (!visible.visible) {
            setIsHovered(false);
        }

    }, [visible.visible])

    const clickHandlerThreeDots = (e: MouseEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        positioner.setPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY + rect.height });
        visible.setVisible(true)
        //setPositionOfPopup(popupPosition)
    }

    const detectEauality = () => {
        if (!choosedTags) return
        return !choosedTags.some(choosedTag => choosedTag.name === item.name)
    }

    const clickHandlerExampleTag = () => {
        
        if (detectEauality()) {
            setChoosedTags([...choosedTags, item])
        }
    }

    const [isHovered, setIsHovered] = useState(false);
    const [isDragged, setIsDragged] = useState(false);

    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={dragControls}
            onMouseEnter={() => {
                if (visible.visible) return
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                if (visible.visible) return
                setIsHovered(false)
            }}
            onDragStart={() => {
                visible.setVisible(false)
                setIsDragged(true)
            }}
            onDragEnd={() => {
                setIsDragged(false)
            }}



            className={`list_of_tags__item ${isDragged || isHovered ? 'dragged' : ''}`}
        >
            <div className="dots_and_name">
                <SixDotsIcon dragControls={dragControls} />
                <div
                    onClick={clickHandlerExampleTag}
                    className="tag_name"
                    style={{ backgroundColor: item.color }}
                >
                    {item.name}
                </div>
            </div>
            {isHovered &&
                <button
                    className="three_dots"
                    onClick={() => visible.setVisible(true)}
                    ref={exampleTagRef}
                >
                    <img src="/threeDots.svg" alt="three dots" />
                </button>}
        </Reorder.Item>
    )
})