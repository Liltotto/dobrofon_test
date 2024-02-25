// @flow 
'use client'

import { MouseEvent, useEffect, useRef, useState } from 'react';
//import { table } from "console";
import { MyPopUpWindow } from '../MyPopUpWindow/MyPopUpWindow';

import visibleSinleTag from "@/app/store/singleTagVisibility";
import positioner from "@/app/store/singleTagPosition";

import './startPage.scss'
import { TagsEditingWindow } from '../TagsEditingWindow/TagsEditingWindow';
import { observer } from 'mobx-react';
import { SingleTagEditingWindow } from '../SingleTagEditingWindow/SingleTagEditingWindow';



type Props = {

};
export const StartPage = observer((props: Props) => {

    const [currentId, setCurrentId] = useState<number>(-1);

    const [visible, setVisible] = useState<boolean>(false);

    //const [visibleSingleTag, setVisibleSingleTag] = useState<boolean>(false);

    const [popupPosition, setPopupPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const colors = [' rgb(244, 98, 98)', 'rgb(252, 148, 74)', 'rgb(250, 208, 56)', 'rgb(71, 209, 124)', 'rgb(76, 178, 229)', 'rgb(110, 133, 247)', 'rgb(196, 125, 232)', 'rgb(153, 153, 153)'];

    //const [tags, setTags] = useState([]);

    const [elements, setElements] = useState<{ id: number, tags: { id: number, name: string, color: string }[] }[]>([
        { id: 1, tags: [] },
        { id: 2, tags: [] },
        { id: 3, tags: [] },
        { id: 4, tags: [] },
        { id: 5, tags: [] },
    ]);

    const clickHandlerAddButton = (e: MouseEvent) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        setPopupPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });
        setVisible(true)
    }


    const addTagRef = useRef<HTMLButtonElement>(null)
    //const [visibleSingleTag, setVisibleSingleTag] = useState<boolean>(false);

    // useEffect(() => {
    //     if(addTagRef.current && visible) {
    //         const rect = addTagRef.current.getBoundingClientRect();
    //         positioner.setPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY });
    //         //visible.setVisible(true)
    //     }



    // }, [visible])

    const addTag = () => {
        return (
            <button
                className='add_button'
                onClick={clickHandlerAddButton}
                ref={addTagRef}
            >
                <div className="plus_and_text">

                    <svg className='plus' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.18855 12.8V8.81136H3.19995V7.18855H7.18855V3.19995H8.81136V7.18855H12.8V8.81136H8.81136V12.8H7.18855Z" fill="#999999" />
                    </svg>

                    <div className='create_text'>Добавить тег</div>
                </div>
            </button>

        )
    }

    const TagsList = (tags: { id: number, name: string, color: string }[]) => {

        // const currentIndex = elements.findIndex(element => element.id === currentId); // Find the index of the elements.

        console.log(tags);

        return (
            <div className='tags_list'>
                <div
                    className="tag_name"
                    style={{ backgroundColor: tags[tags.length - 1].color }}
                    >
                    {tags[tags.length - 1].name}
                </div>

                <div className="tags_list__remaining">
                    +{tags.length - 1}
                </div>

            </div>
        )
    }



    return (
        <div className="start_page" onClick={() => {
            setCurrentId(-1)
            visibleSinleTag.setVisible(false)
            setVisible(false)
        }}>
            <h1 className="title">Работа с тегами</h1>
            <div className="tags_table_wrapper">
                <table className="tags_table">
                    <thead>
                        <tr>
                            <th className='id_th'>ID</th>
                            <th className='tags_th'>Теги</th>
                            <th>Пустая колонка</th>
                        </tr>
                    </thead>

                    <tbody>
                        {elements.map((element) => (
                            <tr key={element.id}>
                                <td className='id_td'>{element.id}</td>
                                <td className='tags_td'
                                    onMouseEnter={() => {
                                        if (!visible) setCurrentId(element.id)
                                    }}
                                    onMouseLeave={() => {
                                        if (visible) return
                                        setCurrentId(-1)
                                    }}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    {currentId === element.id ? addTag() : element.tags.length ? TagsList(element.tags) : <img src="/dash.svg" alt="dash" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <MyPopUpWindow visible={visible} setVisible={setVisible} position={popupPosition}>
                <TagsEditingWindow id={currentId} colors={colors} setElements={setElements} elements={elements} />
            </MyPopUpWindow>


            <MyPopUpWindow visible={visibleSinleTag.visible} setVisible={visibleSinleTag.setVisible} position={positioner.position} singleTag={true}>
                <SingleTagEditingWindow colors={colors} />
            </MyPopUpWindow>
        </div>


    );
});
