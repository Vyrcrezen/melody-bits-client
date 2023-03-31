import { validate } from "class-validator";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { getAuthData, setAuthData } from "../../../util/functionalities/opAuthData";
import { ProfileData } from "../../../util/functionalities/opProfileData";
import { updateUserData } from "../../../util/functionalities/updateUserData";
import { resolveFeedbackMessage, unpackValidationError } from "../../../util/validate/unpackValidationError";
import { validateUserBio, validateUserEmail, validateUsername } from "../../../util/validate/userInfo";
import { VyBtnLarge } from "../../shared/container/vyClickable";
import { VyFeedbackBtnLarge } from "../../shared/container/vyFeedbackElements";
import { VyInputLarge } from "../../shared/container/vyTextInput";
import { defaultLangData } from "../../../context/langContext";
import { ProfileAccessLevel } from "../../section/container/profileOverview";

export function BioSection({ authData, profileAccessLevel, profileData, langData }: { profileAccessLevel: ProfileAccessLevel, authData: ReturnType<typeof getAuthData>, profileData?: ProfileData, langData: typeof defaultLangData }) {

    const [editing, setEditing] = useState(false);
    const formElement = useRef<HTMLFormElement>(null);

    const [bio, setBio] = useState(profileData?.username || '')
    const [inputResult, setInputResult] = useState<{ isError: boolean, message: string }>();

    const { profile: { overview: langProfile } } = langData;

    useEffect(() => {
        setBio(profileData?.bio || '');
    }, [profileData])

    const submitUserUpdate = (event: FormEvent) => {
        event.preventDefault();

        if (!authData || profileData?.username !== authData.username) {
            setInputResult({ isError: true, message: "Unathorized!" });
            return;
        }

        updateUserData({ authToken: authData.token, bio: bio})
        .then((result) => {
            console.log(result);
            setInputResult({
                isError: false,
                message: resolveFeedbackMessage('AC_012;Registration successful!', langData.inputFeedback)
            });
            setTimeout(() => {
                setEditing(false);
            }, 1000);
        })
        .catch((err: GraphqlRes) => {
            setInputResult({
                isError: true,
                message: err.message
            });
        });
    }

    const ViewSection = (
        <div className="d-flex flex-column justify-content-center align-items-center p-2 pb-2 rounded vy-bg-secondary vy-dark" >
            <div className="w-75 d-flex flex-column justify-content-between">
                <span>{langProfile.userBio}:</span>
                <span className="fs-5">{bio}</span>
            </div>
        </div>
    );

    const EditSection = (
        <form ref={formElement} method="post" onSubmit={submitUserUpdate} className="d-flex flex-column justify-content-center align-items-center p-2 pb-2 rounded vy-bg-secondary vy-dark" >
            <div className="w-75 d-flex flex-row justify-content-between">
                <VyInputLarge inputLabel={langProfile.userBio} inputName="username" frameWidthClass="w-100" inputSetter={setBio} inputValue={bio} isRequired={true} validateInput={validateUserBio} />
            </div>
        </form>
    );

    return (
        <div className="m-auto p-3 mt-3 vy-primary-bg vy-lone-backdrop">
            {editing ? EditSection : ViewSection}

            {
                profileAccessLevel === 'editable'
                ? <div className="d-flex flex-column justify-content-center align-items-center mt-3 p-2 pb-2 rounded vy-bg-secondary vy-dark" >
                    {
                        editing
                            ? (<>
                                <VyBtnLarge btnText={langProfile.cancelBtn} onClick={() => {
                                    setBio(profileData?.bio || '');

                                    setEditing(!editing);
                                }} />
                                {/* <VyBtnLarge btnText={langProfile.saveBtn} onClick={() => { */}
                                <VyFeedbackBtnLarge btnText={langProfile.saveBtn} frameOptions={{message: inputResult?.message, isError: inputResult?.isError, moreClasses: 'w-100'}} onClick={() => {

                                    validateUserBio(bio)
                                    .then(result => {
                                        if (result.length > 0) {
                                            const errorMessage = unpackValidationError(result, langData.inputFeedback).messageTexts.join('\n');
                                            setInputResult({ isError: true, message: errorMessage });
                                            throw new Error(errorMessage);
                                        }
                                        setInputResult(undefined);
                                        formElement.current?.requestSubmit();
                                    })
                                    .catch(() => {}); 
                                }} />
                            </>)
                            : <VyBtnLarge btnText={langProfile.editBtn} onClick={() => {
                                setEditing(!editing);
                            }} />
                    }
                </div>
                : undefined
            }  
        </div>
    );
}
