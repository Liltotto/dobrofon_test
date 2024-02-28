// @flow 

import './tagListPopup.scss'

type Props = {
    tags: { id: number, name: string, color: string }[]
};
export const TagListPopup = ({ tags }: Props) => {
    return (
        <div className="tagListPopup">
            {tags.map(tag => 
            <div className="tag_name popup_list" style={{ backgroundColor: tag.color }} key={tag.id}>
                {tag.name}
            </div>)}
        </div>
    );
};