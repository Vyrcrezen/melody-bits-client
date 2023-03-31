import React from "react";
// import { initMusicDeck } from "../musicDeck/deckComponent";

import { TagButton } from './mb-tagBtn_DEPRECATED';

// initMusicDeck("music-deck", )

export function MusicTags({ tags, selectedTagList, tagRelation }: { tags: {name: string, id: number}[], selectedTagList: { get: string[], set: React.Dispatch<React.SetStateAction<string[]>> }, tagRelation: { get: string, set: React.Dispatch<React.SetStateAction<string>> } }) {

    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="d-flex flex-row">
                <button type="button" className="btn" onClick={() => { tagRelation.set((tagRelation.get.match(/and/i)) ? 'OR' : 'AND'); }}>{tagRelation.get}</button>
                <div className="dropdown">
                    <button className="btn dropdown-toggle vy-secondary-bg" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tags
                    </button>
                    <ul className="dropdown-menu" style={{ width: '10rem', height: '20rem', overflow: 'auto' }}>
                        {tags.map((tagItem) => <li key={`${tagItem.name}-${tagItem.id}-ditem`}><TagButton tagName={tagItem.name} uniqueId={`${tagItem.name}-${tagItem.id}-ditem`} selectedTagList={selectedTagList} options={{ dropdownItem: true }} /></li>)}
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-row">
                <ul className="d-flex flex-wrap w-100 p-1 m-1">
                    {tags.reduce((btnArray, tagItem) => {
                        if (selectedTagList.get.includes(tagItem.name)) {

                            btnArray.push(<li key={`${tagItem.name}-${tagItem.id}-sel`}><TagButton tagName={tagItem.name} uniqueId={`${tagItem.name}-${tagItem.id}-sel`} selectedTagList={selectedTagList} options={{ styled: true }} /></li>);
                        }

                        return btnArray;
                    }, new Array<JSX.Element>)}
                </ul>
            </div>
        </div>
    );
}
