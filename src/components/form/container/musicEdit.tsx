import _ from "lodash";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { MusicCardData } from "../../../models/musicCard";
import { getHrefMusicId } from "../../../util/functionalities/getHrefMusicId";
import { getMusic } from "../../../util/functionalities/getMusic";
import { getProfileId } from "../../../util/functionalities/getProfileId";
import { getAuthData } from "../../../util/functionalities/opAuthData";
import { getProfileData, ProfileData } from "../../../util/functionalities/opProfileData";
import { VyBtn } from "../../shared/container/vyClickable";
import { MinimizedPanelBar } from "../../navigation/presentational/minimizedPanelBar";
import { ProfileNavMenu } from "../../navigation/container/profileNavMenu";
import { defaultLangData, LangDataContext } from "../../../context/langContext";
import { MusicUploadForm } from "./musicUploadForm";


export function MusicEdit() {
    const [needNewMusicList, setNeedNewMusicList] = useState(true);
    const [musicDataList, setMusicDataList] = useState(new Array<MusicCardData>);

    const langData = _.merge({}, defaultLangData, useContext(LangDataContext));
    const authData = getAuthData();
    const musicId = getHrefMusicId();

    // const { musicCard: musicCardLang, musicFilter: musicFilterLang } = _.merge({}, defaultLangData, useContext(LangDataContext));

    if (needNewMusicList) {
        getMusic({ authToken: authData?.token, Options: { musicId: musicId } })
        .then((result) => {
            if (result.data && result.data.musicData && result.data.paginationData) {
                setMusicDataList(musicDataList.concat(result.data.musicData));
                setNeedNewMusicList(false);
            }
        })
        .catch(err => {})
    }


    return (
        <div className="container d-flex flex-column mt-2">
            <MusicUploadForm musicData={musicDataList[0]} isEditing={true} />            
        </div>
    );
}