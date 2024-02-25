// @flow 

'use client'

import { Reorder } from 'framer-motion';


import './tagsEditingWindow.scss'
import { useEffect, useMemo, useState } from 'react';
//import { SixDotsIcon } from '../UI/SixDots/SixDotsIcon';
import { ExampleTagItem } from '../ExampleTagItem/ExampleTagItem';

import visible from '@/app/store/singleTagVisibility';
import positioner from '@/app/store/singleTagPosition';
import singleTagData from '@/app/store/singleTagData';

import { MyPopUpWindow } from '../MyPopUpWindow/MyPopUpWindow';
import { SingleTagEditingWindow } from '../SingleTagEditingWindow/SingleTagEditingWindow';
import { observer } from 'mobx-react';
import { reverse } from 'dns';


type Props = {
    colors: string[],
    id: number,
    elements: { id: number, tags: { id: number, name: string, color: string }[] }[],
    setElements: (arg0: { id: number, tags: { id: number, name: string, color: string }[] }[]) => void
};



export const TagsEditingWindow = observer(({ colors, id, elements, setElements }: Props) => {


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

    const [inputedTag, setInputedTag] = useState<{ id: number, name: string, color: string }>();

    const [currentIndex, setCurrentIndex] = useState<number>(-1);


    useEffect(() => {
        const updatedReservedTags = reservedTags.map(tag => {
            if (tag.id === singleTagData.id) {
                return { id: tag.id, name: defineWidthOfTag(singleTagData.input_value, 'reserved'), color: singleTagData.color };
            } else {
                return tag;
            }
        });

        setReservedTags(updatedReservedTags)

    }, [singleTagData.color, singleTagData.id, singleTagData.input_value])

    useEffect(() => {
        const updatedElements = elements.map(element => {
            if (element.id === id) {
                let elementTags = element.tags;
                let updatedTags: { id: number, name: string, color: string }[] = [];
                let orderOfTags: number[] = []
                for (const reservedTag of reservedTags) {
                    const isTagAlreadyPresent = elementTags.some((tag, i) => {
                        if (tag.id === reservedTag.id) {
                            orderOfTags.push(i)
                        }
                        return tag.id === reservedTag.id
                    });
                    if (isTagAlreadyPresent) {
                        updatedTags = [...updatedTags, { id: reservedTag.id, name: defineWidthOfTag(reservedTag.name, 'choosed'), color: reservedTag.color }];
                    }
                }

                const indexedElements = orderOfTags.map((index, i) => ({ index, element: updatedTags[i] }));
                indexedElements.sort((a, b) => a.index - b.index);
                const sortedTags = indexedElements.map(item => item.element);
                const finalSortedElements = sortedTags.filter(element => element !== undefined);

                return { id: element.id, tags: [...finalSortedElements] };
            } else {
                let elementTags = element.tags;
                let updatedTags: { id: number, name: string, color: string }[] = [];
                let orderOfTags: number[] = []
                for (const reservedTag of reservedTags) {
                    const isTagAlreadyPresent = elementTags.some((tag, i) => {
                        if (tag.id === reservedTag.id) {
                            orderOfTags.push(i)
                        }
                        return tag.id === reservedTag.id
                    });
                    if (isTagAlreadyPresent) {
                        updatedTags = [...updatedTags, { id: reservedTag.id, name: defineWidthOfTag(reservedTag.name, 'choosed'), color: reservedTag.color }];
                    }
                }

                const indexedElements = orderOfTags.map((index, i) => ({ index, element: updatedTags[i] }));
                indexedElements.sort((a, b) => a.index - b.index);
                const sortedTags = indexedElements.map(item => item.element);
                const finalSortedElements = sortedTags.filter(element => element !== undefined);

                return { id: element.id, tags: [...finalSortedElements] };
            }
        });

        setElements(updatedElements);
    }, [reservedTags]);

    useEffect(() => {
        if (singleTagData.toDelete) {
            setReservedTags(reservedTags.filter(tag => tag.id !== singleTagData.id))
        }

        singleTagData.setToDelete(false)
    }, [singleTagData.toDelete])

    useEffect(() => {
        console.log(inputValue);
        if (!inputedTag) return
        setReservedTags([...reservedTags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'reserved'), color: inputedTag.color }])


        const updatedElements = elements.map(element => {
            if (element.id === id) {
                return { id: id, tags: [...element.tags, { id: inputedTag.id, name: defineWidthOfTag(inputedTag.name, 'choosed'), color: inputedTag.color }] };
            } else {
                return element;
            }
        });

        setElements(updatedElements);
    }, [inputedTag])

    const deleteElements = (itemId: number) => {

        const updatedElements = elements.map(element => {
            if (element.id === id) {

                return { id: id, tags: [...element.tags.filter(tag => tag.id !== itemId)] };
            } else {
                return element;
            }
        });

        setElements(updatedElements)
    }

    useEffect(() => {
        setCurrentIndex(elements.findIndex(element => element.id === id))
    }, [id])

    const [inputValue, setInputValue] = useState('');

    const searchedPosts = useMemo(() => {
        return reservedTags.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));
    }, [reservedTags, inputValue]);

    const detectEauality = () => {
        if (!inputValue) return
        return !searchedPosts.some(item => item.name === inputValue)
    }

    const defineWidthOfTag = (inputValue: string, typeOfTag: string) => {
        switch (typeOfTag) {
            case 'choosed':
                if (inputValue.length > 13) inputValue = inputValue.slice(0, 13) + '...'
                break
            case 'reserved':
                if (inputValue.length > 10) inputValue = inputValue.slice(0, 10) + '...'
                break
        }

        return inputValue
    }

    return (
        <div className='tags_editing_window'>
            <div className="tags_editing_window__choosed_tags">
                {elements[currentIndex]?.tags.map(item =>
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
                            onClick={() => {
                                deleteElements(item.id)
                            }}
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
                    setTimeout(() => {
                        setInputedTag({ id: reservedTags.length + 1, name: inputValue, color: colors[Math.floor(Math.random() * colors.length)] })
                        setInputValue('')
                    }, 0)
                    
                   
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
                {searchedPosts.map(item => <ExampleTagItem item={item} currentIndex={currentIndex} elements={elements} setElements={setElements} id={id} key={item.id} inputValue={inputValue} />)}
            </Reorder.Group>
        </div>
    );
})

