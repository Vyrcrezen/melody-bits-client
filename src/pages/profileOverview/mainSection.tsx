import { validate } from "class-validator";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { getAuthData, setAuthData } from "../../util/functionalities/opAuthData";
import { ProfileData } from "../../util/functionalities/opProfileData";
import { updateUserData } from "../../util/functionalities/updateUserData";
import { resolveFeedbackMessage, unpackValidationError } from "../../util/validate/unpackValidationError";
import { validateUserEmail, validateUsername } from "../../util/validate/userInfo";
import { VyBtnLarge } from "../components/base/vyClickable";
import { VyFeedbackBtnLarge } from "../components/base/vyFeedbackElements";
import { VyInputLarge } from "../components/base/vyTextInput";
import { defaultLangData } from "../components/context/langContext";
import { ProfileAccessLevel } from "./profileOverview";

export function MainSection({ authData, profileAccessLevel, profileData, langData }: { authData: ReturnType<typeof getAuthData>, profileAccessLevel: ProfileAccessLevel, profileData?: ProfileData, langData: typeof defaultLangData }) {

    const [editing, setEditing] = useState(false);
    const formElement = useRef<HTMLFormElement>(null);

    const [username, setUsername] = useState(profileData?.username || '')
    const [email, setEmail] = useState(profileData?.email || '')
    const [inputResult, setInputResult] = useState<{ isError: boolean, message: string }>();

    const { profile: { overview: langProfile } } = langData;

    useEffect(() => {
        setUsername(profileData?.username || '');
        setEmail(profileData?.email || '');
    }, [profileData])

    const submitUserUpdate = (event: FormEvent) => {
        event.preventDefault();

        if (!authData || profileData?.username !== authData.username) {
            setInputResult({ isError: true, message: "Unathorized!" });
            return;
        }

        updateUserData({ authToken: authData.token, username: username, email: email})
        .then((result) => {
            console.log(result);
            setInputResult({
                isError: false,
                message: resolveFeedbackMessage('AC_012;Registration successful!', langData.inputFeedback)
            });
            setTimeout(() => {
                setAuthData({ ...authData, username: username });
                setEditing(false);
                window.location.reload();
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
            <div className="w-75 d-flex flex-row justify-content-between">
                <span>{langProfile.username}:</span>
                <span className="fw-bold fs-5">{username}</span>
            </div>

            {
                profileAccessLevel === 'editable' || profileAccessLevel === 'full'
                    ? <div className="w-75 d-flex flex-row justify-content-between">
                        <span>{langProfile.email}:</span>
                        <span className="fw-bold fs-5">{email}</span>
                    </div>
                    : undefined
            }

        </div>
    );

    const EditSection = (
        <form ref={formElement} method="post" onSubmit={submitUserUpdate} className="d-flex flex-column justify-content-center align-items-center p-2 pb-2 rounded vy-bg-secondary vy-dark" >
            <div className="w-75 d-flex flex-row justify-content-between">
                <VyInputLarge inputLabel={langProfile.username} inputName="username" frameWidthClass="w-100" inputSetter={setUsername} inputValue={username} isRequired={true} validateInput={validateUsername} />
            </div>

            <div className="w-75 d-flex flex-row justify-content-between">
                <VyInputLarge inputLabel={langProfile.email} inputName="email" frameWidthClass="w-100" inputSetter={setEmail} inputValue={email} isRequired={true} validateInput={validateUserEmail} />
            </div>
        </form>
    );

    return (
        <div className="m-auto p-3 vy-primary-bg vy-lone-backdrop">
            {editing ? EditSection : ViewSection}

            {
                profileAccessLevel === 'editable'
                ? <div className="d-flex flex-column justify-content-center align-items-center mt-3 p-2 pb-2 rounded vy-bg-secondary vy-dark" >
                {
                    editing
                        ? (<>
                            <VyBtnLarge btnText={langProfile.cancelBtn} onClick={() => {
                                setUsername(profileData?.username || '');
                                setEmail(profileData?.email || '');

                                setEditing(!editing);
                            }} />
                            {/* <VyBtnLarge btnText={langProfile.saveBtn} onClick={() => { */}
                            <VyFeedbackBtnLarge btnText={langProfile.saveBtn} frameOptions={{message: inputResult?.message, isError: inputResult?.isError, moreClasses: 'w-100'}} onClick={() => {

                                validateUsername(username)
                                .then((result) => {
                                    if (result.length > 0) {
                                        const errorMessage = unpackValidationError(result, langData.inputFeedback).messageTexts.join('\n');
                                        setInputResult({ isError: true, message: errorMessage });
                                        throw new Error(errorMessage);
                                    }

                                    return validateUserEmail(email)
                                })
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
