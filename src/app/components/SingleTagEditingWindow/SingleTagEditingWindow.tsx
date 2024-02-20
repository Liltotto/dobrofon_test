// @flow 

import './singleTagEditingWindow.scss'

type Props = {

};
export const SingleTagEditingWindow = (props: Props) => {
    return (
        <div className="single_tag_editing_window">
            <div className="name_input">
                <div className="inner_title">Имя</div>
                <input type="text" name="name" id="name" />
            </div>

            <div className="colors_panel">
                <div className="inner_title">Цвета</div>
                <div className="color_block"></div>
            </div>

            <button className="delete_tag">
                <div className="delete_tag__trashcan">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.40513 13.2664C5.10931 13.2664 4.85673 13.1617 4.64737 12.9524C4.43801 12.743 4.33333 12.4904 4.33333 12.1946V4.39978H3.53333V3.53312H6.39998V2.81006H9.59998V3.53312H12.4666V4.39978H11.6666V12.1874C11.6666 12.4956 11.563 12.7525 11.3558 12.9581C11.1486 13.1636 10.8949 13.2664 10.5948 13.2664H5.40513ZM10.8 4.39978H5.19998V12.1946C5.19998 12.2545 5.21921 12.3036 5.25768 12.3421C5.29614 12.3805 5.34529 12.3998 5.40513 12.3998H10.5948C10.6461 12.3998 10.6931 12.3784 10.7359 12.3357C10.7786 12.2929 10.8 12.2459 10.8 12.1946V4.39978ZM6.66923 11.1998H7.53588V5.59978H6.66923V11.1998ZM8.46408 11.1998H9.33072V5.59978H8.46408V11.1998Z" fill="#E33D3E" />
                    </svg>

                </div>
                <div className="delete_tag__text">Удалить тег</div>
            </button>
        </div>
    );
};