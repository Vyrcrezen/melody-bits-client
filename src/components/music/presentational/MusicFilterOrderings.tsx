import React from "react";
import { defaultLangData } from "../../../context/langContext";
import { ColumnOrderDirectionType, ColumnOrderNameType } from "../../../util/functionalities/getMusic";
import { ArrowAnimation } from "../../shared/container/arrowAnimation";
import { MusicFilterStates } from "../model/musicFilterStates";

function FilterOrderLine({name, langTitle, onClickHandler, selectedOrdering }: {
    name: ColumnOrderNameType,
    langTitle: string,
    filterStates: React.MutableRefObject<MusicFilterStates>,
    onClickHandler: (name: ColumnOrderNameType, direction: ColumnOrderDirectionType) => void,
    selectedOrdering?: { name?: ColumnOrderNameType, direction?: ColumnOrderDirectionType }
}) {
    return (
        <div className="row g-1 filter-element">
            <div className="col-6">{langTitle}</div>
            <div className="col-3">{ArrowAnimation({ onClick: () => onClickHandler(name, 'ASC'), isSelected: selectedOrdering?.name === name && selectedOrdering?.direction === 'ASC' })}</div>
            <div className="col-3">{ArrowAnimation({ onClick: () => onClickHandler(name, 'DESC'), isSelected: selectedOrdering?.name === name && selectedOrdering?.direction === 'DESC', pointsDown: true })}</div>
        </div>
    );
}

export default function MusicFilterOrderings({musicFilterLang, filterStates, onClickHandler, selectedOrdering}: {
    musicFilterLang: typeof defaultLangData.musicFilter,
    filterStates: React.MutableRefObject<MusicFilterStates>,
    onClickHandler: (name: ColumnOrderNameType, direction: ColumnOrderDirectionType) => void,
    selectedOrdering?: { name?: ColumnOrderNameType, direction?: ColumnOrderDirectionType }
}) {
    return (
        <div className="text-start container fs-5" >
            <FilterOrderLine name='title' langTitle={musicFilterLang.title} filterStates={filterStates} onClickHandler={onClickHandler} selectedOrdering={selectedOrdering} />
            <FilterOrderLine name='avg_rating' langTitle={musicFilterLang.rating} filterStates={filterStates} onClickHandler={onClickHandler} selectedOrdering={selectedOrdering} />
            <FilterOrderLine name='created_at' langTitle={musicFilterLang.uploadTime} filterStates={filterStates} onClickHandler={onClickHandler} selectedOrdering={selectedOrdering} />
            <FilterOrderLine name='num_played' langTitle={musicFilterLang.plays} filterStates={filterStates} onClickHandler={onClickHandler} selectedOrdering={selectedOrdering} />
            <FilterOrderLine name='uploader_name' langTitle={musicFilterLang.uploader} filterStates={filterStates} onClickHandler={onClickHandler} selectedOrdering={selectedOrdering} />
        </div>
    );
}
