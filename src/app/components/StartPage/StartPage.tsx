// @flow 
'use client'

import { useState } from 'react';
//import { table } from "console";

import './startPage.scss'

type Props = {

};
export const StartPage = (props: Props) => {

    const [currentId, setCurrentId] = useState<number>(-1);

    //const [tags, setTags] = useState([]);

    const elements = [
        { id: 1, tags: [] },
        { id: 2, tags: [] },
        { id: 3, tags: [] },
        { id: 4, tags: [] },
        { id: 5, tags: [] },
        { id: 6, tags: [] },
    ];


    const addTag = () => {
        return (
            <button className='add_button'>
                <div className="plus_and_text">

                    <svg className='plus' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.18855 12.8V8.81136H3.19995V7.18855H7.18855V3.19995H8.81136V7.18855H12.8V8.81136H8.81136V12.8H7.18855Z" fill="#999999" />
                    </svg>

                    <div className='create_text'>Добавить тег</div>
                </div>
            </button>

        )
    }

    return (
        <div className="start_page">
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
                                onMouseEnter={() => setCurrentId(element.id)}
                                onMouseLeave={() => setCurrentId(-1)}
                            >
                                {currentId === element.id ? addTag() : <img src="/dash.svg" alt="dash" />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        

    );
};
