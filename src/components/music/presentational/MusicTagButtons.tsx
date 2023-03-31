import React from "react";
import { MusicCardData, NameTable } from "../../../models/musicCard";
import VyButton from "../../shared/presentational/VyButton";

export default function MusicTagButtons({ tags, reactKey, onTagClick, activeTags }: {
    tags: MusicCardData["tags"],
    reactKey: string,
    onTagClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tagItem: NameTable) => void,
    activeTags?: NameTable[]
}) {

    return (
        <div id="mcard-template-tags" className="card-body p-1 my-1 vy-tag-container">
            {tags.map((tagItem, index) => VyButton({
                btnText: tagItem.name,
                // onClick: onClick ?? function() { redirectToTagSearch([tagItem.id]); },
                onClick: (event) => {
                    if (onTagClick) {
                        onTagClick(event, tagItem);
                    }
                },
                Options: {
                    border: false,
                    isPill: true,
                    backgroundColor: `${activeTags && activeTags.find(item => item.name === tagItem.name) ? 'vy-bg-selection' : 'vy-bg-secondary'}`,
                    moreClassNames: 'fs-small me-1 mb-1',
                    reactKey: `${reactKey}-${index}`
                }
            }) )}
        </div>
    );
}
