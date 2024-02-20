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
                <div className="three_dots">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.68788 11.5834C5.38876 11.5834 5.13416 11.4769 4.92409 11.2639C4.71404 11.0508 4.60901 10.7948 4.60901 10.4956C4.60901 10.1965 4.71552 9.94192 4.92853 9.73185C5.14154 9.52178 5.39761 9.41675 5.69674 9.41675C5.99586 9.41675 6.25045 9.52326 6.46051 9.73627C6.67058 9.94928 6.77561 10.2054 6.77561 10.5045C6.77561 10.8036 6.66911 11.0582 6.45609 11.2683C6.24308 11.4783 5.98701 11.5834 5.68788 11.5834ZM9.99557 11.5834C9.69645 11.5834 9.44185 11.4769 9.23178 11.2639C9.02171 11.0508 8.91668 10.7948 8.91668 10.4956C8.91668 10.1965 9.02318 9.94192 9.2362 9.73185C9.44921 9.52178 9.70528 9.41675 10.0044 9.41675C10.3035 9.41675 10.5581 9.52326 10.7682 9.73627C10.9783 9.94928 11.0833 10.2054 11.0833 10.5045C11.0833 10.8036 10.9768 11.0582 10.7638 11.2683C10.5508 11.4783 10.2947 11.5834 9.99557 11.5834ZM14.3032 11.5834C14.0041 11.5834 13.7495 11.4769 13.5395 11.2639C13.3294 11.0508 13.2244 10.7948 13.2244 10.4956C13.2244 10.1965 13.3309 9.94192 13.5439 9.73185C13.7569 9.52178 14.013 9.41675 14.3121 9.41675C14.6112 9.41675 14.8658 9.52326 15.0759 9.73627C15.2859 9.94928 15.391 10.2054 15.391 10.5045C15.391 10.8036 15.2845 11.0582 15.0714 11.2683C14.8584 11.4783 14.6024 11.5834 14.3032 11.5834Z" fill="#999999" />
                    </svg>
                </div>}
        </Reorder.Item>
    )
}