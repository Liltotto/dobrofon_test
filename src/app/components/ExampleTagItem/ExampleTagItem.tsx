'use client'

import { Reorder, useDragControls } from "framer-motion";
import { SixDotsIcon } from "../UI/SixDots/SixDotsIcon";

import './exampleTagItem.scss'
import { useState } from "react";

interface IItem {
    id: number;
    name: string;
}

export const ExampleTagItem = ({ item }: { item: IItem }) => {

    const dragControls = useDragControls();

    const [isHovered, setIsHovered] = useState(false);
    const [isDragged, setIsDragged] = useState(false);

    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={dragControls}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDragStart={() => setIsDragged(true)}
            onDragEnd={() => {
                setIsDragged(false)
            }}
            
            className={`list_of_tags__item ${isDragged ? 'dragged' : ''}`}
        >
            <div className="dots_and_name">
                <SixDotsIcon dragControls={dragControls} />
                <div className="tag_name">{item.name}</div>
            </div>
            {isHovered &&
                <button className="three_dots">
                    <img src="/threeDots.svg" alt="three dots" />
                </button>}
        </Reorder.Item>
    )
}