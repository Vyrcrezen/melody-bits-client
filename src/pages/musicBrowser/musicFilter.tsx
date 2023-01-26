import React, { useReducer, useRef, useState } from "react";

// import 'normalize.css'
import { MusicCardData } from "../../models/musicCard";
import { VySlider } from "../components/slider";
import { SvgClose } from "../../media/svg/svgClose";
import { getTagList } from "../../util/functionalities/getTagList";
import { MusicFilterStates } from "../../models/musicFilterStates";
import { defaultLangData } from "../components/context/langContext";
import { ArrowAnimation } from "../components/complex/arrowAnimation";
import { ColumnOrderDirectionType, ColumnOrderNameType } from "../../util/functionalities/getMusic";

function tagsToJsx(tagList?: { id: string, name: string }[]) {
    const tagOptions = [];

    // tagOptions.push(<option className="d-none" selected disabled hidden value=''></option>);
    tagOptions.push(<option className="d-none" key={`${0}-`} disabled hidden value=''></option>);

    if (tagList) {
        tagOptions.push(...tagList.map((tag) => {
            return (
                <option key={`${tag.id}-${tag.name}`} value={tag.name}>{tag.name}</option>
            )
        }));
    }
    return tagOptions;
}

export function MusicFilter({ filterStates, vyAuthToken, musicFilterLang, setMusicData, changeFilterOpen }: { filterStates: React.MutableRefObject<MusicFilterStates>, vyAuthToken?: string, musicFilterLang: typeof defaultLangData.musicFilter, setMusicData: React.Dispatch<React.SetStateAction<MusicCardData[]>>, changeFilterOpen: React.DispatchWithoutAction }) {
    // Component refresh reducer
    const [, refreshComponent] = useReducer((refreshComponentBoolean) => {
        return !refreshComponentBoolean;
    }, false);


    // const [orderByTitle, setOrderByTitle] = useState<OrderByType>('none');
    // const [orderByRating, setOrderByRating] = useState<OrderByType>('none');
    // const [orderByUpTime, setOrderByUpTime] = useState<OrderByType>('none');
    // const [orderByPlays, setOrderByPlays] = useState<OrderByType>('none');
    // const [orderByUploader, setOrderByUploader] = useState<OrderByType>('none');

    const [orderBy, setOrderBy] = useState<{ name: ColumnOrderNameType, direction: ColumnOrderDirectionType }>();

    // Global tags and requesting them the first time
    const [allTags, setAllTags] = useState<{ id: string, name: string }[] | undefined>();

    if (!allTags) {
        getTagList()
            .then((result) => {
                if (result.data) { setAllTags(result.data); }
            })
            .catch(err => { });
    }

    // JSX button of the selected tags
    let tagListJsx = filterStates.current.getTagList().map(tag => {
        const classNames = `d-inline-block btn fs-small mb-1 py-1 px-2 rounded-pill vy-secondary-bg vy-tag-text`

        return (
            <button
                className={classNames}
                id={`${tag.id}-${tag.name}`}
                key={`${tag.id}-${tag.name}`}
                type="button"
                onClick={() => {
                    filterStates.current.removeTagValue(tag);
                    filterStates.current.triggerFilteredRequest(vyAuthToken);
                    refreshComponent();
                }}>
                {tag.name}
            </button>
        );
    })

    const onClickArrowAnimation = (orderByColumn: ColumnOrderNameType, orderByDirection: ColumnOrderDirectionType) => {
        if (orderBy?.name !== name && orderBy?.direction !== orderByDirection) {
            filterStates.current.setOrderBy({ orderByColumn: orderByColumn, orderByDirection: orderByDirection }); 
            setOrderBy({ name: orderByColumn, direction: orderByDirection });
            filterStates.current.triggerFilteredRequest(vyAuthToken);
        }
        else {
            filterStates.current.setOrderBy({}); 
            setOrderBy(undefined);
            filterStates.current.triggerFilteredRequest(vyAuthToken);
        }
    }

    return (
        <div className="music-filter vy-primary-bg rounded mt-lg-3 me-lg-2 p-2 pb-4">
            <div className="d-flex flex-row justify-content-between filter-element mb-3">
                <div className="ms-2 fs-3 fw-bold text-center">{musicFilterLang.orderBy}</div>
                <SvgClose classNames='fs-3 p-1 me-2 rounded lang-icon-size vy-bright w-auto vy-fill-bright vy-clickable' height="100%" onClick={() => { if (changeFilterOpen) changeFilterOpen(); }} />
            </div>

            <div className="text-start container fs-5" >
                <div className="row g-1 filter-element">
                    <div className="col-6">{musicFilterLang.title}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('title', 'ASC'), isSelected: orderBy?.name === 'title' && orderBy.direction === 'ASC' })}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('title', 'DESC'), isSelected: orderBy?.name === 'title' && orderBy.direction === 'DESC', pointsDown: true })}</div>
                </div>
                <div className="row g-1 filter-element">
                    <div className="col-6">{musicFilterLang.rating}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('avg_rating', 'ASC'), isSelected: orderBy?.name === 'avg_rating' && orderBy.direction === 'ASC' })}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('avg_rating', 'DESC'), isSelected: orderBy?.name === 'avg_rating' && orderBy.direction === 'DESC', pointsDown: true })}</div>
                </div>
                <div className="row g-1 filter-element">
                    <div className="col-6">{musicFilterLang.uploadTime}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('created_at', 'ASC'), isSelected: orderBy?.name === 'created_at' && orderBy.direction === 'ASC' })}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('created_at', 'DESC'), isSelected: orderBy?.name === 'created_at' && orderBy.direction === 'DESC', pointsDown: true })}</div>
                </div>
                <div className="row g-1 filter-element">
                    <div className="col-6">{musicFilterLang.plays}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('num_played', 'ASC'), isSelected: orderBy?.name === 'num_played' && orderBy.direction === 'ASC' })}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () => onClickArrowAnimation('num_played', 'DESC'), isSelected: orderBy?.name === 'num_played' && orderBy.direction === 'DESC', pointsDown: true })}</div>
                </div>
                <div className="row g-1 filter-element">
                    <div className="col-6">{musicFilterLang.uploader}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () =>  onClickArrowAnimation('uploader_name', 'ASC'), isSelected: orderBy?.name === 'uploader_name' && orderBy.direction === 'ASC' })}</div>
                    <div className="col-3">{ArrowAnimation({ onClick: () =>  onClickArrowAnimation('uploader_name', 'DESC'), isSelected: orderBy?.name === 'uploader_name' && orderBy.direction === 'DESC', pointsDown: true })}</div>
                </div>
            </div>

            <div className="ms-2 mt-3 mb-2 fs-3 fw-bold text-start filter-element">{musicFilterLang.filter}</div>

            <div className="d-flex flex-column pb-3 filter-element">
                <div>{musicFilterLang.title}</div>
                <input placeholder={musicFilterLang.titlePlaceholder}
                    type="text"
                    name="musicTitle"
                    id=""
                    onInput={
                        (event) => {
                            filterStates.current.setMusicTitle(event.currentTarget.value);
                            filterStates.current.triggerFilteredRequest(vyAuthToken);
                        }
                    } />
            </div>

            <div className="d-flex flex-column pb-3 filter-element">
                <div>{musicFilterLang.uploader}</div>
                <input
                    placeholder={musicFilterLang.uploaderPlaceholder}
                    type="text"
                    name="uploaderName"
                    id=""
                    onInput={(event) => {
                        filterStates.current.setUploadName(event.currentTarget.value);
                        filterStates.current.triggerFilteredRequest(vyAuthToken);
                    }} />
            </div>

            <div className="d-flex flex-column pb-3 filter-element">
                <div>{musicFilterLang.tags}</div>

                <select defaultValue={''} name="tags" onChange={(event) => {
                    filterStates.current.addTagValue({ name: event.currentTarget.value });
                    filterStates.current.triggerFilteredRequest(vyAuthToken);
                    event.currentTarget.selectedIndex = -1;
                    refreshComponent();
                }} >
                    {tagsToJsx(allTags)}
                </select>

                <div className="my-2">{tagListJsx}</div>
            </div>
{/* 
            <div className="d-flex flex-column mt-3 filter-element">
                <div className="mx-2">
                    {VySlider({
                        Options: {
                            isDoubleSlider: true, showSliderBoundaries: true, showCurrentValue: true, dragDefaultHidden: false, isContinuous: true, values: [0, 50, 100, 150, 200, 2500], onChange: (newValue) => {
                                console.log(newValue);
                            }
                        }
                    })}
                </div>
            </div>

            <div className="d-flex flex-column mt-3 filter-element">
                <div className="mx-2">
                    {VySlider({
                        Options: {
                            isDoubleSlider: true, showCurrentValue: true, dragDefaultHidden: true, isContinuous: false, values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], onChange: (newValue) => {
                                console.log(newValue);
                            }
                        }
                    })}
                </div>
            </div>

            <div className="d-flex flex-column mt-3 filter-element">
                <div className="mx-2">
                    {VySlider({
                        Options: {
                            isDoubleSlider: false, showSliderBoundaries: true, showCurrentValue: true, dragDefaultHidden: true, isContinuous: false, values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], onChange: (newValue) => {
                                console.log(newValue);
                            }
                        }
                    })}
                </div>
            </div> */}

        </div>
    );
}

