// @flow 

'use client'

import { Reorder } from 'framer-motion';


import './tagsEditingWindow.scss'
import { useState } from 'react';
//import { SixDotsIcon } from '../UI/SixDots/SixDotsIcon';
import { ExampleTagItem } from '../ExampleTagItem/ExampleTagItem';



type Props = {

};



export const TagsEditingWindow = (props: Props) => {

    const [items, setItems] = useState([
        { id: 1, name: 'Tag 1' },
        { id: 2, name: 'Tag 2' },
        { id: 3, name: 'Tag 3' },
    ]);

    // НАДО ТУТ ЮЗАНУТЬ MOBX ПО ЛЮБОМУ
    const [isScrollLocked, setScrollLocked] = useState(false);
    

    return (
        <div className='tags_editing_window'>

            <div className="tags_editing_window__choosed_tags">
                <div className='tags_editing_window__choosed_tags__item'>
                    <div className="tags_editing_window__choosed_tags__item__name">
                        Тег 1
                    </div>
                    <button className='cross_button'>
                        <img className='cross' src="/cross.svg" alt="coss" />
                    </button>
                </div>
                
            </div>

            <button className='tags_editing_window__create_button'>
                <div className="plus_and_text">
                    <svg className='plus' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.18855 12.8V8.81136H3.19995V7.18855H7.18855V3.19995H8.81136V7.18855H12.8V8.81136H8.81136V12.8H7.18855Z" fill="#999999" />
                    </svg>

                    <div className='create_text'>Создать тег</div>
                </div>

            </button>
            <Reorder.Group className='list_of_tags' axis='y' values={items} onReorder={setItems}>
                {items.map(item => <ExampleTagItem item={item} key={item.id} />)}
            </Reorder.Group>
        </div>
    );
};

