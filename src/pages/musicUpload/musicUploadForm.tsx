import React, { FormEvent, useContext, useRef, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../css/style.css';

import placeholderMusic from '../../media/music/placeholderMusic.wav';

import { loadFileAsBackground, loadFileToElement } from "../../util/loadFileToElement";
import { EnvVariables } from "../../env";
import { AuthToken } from "../../models/authToken";
import { CoverImage } from "../components/complex/cardElements";
import { VyFeedbackBtnLarge, VyFeedbackFileInput } from "../components/base/vyFeedbackElements";
import { VyAudio } from "../components/vyAudioPlayer";
import { defaultLangData, LangDataContext } from "../components/context/langContext";
import _, { result } from "lodash";
import { VyInputLarge } from "../components/base/vyTextInput";
import { validateMusicAlbum, validateMusicArtist, validateMusicAudio, validateMusicImage, validateMusicLink, validateMusicPublisher, validateMusicRecordLabel, validateMusicTags, validateMusicTitle } from "../../util/validate/musicData";
import { ValidationError } from "class-validator";
import { unpackValidationError, resolveFeedbackMessage } from "../../util/validate/unpackValidationError";
import { vyUploadMusic } from "../../util/functionalities/uploadMusic";
import { getAuthData } from "../../util/functionalities/opAuthData";
import { sitemap } from "../../sitemap";

export function MusicUploadForm() {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [artist, setArtist] = useState('');
    const [tags, setTags] = useState('');
    const [album, setAlbum] = useState('');
    const [recordLabel, setRecordLabel] = useState('');
    const [publisher, setPublisher] = useState('');
    const [image, setImage] = useState('');
    const [music, setMusic] = useState(placeholderMusic);

    let uploadingNow = false;

    const [inputResult, setInputResult] = useState<{ isError: boolean, message: string }>();

    const formElement = useRef<HTMLFormElement>(null);

    const { musicUploadForm: musicUploadLang, inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const musicUploadSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        const { token: vyAuthToken } = getAuthData() || {};

        if (!vyAuthToken) {
            return;
        }

        vyUploadMusic({ authToken: vyAuthToken, formElement: formElement})
        .then((result) => {
            setInputResult({
                isError: false,
                message: resolveFeedbackMessage('MD_20;Music upload successful!', langInputFeedback)
            });
            setTimeout(() => {
                uploadingNow = false;
                window.location.href = sitemap.upload;
            }, 1000);
        })
        .catch((err: GraphqlRes) => {
            uploadingNow = false;
            setInputResult({
                isError: true,
                message: err.message
            });
        });
    }

    return (
        <div className="container d-flex flex-column mt-4">
            <div className="m-auto p-4 rounded vy-primary-bg">
            <form ref={formElement} id="music-upload-form" className="d-flex flex-column align-items-center" onSubmit={musicUploadSubmit}>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-evenly vy-music-card-width">
                        <VyFeedbackFileInput
                            plusContent={CoverImage({imageId: 'music-upload-cover-image', backgroundId: 'music-upload-cover-bacgkround'})}
                            btnText={musicUploadLang.selectImageBtn} 
                            inputId="music-upload-cover-input"
                            inputName="cover_image"
                            inputOptions={{
                                validateInput: validateMusicImage,
                                inputSetter: setImage,
                                inputOnChange: (_event) => {
                                    loadFileToElement('music-upload-cover-input', 'music-upload-cover-image', () => {return true});
                                    loadFileAsBackground('music-upload-cover-input', 'music-upload-cover-bacgkround', () => {return true});
                                }
                            }}
                        />
                        <hr />
                        <VyFeedbackFileInput
                            plusContent={VyAudio({ id: "music-upload-music-audio" })}
                            btnText={musicUploadLang.selectMusicBtn} 
                            inputId="music-upload-music-input"
                            inputName="music_file"
                            inputOptions={{
                                validateInput: validateMusicAudio,
                                inputSetter: setMusic,
                                inputOnChange: (_event) => {
                                    loadFileToElement('music-upload-music-input', 'music-upload-music-audio', () => {return true});
                                }
                            }}
                            
                        />
                    </div>
                    <div className="" style={{ width: '26rem' }}>
                        <VyInputLarge inputLabel={musicUploadLang.title} inputName="title" frameWidthClass="w-100" inputSetter={setTitle} inputValue={title} isRequired={true} validateInput={validateMusicTitle} />
                        <VyInputLarge inputLabel={musicUploadLang.link} inputName="link" frameWidthClass="w-100" inputSetter={setLink} inputValue={link} isRequired={true} validateInput={validateMusicLink} />
                        <VyInputLarge inputLabel={musicUploadLang.artist} inputName="artist_name" frameWidthClass="w-100" inputSetter={setArtist} inputValue={artist} isRequired={true} validateInput={validateMusicArtist} />
                        <VyInputLarge inputLabel={musicUploadLang.tags} inputName="tags" frameWidthClass="w-100" inputSetter={setTags} inputValue={tags} isRequired={true} validateInput={validateMusicTags} />
                        <VyInputLarge inputLabel={musicUploadLang.album} inputName="album" frameWidthClass="w-100" inputSetter={setAlbum} inputValue={album} isRequired={false} validateInput={validateMusicAlbum} />
                        <VyInputLarge inputLabel={musicUploadLang.recordLabel} inputName="record_label_name" frameWidthClass="w-100" inputSetter={setRecordLabel} inputValue={recordLabel} isRequired={false} validateInput={validateMusicRecordLabel} />
                        <VyInputLarge inputLabel={musicUploadLang.publisher} inputName="publisher_name" frameWidthClass="w-100" inputSetter={setPublisher} inputValue={publisher} isRequired={false} validateInput={validateMusicPublisher} />
                    </div>
                </div>
                <hr className="w-100" />
                <VyFeedbackBtnLarge btnText={musicUploadLang.uploadMusicBtn} frameOptions={{ message: inputResult?.message, isError: inputResult?.isError, moreClasses: 'w-100'}} onClick={() => {

                    if (!uploadingNow) {

                        uploadingNow = true;

                        const validationResults: Array<Promise<ValidationError[]>> = [
                            validateMusicTitle(title),
                            validateMusicLink(link),
                            validateMusicArtist(artist),
                            validateMusicTags(tags),
                            validateMusicAlbum(album),
                            validateMusicRecordLabel(recordLabel),
                            validateMusicPublisher(publisher)
                        ];
    
                        Promise.all(validationResults)
                        .then((result) => {
                            console.log(result);
    
                            for (const errorItem of result) {
                                if ( Array.isArray(errorItem) && errorItem.length > 0) {
                                    const errorMessage = unpackValidationError(errorItem, langInputFeedback).messageTexts.join('\n');
                                    setInputResult({ isError: true, message: errorMessage });
    
                                    throw new Error(errorMessage);
                                }
                            }
                            setInputResult(undefined);
                            formElement.current?.requestSubmit();
                        })
                        .catch(err => {
                        })
                    }

                }} />
            </form>
        </div>
        </div>
    );
}