// @flow 

'use client'

import { Reorder } from 'framer-motion';


import './tagsEditingWindow.scss'
import { useEffect, useMemo, useState } from 'react';
//import { SixDotsIcon } from '../UI/SixDots/SixDotsIcon';
import { ExampleTagItem } from '../ExampleTagItem/ExampleTagItem';

import visible from '@/app/store/singleTagVisibility';
import positioner from '@/app/store/singleTagPosition';

import { MyPopUpWindow } from '../MyPopUpWindow/MyPopUpWindow';
import { SingleTagEditingWindow } from '../SingleTagEditingWindow/SingleTagEditingWindow';
import { observer } from 'mobx-react';
import { reverse } from 'dns';


type Props = {
    colors: string[],
    id: number,
    elements: { id: number, tags : { id: number, name: string, color: string }[] }[],
    setElements: (arg0: { id: number,  tags : { id: number, name: string, color: string }[] }[]) => void
};



export const TagsEditingWindow = observer(({ colors, id, elements, setElements }: Props) => {

    // const colors = [' rgb(244, 98, 98)', 'rgb(252, 148, 74)', 'rgb(250, 208, 56)', 'rgb(71, 209, 124)', 'rgb(76, 178, 229)', 'rgb(110, 133, 247)', 'rgb(196, 125, 232)', 'rgb(153, 153, 153)'];

    const [reservedTags, setReservedTags] = useState<{ id: number, name: string, color: string }[]>([
        { id: 1, name: 'Tag 1', color: colors[0] },
        { id: 2, name: 'Tag 2', color: colors[1] },
        { id: 3, name: 'Tag 3', color: colors[2] },
        { id: 4, name: 'Tag 4', color: colors[3] },
        { id: 5, name: 'Tag 5', color: colors[4] },
        { id: 6, name: 'Tag 6', color: colors[5] },
        { id: 7, name: 'Tag 7', color: colors[6] },
        { id: 8, name: 'Tag 8', color: colors[7] },
    ]);

    const [choosedTags, setChoosedTags] = useState<{ id: number, name: string, color: string }[]>([
        // { id: 1, name: 'Tag 1', color: colors[0] },
        // { id: 2, name: 'Tag 2', color: colors[1] },
        // { id: 3, name: 'Tag 3', color: colors[2] },
        // { id: 4, name: 'T1', color: colors[3] },
        // { id: 5, name: 'g 2', color: colors[4] },
        // { id: 6, name: 'T 3', color: colors[5] },
        // { id: 7, name: 'T1', color: colors[6] },
        // { id: 8, name: '.', color: colors[7] },

    ])

    const [inputedTag, setInputedTag] = useState<{ id: number, name: string, color: string }>();

    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
        if(!inputedTag) return
        setReservedTags([...reservedTags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'reserved'), color: inputedTag.color }])
        
        setChoosedTags([...choosedTags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'choosed'), color: inputedTag.color }])
        

        //console.log(elements);

        console.log('CURRENT ID', id);
    }, [inputedTag])

    // const updatedElements = elements.map(element => {
    //     if (element.id === id) {
    //         return { id: id, tags: [...element.tags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'choosed'), color: inputedTag.color }] };
    //     } else {
    //         return element;
    //     }
    // });

    useEffect(() => {
        
        if(!inputedTag) return

        // const updatedElements = elements.map(element => {
        //     if (element.id === id) {
        //         return { id: id, tags: [...element.tags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'choosed'), color: inputedTag.color }] };
        //     } else {
        //         return element;
        //     }
        // });


        const updatedElements = elements.map(element => {
            if (element.id === id) {
                return { id: id, tags: [...choosedTags] };
            } else {
                return element;
            }
        });

        setElements(updatedElements) //setElements([...elements, { id: id, tags: [...choosedTags] }])
    }, [choosedTags])

    useEffect(() => {
        setCurrentIndex(elements.findIndex(element => element.id === id))
        console.log('CURRENT INDEX ', id);
        console.log(elements);
    }, [id])

    const [inputValue, setInputValue] = useState('');

    const searchedPosts = useMemo(() => {
        return reservedTags.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
    }, [reservedTags, inputValue]);

    const detectEauality = () => {
        if(!inputValue) return
        return !searchedPosts.some(item => item.name === inputValue)
    }

    const defineWidthOfTag = (inputValue: string, typeOfTag: string)  => {
        switch(typeOfTag) {
            case 'choosed':
                if(inputValue.length > 20 ) inputValue = inputValue.slice(0, 20) + '...'
                break
            case 'reserved':
                if(inputValue.length > 10 ) inputValue = inputValue.slice(0, 10) + '...'
                break
        }
        
        return inputValue
        //return inputValue.length * 10
    }

    // НАДО ТУТ ЮЗАНУТЬ MOBX ПО ЛЮБОМУ
    const [isScrollLocked, setScrollLocked] = useState(false);


    return (
        <div className='tags_editing_window'>
            <div className="tags_editing_window__choosed_tags">
                {choosedTags.map(item =>
                    <div
                     className='tags_editing_window__choosed_tags__item' 
                     key={item.id}
                     style={{ backgroundColor: item.color }}
                     >
                        <div 
                        className="tags_editing_window__choosed_tags__item__name"
                        >
                            {item.name}
                        </div>
                        <button 
                            className='cross_button'
                            onClick={() => setChoosedTags(choosedTags.filter(tag => tag.id !== item.id))} 
                            >
                            <img className='cross' src="/cross.svg" alt="coss" />
                        </button>
                    </div>)}
                <input
                    className='tags_editing_window__choosed_tags__input'
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
            </div>

            <button 
                disabled={!detectEauality()}
                className={`tags_editing_window__create_button ${detectEauality() ? 'active' : ''}`}
                onClick={() => {    
                    setInputedTag({ id: reservedTags.length + 1, name: inputValue, color: colors[Math.floor(Math.random() * colors.length)] })
                    // setReservedTags([...reservedTags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'reserved'), color: inputedTag.color }])
                    // setChoosedTags([...choosedTags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'choosed'), color: inputedTag.color }])
                    console.log(inputedTag);
                    setInputValue('')
                }}
            >
                <div className="plus_and_text">
                    <svg className='plus' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.18855 12.8V8.81136H3.19995V7.18855H7.18855V3.19995H8.81136V7.18855H12.8V8.81136H8.81136V12.8H7.18855Z" fill="#999999" />
                    </svg>

                    <div className='create_text'>Создать тег</div>
                </div>

            </button>
            <Reorder.Group className='list_of_tags' axis='y' values={searchedPosts} onReorder={setReservedTags}>
                {searchedPosts.map(item => <ExampleTagItem item={item} choosedTags={choosedTags} setChoosedTags={setChoosedTags} key={item.id} />)}
            </Reorder.Group>

            {/* {visible.visible && 
            <MyPopUpWindow visible={visible.visible} setVisible={visible.setVisible} position={positioner.position} singleTag={true}>
                <SingleTagEditingWindow />
            </MyPopUpWindow>} */}
        </div>
    );
})

