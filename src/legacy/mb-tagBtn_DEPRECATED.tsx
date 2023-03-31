import React from "react";

export function TagButton({ tagName, uniqueId, selectedTagList, options }: { tagName: string, uniqueId: string, selectedTagList: { get: string[], set: React.Dispatch<React.SetStateAction<string[]>> }, options?: {styled?: boolean, dropdownItem?: boolean} }) {

    const classNames = `${(options?.dropdownItem) ? 'dropdown-item ': ''}d-inline-block btn fs-small mb-1 py-1 px-2${(options?.styled) ? ' rounded-pill vy-secondary-bg': ''} vy-tag-text${ (selectedTagList.get.includes(tagName)) ? ' vy-selected' : '' }`

    return (
        <button
            className={classNames}
            id={`${uniqueId}`}
            type="button"
            onClick={() => {
                const tageNameIndex = selectedTagList.get.indexOf(tagName);
                if(tageNameIndex >= 0) {
                    const splicedArray = JSON.parse(JSON.stringify(selectedTagList.get));
                    splicedArray.splice(tageNameIndex, 1);
                    selectedTagList.set(splicedArray);
                }
                else {
                    selectedTagList.set(selectedTagList.get.concat([tagName]));
                }
            }}>
            {tagName}
        </button>
    );
}
