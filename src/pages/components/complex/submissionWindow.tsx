import _ from "lodash";
import React, { useContext, useState } from "react";
import { ApprovalMusicCardData } from "../../../models/musicCard";
import { sitemap } from "../../../sitemap";
import { updateMusicApproval } from "../../../util/functionalities/updateMusicApproval";
import { VyBtn } from "../base/vyClickable";
import { VyTextAreaElement } from "../base/vyTextInput";
import { defaultLangData, LangDataContext } from "../context/langContext";

export function SubmissionWindow({ musicData, musicDeck, setMusicDeck, authToken }: { musicData: ApprovalMusicCardData, musicDeck: ApprovalMusicCardData[], setMusicDeck: React.Dispatch<React.SetStateAction<ApprovalMusicCardData[]>>, authToken?: string }) {
    const [approvalMessage, setApprovalMessage] = useState('');

    const { profile: { submissions: langSubmissions } } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const { approval: { status: musicStatus } } = musicData;

    return (
        <div className="d-flex flex-column align-items-center rounded vy-bg-primary mx-1 p-2">
            <div className="d-flex flex-row w-100 mt-2">
                <span>{langSubmissions.resolution}:</span>
                <div className="d-flex flex-row justify-content-between w-100 ms-2" >
                    <VyBtn
                        btnText={musicStatus === '0' ? langSubmissions.approved : musicStatus === '1' ? langSubmissions.submitted : musicStatus === '2' ? langSubmissions.revisionNeeded : langSubmissions.terminated }
                        Options={{
                            backgroundColor: musicStatus === '0' ? 'vy-bg-good-br' : musicStatus === '1' ? 'vy-bg-secondary' : 'vy-bg-error-dr',
                            color: (musicStatus === '0' || musicStatus === '1') ? 'vy-dark' : 'vy-bright',
                            isNoninteractable: true
                        }}
                        onClick={() => {}}
                    />
                    <VyBtn
                        btnText={langSubmissions.revise}
                        Options={{
                            moreClassNames: 'vy-bg-secondary vy-dark',
                            isDisabled: musicStatus === '0' || musicStatus === '3' ? true : false
                        }}
                        onClick={() => {
                            window.location.href = `${sitemap.musicEdit}${musicData.id}`;
                        }}
                    />
                </div>
            </div>
            <VyTextAreaElement inputValue={musicData.approval.message} containerClassName="w-100 h-100" className="w-100 rounded vy-bg-secondary vy-approve-input" inputLabel={langSubmissions.message} inputName="approve_message" inputSetter={setApprovalMessage} />
        </div>
    );
}
