import React, { useState } from "react";
import { MusicCardData } from "../../../models/musicCard";
import { getMusic } from "../../../util/functionalities/getMusic";
import { getAuthData } from "../../../util/functionalities/opAuthData";
import { MusicCard } from "../musicDeck/cardElement";

export function LatestMusicAddition() {
    const [needNewMusicList, setNeedNewMusicList] = useState(true);
    const [musicData, setMusicData] = useState(new Array<MusicCardData>);
    
    const { token: vyAuthToken } = getAuthData() || {};

    if (needNewMusicList) {
        getMusic({ authToken: vyAuthToken, Options: { limit: 3, orderByColumn: 'created_at', orderByDirection: 'DESC' } })
        .then((result) => {
            if (result.data && result.data.musicData && result.data.paginationData) {
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
                <MusicCard musicData={data} authToken={vyAuthToken} />
            </div>
        );
    });

    return (
        <div className='d-flex flew-direction-row flex-wrap justify-content-evenly'>
            {musicDeck}
        </div>
    );
}
