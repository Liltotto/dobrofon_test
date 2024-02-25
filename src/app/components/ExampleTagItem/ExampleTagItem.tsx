'use client'

import { Reorder, useDragControls } from "framer-motion";
import { SixDotsIcon } from "../UI/SixDots/SixDotsIcon";

import './exampleTagItem.scss'
import { MouseEvent, useEffect, useRef, useState } from "react";

import visible from "@/app/store/singleTagVisibility";
import positioner from "@/app/store/singleTagPosition";
import singleTagData from "@/app/store/singleTagData";

import { observer } from "mobx-react";

interface IItem {
    id: number;
    name: string;
    color: string;
}



interface Props {
    item: IItem;
    elements: { id: number, tags: IItem[] }[];
    setElements: (arg0: { id: number, tags: IItem[] }[]) => void;
    currentIndex: number;
    id: number;
    inputValue: string;
}

export const ExampleTagItem = observer(({ elements, setElements, item, currentIndex, id, inputValue }: Props) => {

    const dragControls = useDragControls();

    const exampleTagRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (exampleTagRef.current && visible.visible) {
            const rect = exampleTagRef.current.getBoundingClientRect();
            positioner.setPosition({ x: rect.left + window.scrollX - rect.width * 2, y: rect.top + window.scrollY - rect.height * 9 });
        }

        if (!visible.visible) {
            setIsHovered(false);
        }

    }, [visible.visible])

    const clickHandlerThreeDots = (e: MouseEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        positioner.setPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY + rect.height });
        visible.setVisible(true)
    }

    const detectEauality = () => {
        return !elements[currentIndex].tags.some(tag => tag.name === item.name)
    }

    const clickHandlerExampleTag = () => {

        const updatedElements = elements.map(element => {
            if (element.id === id) {
                return { id: id, tags: [...element.tags, item] };
            } else {
                return element;
            }
        });

        if (detectEauality()) {
            setElements(updatedElements)
        }
    }


    const tagNameColor = () => {

        const backgroundColor = singleTagData.id === item.id ? singleTagData.color : item.color;
        const tagName = singleTagData.id === item.id ? singleTagData.input_value : item.name;

        return (
            <div
                onClick={clickHandlerExampleTag}
                className="tag_name"
                style={{ backgroundColor: backgroundColor }}
            >
                {tagName}
            </div>
        )
    }

    const clickHandlerDots = () => {
        visible.setVisible(true)
        singleTagData.setId(item.id)
        singleTagData.setInputValue(item.name)
        singleTagData.setColor(item.color)
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
                {!inputValue.length ? <SixDotsIcon dragControls={dragControls} /> : null}
                {tagNameColor()}
            </div>
            {isHovered &&
                <button
                    className="three_dots"
                    onClick={clickHandlerDots}
                    ref={exampleTagRef}
                >
                    <img src="/threeDots.svg" alt="three dots" />
                </button>}
        </Reorder.Item>
    )
})