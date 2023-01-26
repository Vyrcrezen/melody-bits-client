import React, { useState } from "react";
import { MusicCardData } from "../../../models/musicCard";
import { updateMusicApproval } from "../../../util/functionalities/updateMusicApproval";
import { VyBtn } from "../base/vyClickable";
import { VyTextAreaElement } from "../base/vyTextInput";

export function ApproveWindow({ musicData, musicDeck, setMusicDeck, authToken }: { musicData: MusicCardData, musicDeck: MusicCardData[], setMusicDeck: React.Dispatch<React.SetStateAction<MusicCardData[]>>, authToken?: string }) {
    const [approvalMessage, setApprovalMessage] = useState('');

    return (
        <div className="d-flex flex-column align-items-center rounded vy-bg-primary mx-1 p-2">
            <VyTextAreaElement containerClassName="w-100 h-100" className="w-100 rounded vy-bg-secondary vy-approve-input" inputLabel="Message" inputName="approve_message" inputSetter={setApprovalMessage} />
            <div className="d-flex flex-row justify-content-between w-100 mt-2" >
                <VyBtn
                    btnText={"Approve"}
                    Options={{
                        moreClassNames: 'vy-bg-good-br'
                    }}
                    onClick={() => { 
                        updateMusicApproval({ authToken: authToken, newStatus: 'ok', musicId: musicData.id, message: approvalMessage })
                        .then(result => {
                            console.log(result);

                            setTimeout(() => {
                                const updatedMusicDeck = musicDeck.filter(item => item.id !== musicData.id);
                                setMusicDeck(updatedMusicDeck);
                            }, 200);
                        })
                        .catch(err => {})
                    }}
                />
                <VyBtn
                    btnText={"Terminate"}
                    Options={{
                        moreClassNames: 'vy-bg-error-dr vy-white'
                    }}
                    onClick={() => { 
                        updateMusicApproval({ authToken: authToken, newStatus: 'terminate', musicId: musicData.id, message: approvalMessage })
                        .then(result => {
                            console.log(result);

                            setTimeout(() => {
                                const updatedMusicDeck = musicDeck.filter(item => item.id !== musicData.id);
                                setMusicDeck(updatedMusicDeck);
                            }, 200);
                        })
                        .catch(err => {})
                    }}
                />
                <VyBtn
                    btnText={"Revision"}
                    Options={{
                        moreClassNames: 'vy-bg-error-dr vy-white'
                    }}
                    onClick={() => {
                        updateMusicApproval({ authToken: authToken, newStatus: 'revision', musicId: musicData.id, message: approvalMessage })
                        .then(result => {
                            console.log(result);

                            setTimeout(() => {
                                const updatedMusicDeck = musicDeck.filter(item => item.id !== musicData.id);
                                setMusicDeck(updatedMusicDeck);
                            }, 200);
                        })
                        .catch(err => {})
                     }}
                />
            </div>
        </div>
    );
}
