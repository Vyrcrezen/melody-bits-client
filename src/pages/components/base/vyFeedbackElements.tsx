import { ValidationError } from "class-validator";
import _ from "lodash";
import React, { useContext, useRef, useState } from "react";
import { addClickRipple } from "../../../util/functionalities/addClickRipple";
import { loadFileFromInput } from "../../../util/loadFileToElement";
import { unpackValidationError } from "../../../util/validate/unpackValidationError";
import { defaultLangData, LangDataContext } from "../context/langContext";
import { ButtonOptions, VyButtonClass } from "./vyClickable";

// export function VyFeedbackFrame({ message, isError, frameContent, preserveFrameHeight, sizeClassName }: { message?: string, isError?: boolean, frameContent: JSX.Element, preserveFrameHeight?: boolean, sizeClassName?: string }) {

//     return (
//         <div className={`d-flex flex-column align-items-center m-1 ${message ? 'border border-4' : ''}  ${isError ? 'vy-border-error-dr' : 'vy-border-good-dr'} p-2 ${sizeClassName ? sizeClassName : ''}`}>
//             {frameContent}
//             {
//                 !preserveFrameHeight && !isError
//                     ? null
//                     : (
//                         <span className={`vy-wh-min-feedback text-center ${isError ? 'vy-error-dr' : 'vy-good-dr'}`}>
//                             {message}
//                         </span>
//                     )
//             }

//         </div>
//     );
// }

interface FeedbackFrameOptions {
    preserveFrameHeight?: boolean;
    hideFrame?: boolean;
    moreClasses?: string;
    message?: string;
    isError?: boolean;
}

export class VyFeedbackFrame {
    private frameContent: string | JSX.Element;
    private Options: FeedbackFrameOptions;

    constructor(frameContent: string | JSX.Element, Options?: FeedbackFrameOptions) {
        this.frameContent = frameContent;
        this.Options = Options ?? {};
    }

    getFrameElement() {
        const { preserveFrameHeight, hideFrame, moreClasses, message, isError } = this.Options;

        return (
            <div className={`d-flex flex-column align-items-center m-1 ${hideFrame ? '' : 'border border-4'}  ${isError ? 'vy-border-error-dr' : 'vy-border-good-dr'} p-2 ${moreClasses ? moreClasses : ''}`}>
                {this.frameContent}
                {
                    !preserveFrameHeight && !message
                        ? null
                        : (
                            <span className={`vy-wh-min-feedback text-center ${isError ? 'vy-error-dr' : 'vy-good-dr'}`}>
                                {message ?? ''}
                            </span>
                        )
                }

            </div>
        );
    }
}

export function VyFeedbackBtn({ btnText, onClick, btnOptions, frameOptions }: { btnText: string | JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, btnOptions?: ButtonOptions, frameOptions?: FeedbackFrameOptions }) {

    const { isError } = frameOptions ?? {};
    const [lastEvent, setLastEvent] = useState<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

    const btnOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setLastEvent(event);
        onClick(event);
    }

    if (typeof isError === 'boolean' && lastEvent) {
        addClickRipple(lastEvent, 5, isError ? 'vy-bg-error-br' : 'vy-bg-good-br', () => setLastEvent(undefined))
    }

    const mFrameOptions = { ...frameOptions, hideFrame: (frameOptions ?? {}).message ? false : true } as FeedbackFrameOptions;
    const buttonElement = new VyButtonClass(btnText, btnOnClick, { ...btnOptions, moreClassNames: 'position-relative ' + (btnOptions?.moreClassNames ?? '') })
    const feedbackFrame = new VyFeedbackFrame(buttonElement.getButtonElement(), mFrameOptions);

    return feedbackFrame.getFrameElement();
}


// ######################
// ### Alternate Size ###
export function VyFeedbackBtnLarge({ btnText, onClick, btnOptions, frameOptions }: { btnText: string | JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, btnOptions?: ButtonOptions, frameOptions?: FeedbackFrameOptions }) {
    const mOptions = { ...(btnOptions || {}), moreClassNames: 'fs-5 ' + (btnOptions?.moreClassNames ?? '') } as ButtonOptions;

    return VyFeedbackBtn({ btnText: btnText, onClick: onClick, btnOptions: mOptions, frameOptions: frameOptions });
}


// ############################
// ### Feedback Button Plus ###

interface InputOptions {
    inputOnChange?: React.ChangeEventHandler<HTMLInputElement>;
    inputSetter?: React.Dispatch<React.SetStateAction<string>>;
    inputValue?: string;
    isRequired?: boolean;
    validateInput?: (input: string) => Promise<ValidationError[]>;
}

interface FeedbackFileInputArg {
    plusContent: string | JSX.Element;
    btnText: string | JSX.Element;
    inputId: string;
    inputName: string;
    btnOptions?: ButtonOptions;
    frameOptions?: FeedbackFrameOptions;
    inputOptions?: InputOptions;
}

// inputSetter={setTitle} inputValue={title} isRequired={true} validateInput={validateMusicTitle}

export function VyFeedbackFileInput({ plusContent, btnText, inputId, inputName, btnOptions, frameOptions, inputOptions }: FeedbackFileInputArg) {

    const inputElement = useRef<HTMLInputElement>(null);
    const { isError } = frameOptions ?? {};
    const [lastEvent, setLastEvent] = useState<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

    const { inputOnChange, inputSetter, inputValue, isRequired, validateInput } = inputOptions ?? {};
    const { moreClasses } = frameOptions ?? {};

    const [inputValidation, setInputValidation] = useState<ValidationError[]>();
    const { inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const errorMessage = Array.isArray(inputValidation) ? (unpackValidationError(inputValidation, langInputFeedback)?.messageTexts ?? [])[0] : undefined;

    const btnOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        inputElement.current?.click();
        setLastEvent(event);
    }

    const inputEventOnChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {

        loadFileFromInput(event.currentTarget)
            .then((fileSrc) => {
                if (fileSrc) {

                    if (validateInput) {
                        validateInput(fileSrc)
                        .then(result => {
                            if (result.length > 0) {
                                setInputValidation(result);
                            }
                            else {
                                setInputValidation(undefined);

                                if (inputSetter) {
                                    inputSetter(fileSrc);
                                }
                                if (inputOnChange) {
                                    inputOnChange(event);
                                }
                            }
                        })
                        .catch(err => console.log(err))
                    }
                }
            })
            .catch(err => {

            })
    }

    if (typeof isError === 'boolean' && lastEvent) {
        addClickRipple(lastEvent, 5, isError ? 'vy-bg-error-br' : 'vy-bg-good-br', () => setLastEvent(undefined))
    }

    // const mFrameOptions = {...frameOptions, hideFrame: (frameOptions ?? {}).message | errorMessage ? false : true} as FeedbackFrameOptions;
    const buttonElement = new VyButtonClass(btnText, btnOnClick, { ...btnOptions, moreClassNames: 'position-relative ' + (btnOptions?.moreClassNames ?? '') });

    const feedbackContent = (
        <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <div className="mb-2 w-100" >
                {plusContent}
            </div>
            {
                buttonElement.getButtonElement()
            }
            <input ref={inputElement} className="d-none" id={inputId} type="file" name={inputName} onChange={inputEventOnChange} required={!!isRequired} />
        </div>
    );

    const feedbackFrame = new VyFeedbackFrame(feedbackContent, { message: errorMessage, isError: !!errorMessage, hideFrame: errorMessage ? false : true, moreClasses: moreClasses });

    return feedbackFrame.getFrameElement();
}
