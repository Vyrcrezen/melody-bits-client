import React, { useContext, useReducer, useRef, useState } from "react";
import { MusicCardData } from "../../models/musicCard";
import { EnvVariables } from '../../env';

import { MusicFilter } from "./musicFilter";
import { getAuthData } from "../../util/functionalities/opAuthData";
import { MinimizedPanelBar } from "../components/complex/minimizedPanelBar";
import { VyBtn } from "../components/base/vyClickable";
import { MusicCard } from "../components/musicDeck/cardElement";
import { getMusic } from "../../util/functionalities/getMusic";
import _ from "lodash";
import { defaultLangData, LangDataContext } from "../components/context/langContext";
import { VyPagination } from "../components/complex/pagination";
import { MusicPaginationType } from "../login/reqSuccessTypes";
import { MusicFilterStates } from "../../models/musicFilterStates";

export function BrowserSection() {
    const [needNewMusicList, setNeedNewMusicList] = useState(true);
    const [musicData, setMusicData] = useState(new Array<MusicCardData>);
    const [musicPagination, setMusicPagination] = useState<MusicPaginationType>();

    const filterStates = useRef(new MusicFilterStates(1000, (result) => {
        if (result.data && result.data.musicData) {
            setMusicPagination(result.data.paginationData);
            setMusicData(result.data.musicData);
        }
    }));

    const [filterOpen, changeFilterOpen] = useReducer((filterOpen) => {
        return !filterOpen;
    }, true);

    const { token: vyAuthToken } = getAuthData() || {};

    const { musicCard: musicCardLang, musicFilter: musicFilterLang } = _.merge({}, defaultLangData, useContext(LangDataContext));

    if (needNewMusicList) {
        getMusic({ authToken: vyAuthToken })
        .then((result) => {
            if (result.data && result.data.musicData && result.data.paginationData) {
                setMusicPagination(result.data.paginationData);
                setMusicData(musicData.concat(result.data.musicData));
                setNeedNewMusicList(false);
            }
        })
        .catch(err => {})
    }

    const musicDeck = new Array<JSX.Element>;
    musicData.forEach(data => {
        musicDeck.push(
            <div key={data.id} className=''>
                <MusicCard  musicData={data} authToken={vyAuthToken} />
            </div>
        );
    });

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center p-0 mb-0 w-100">
            <div className="w-100 mt-2 d-flex flew-direction-row">
                {
                    filterOpen
                        ? <MusicFilter filterStates={filterStates} vyAuthToken={vyAuthToken} musicFilterLang={musicFilterLang} setMusicData={setMusicData} changeFilterOpen={changeFilterOpen} />
                        : null
                }
                <div className="d-flex flex-column flex-fill">
                    {
                        filterOpen
                            ? null
                            : <div className="mb-2">
                                <MinimizedPanelBar buttons={[
                                    <VyBtn key={'mini-bar-nav-btn'} btnText="Filters" onClick={() => { changeFilterOpen(); }} />
                                ]} />
                            </div>
                    }
                    <div className='d-flex flew-direction-row flex-wrap justify-content-evenly'>
                        {musicDeck}
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <VyPagination musicPagination={musicPagination} filterStates={filterStates} vyAuthToken={vyAuthToken} />
            </div>
        </div>
    );
}
