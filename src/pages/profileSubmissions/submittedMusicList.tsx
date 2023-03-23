import React, { useRef, useState } from "react";
import { ApprovalMusicCardData } from "../../models/musicCard";
import { EnvVariables } from '../../env';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { getAuthData } from "../../util/functionalities/opAuthData";
import { MusicCard } from "../components/musicDeck/cardElement";
import { getSubmittedMusic } from "../../util/functionalities/getSubmittedMusic";
import { SubmissionWindow } from "../components/complex/submissionWindow";

export function SubmittedMusicList({profileId}: {profileId?: string}) {
    const [needNewMusicList, setNeedNewMusicList] = useState(true);
    const [musicDeck, setMusicDeck] = useState(new Array<ApprovalMusicCardData>);

    const { token: vyAuthToken } = getAuthData() || {};
    
    if (vyAuthToken) {
        try {
            if (needNewMusicList) {
                getSubmittedMusic({ authToken: vyAuthToken, userId: profileId })
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
                <SubmissionWindow  musicData={data} musicDeck={musicDeck} setMusicDeck={setMusicDeck} authToken={vyAuthToken} />
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