// // queryObject and its reducer function
// type QueryObjectAction = {
//     target: string,
//     value: string
// }

// const queryObjectReducer: Reducer<FilterObject, QueryObjectAction> = (filter: FilterObject, action: QueryObjectAction) => {
//     // Update the filter values
//     switch (action.target) {
//         case 'musicTitle':
//             filter.musicTitle = action.value;
//             filter.queryImminent = true;
//         break;
//         case 'uploaderName':
//             filter.uploaderName = action.value;
//             filter.queryImminent = true;
//         break;
//         case 'tags':
//             let elementIndex: number | undefined;

//             // If tag is already selected
//             if (Array.isArray(filter.tags) ) {
//                 filter.tags.find((tag, index) => {
//                     if (tag.name === action.value) {
//                         elementIndex = index;
//                         return true;
//                     }
//                     return false;
//                 })
//             }

//             if (elementIndex !== undefined) {
//                 filter.tags?.splice(elementIndex, 1);
//             }
//             //  Else, add the tag
//             else {
//                 filter = { ...filter, tags: [...(filter?.tags ? filter?.tags : []), { name: action.value, id: "1" }] };
//             }
//             filter.queryImminent = true;
//         break;
//     }
//     return filter;
// }
// let [queryObject, setQueryObject] = useReducer(queryObjectReducer, { queryImminent: false });


    // // If the reducer changed the filter object
    // if (queryObject.queryImminent) {
    //     queryObject.queryImminent = false;

    //     // Set a timeout for the music query
    //     if (!timeoutStarted.current) {
    //         timeoutStarted.current = true;

    //         const timeoutFunc = () => {
    //             if (timeoutEnd.current > new Date().getTime()) {
    //                 setTimeout(timeoutFunc, 1000);
    //             }
    //             else {
    //                 timeoutStarted.current = false;
    //                 getMusic({ Options: {
    //                     musicTitle: queryObject.musicTitle,
    //                     tags: { values: queryObject.tags},
    //                     uploaderName: queryObject.uploaderName
    //                 } })
    //                     .then((result) => {
    //                         if (result.data) {
    //                             setMusicData(result.data);
    //                         }
    //                     })
    //                     .catch((err) => {
    //                         console.log(err);
    //                     });
    //             }
    //         }
    //         setTimeout(timeoutFunc, 1000);
    //     }
    //     else {
    //         timeoutEnd.current = new Date().getTime() + 2000;
    //     }
    // }