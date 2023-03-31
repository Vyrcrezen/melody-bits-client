import React, { useReducer, useState } from "react";

import { MusicCardData } from "../../../models/musicCard";
import { SvgClose } from "../../../media/svg/svgClose";
import { getTagList } from "../../../util/functionalities/getTagList";
import { MusicFilterStates } from "../model/musicFilterStates";
import { defaultLangData } from "../../../context/langContext";
import MusicTagButtons from "../presentational/MusicTagButtons";
import MusicFilterOrderings from "../presentational/MusicFilterOrderings";
import VyTextInput from "../../shared/presentational/VyTextInput";
import VyPlainDropdown from "../../shared/presentational/VyPlainDropdown";
import { ColumnOrderDirectionType, ColumnOrderNameType } from "../../../util/functionalities/getMusic";

export function MusicFilter({ filterStates, vyAuthToken, musicFilterLang, changeFilterOpen }: {
    filterStates: React.MutableRefObject<MusicFilterStates>,
    vyAuthToken?: string,
    musicFilterLang: typeof defaultLangData.musicFilter,
    setMusicData: React.Dispatch<React.SetStateAction<MusicCardData[]>>,
    changeFilterOpen: React.DispatchWithoutAction
}) {
    // Component refresh reducer
    const [, refreshComponent] = useReducer((refreshComponentBoolean) => {
        return !refreshComponentBoolean;
    }, false);

    // Global tags and requesting them the first time
    const [allTags, setAllTags] = useState<{ id: string, name: string }[] | undefined>();

    if (!allTags) {
        getTagList()
            .then((result) => {
                if (result.data) { setAllTags(result.data); }
            })
            .catch(err => { });
    }

    return (
        <div className="music-filter vy-primary-bg rounded mt-lg-3 me-lg-2 p-2 pb-4">
            <div className="d-flex flex-row justify-content-between filter-element mb-3">
                <div className="ms-2 fs-3 fw-bold text-center">{musicFilterLang.orderBy}</div>
                <SvgClose classNames='fs-3 p-1 me-2 rounded lang-icon-size vy-bright w-auto vy-fill-bright vy-clickable' height="100%" onClick={() => { if (changeFilterOpen) changeFilterOpen(); }} />
            </div>

            <MusicFilterOrderings
                    musicFilterLang={musicFilterLang}
                    filterStates={filterStates}
                    onClickHandler={
                        (name: ColumnOrderNameType, direction: ColumnOrderDirectionType) => {
                            filterStates.current.changeMusicOrdering(name, direction, vyAuthToken);
                        }
                    }
                    selectedOrdering={{
                        name: filterStates.current.filterOptions.orderByColumn,
                        direction: filterStates.current.filterOptions.orderByDirection
                    }}
                />

            <div className="ms-2 mt-3 mb-2 fs-3 fw-bold text-start filter-element">{musicFilterLang.filter}</div>

            <div className="d-flex flex-column pb-3 filter-element">
                <VyTextInput
                    inputLabel={musicFilterLang.title}
                    inputName='musicTitle'
                    type='text'
                    className="w-100"
                    placeholder={musicFilterLang.titlePlaceholder}
                    onInput={(event) => {
                        filterStates.current.setMusicTitle(event.currentTarget.value);
                        filterStates.current.triggerFilteredRequest(vyAuthToken);
                    }}
                />
            </div>

            <div className="d-flex flex-column pb-3 filter-element">
                <VyTextInput
                    inputLabel={musicFilterLang.uploader}
                    inputName='uploaderName'
                    type='text'
                    className="w-100"
                    placeholder={musicFilterLang.uploaderPlaceholder}
                    onInput={(event) => {
                        filterStates.current.setUploadName(event.currentTarget.value);
                        filterStates.current.triggerFilteredRequest(vyAuthToken);
                    }}
                />
            </div>

            <div className="d-flex flex-column pb-3 filter-element">

                <VyPlainDropdown
                    itemList={(allTags ?? []).map((tag) => {
                        return {
                            key: `filter-${tag.id}-${tag.name}`,
                            value: tag.name,
                            name: tag.name
                        }
                    })}
                    Options={{
                        label: musicFilterLang.tags,
                        name: 'tags',
                        defaultValue: '',
                        onChange: (event) => {
                            filterStates.current.addTagValue({ name: event.currentTarget.value, id: 1 });
                            filterStates.current.triggerFilteredRequest(vyAuthToken);
                            event.currentTarget.selectedIndex = -1;
                            refreshComponent();
                        }
                    }}
                />

                <div className="my-2">
                    <MusicTagButtons
                        tags={filterStates.current.getTagList()}
                        reactKey='filter'
                        onTagClick={function(_event, tagItem) {
                            filterStates.current.removeTagValue({ name: tagItem.name });
                            filterStates.current.triggerFilteredRequest(vyAuthToken);
                            refreshComponent();
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
