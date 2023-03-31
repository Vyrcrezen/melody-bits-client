import React, { useRef, useState } from "react";
import { MusicCardData } from "../../../models/musicCard";
import { EnvVariables } from '../../../env';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { getAuthData } from "../../../util/functionalities/opAuthData";
import { MusicCard } from "../../music/container/cardElement";
import { ApproveWindow } from "../../widgets/container/approveWindow";
import { getNotApprovedMusic } from "../../../util/functionalities/getNotApprovedMusic";

export function PendingMusicList() {
    const [needNewMusicList, setNeedNewMusicList] = useState(true);
    const [musicDeck, setMusicDeck] = useState(new Array<MusicCardData>);

    const { token: vyAuthToken } = getAuthData() || {};
    
    if (vyAuthToken) {
        try {
            if (needNewMusicList) {
                getNotApprovedMusic({ authToken: vyAuthToken, musicId: 1, status: [1] })
                    .then((result) => {
                        console.log(result);
                        if (result.data && result.data.musicData) {
                            setMusicDeck(musicDeck.concat(result.data.musicData));
                            setNeedNewMusicList(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
        catch (err) {
            
        }
    }
    else {
        if (needNewMusicList) {
            setNeedNewMusicList(false);
        }
    }

    const musicApproveDeck = new Array<JSX.Element>;

    musicDeck.forEach(data => {
        musicApproveDeck.push(
            <div key={data.id} className=''>
                <MusicCard  musicData={data} authToken={vyAuthToken} />
                <ApproveWindow  musicData={data} musicDeck={musicDeck} setMusicDeck={setMusicDeck} authToken={vyAuthToken} />
            </div>
        );
    });

    return (
        <div className="d-flex justify-content-center mb-0 w-100">
            <div className="w-100">
                <div className='d-flex flew-direction-row flex-wrap justify-content-center'>
                    {musicApproveDeck}
                </div>
            </div>
        </div>
    );
}