// @flow 
'use client'

import { useEffect, useState } from 'react';
import './singleTagEditingWindow.scss'
import { MyModal } from '../MyModal/MyModal';

import visible from '@/app/store/singleTagVisibility';
import singleTagData from "@/app/store/singleTagData";

type Props = {
    colors: string[]
};
export const SingleTagEditingWindow = ({ colors }: Props) => {

    const [currentColor, setCurrentColor] = useState('');

    const [inputValueSingleTag, setInputValueSingleTag] = useState('');

    useEffect(() => {
        if (visible.visible) {
            setCurrentColor(singleTagData.color);
            setInputValueSingleTag(singleTagData.input_value);
        }
    }, [visible.visible])

    useEffect(() => {
        singleTagData.setInputValue(inputValueSingleTag);
    }, [inputValueSingleTag])

    const [modal, setModal] = useState(false);

    const clickHandlerColor = (color: string) => {
        setCurrentColor(color);
        singleTagData.setColor(color);

    }

    return (
        <div
            className="single_tag_editing_window"
            onMouseLeave={() => visible.setVisible(false)}
        >
            <div className="name_input">
                <div className="inner_title">Имя</div>
                <input type="text" name="name" id="name" value={inputValueSingleTag} onChange={(e) => setInputValueSingleTag(e.target.value)} />
            </div>

            <div className="colors_panel">
                <div className="inner_title">Цвета</div>
                <div className="color_block">
                    {colors.map((color) => (
                        <button key={color} className="color" onClick={() => clickHandlerColor(color)} style={{ backgroundColor: color, outline: currentColor === color ? `2px solid ${color}` : '' }}></button>
                    ))}
                </div>
            </div>

            <button className="delete_tag" onClick={() => setModal(true)}>
                <div className="delete_tag__trashcan">
                    <img src="/trashcan.svg" alt="trashcan" />
                </div>
                <div className="delete_tag__text">Удалить тег</div>
            </button>

            <MyModal visible={modal} setVisible={setModal} >
                <div className="modal_content">
                    <h2>Удалить тег?</h2>
                    <div className="modal_buttons">
                        <button
                            className='delete_button'
                            onClick={() => {
                                singleTagData.setToDelete(true)
                                setModal(false)
                            }}
                        >
                            Удалить
                        </button>
                        <button
                            className='cancel_button'
                            onClick={() => setModal(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </MyModal>
        </div>
    );
};