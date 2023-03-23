import { ValidationError } from "class-validator";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { UnpackedType, unpackValidationError } from "../../../util/validate/unpackValidationError";
import { defaultLangData, LangDataContext } from "../context/langContext";
import { VyFeedbackFrame } from "./vyFeedbackElements";

interface InputArgBase {
    inputName: string;
    inputLabel: string | JSX.Element;
    className?: string;
    containerClassName?: string;
    inputValue?: string;
    inputSetter?: React.Dispatch<React.SetStateAction<string>>;
    isRequired?: boolean;
    type?: React.HTMLInputTypeAttribute;
    // ref?: React.RefObject<HTMLInputElement>;
    
}

interface InputArgSimple extends InputArgBase {
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: React.FocusEventHandler<HTMLInputElement>;
}

interface InputArgFeedback extends InputArgBase {
    frameWidthClass?: string;
    validateInput: (input: string) => Promise<ValidationError[]>
}


interface TextAreaArg extends InputArgBase {
    onBlurTextArea?: React.FocusEventHandler<HTMLTextAreaElement>;
}

function _textInput({ inputName, inputLabel, containerClassName= '', className = '', inputValue, inputSetter, isRequired, onBlur, onChange, type }: InputArgSimple) {
    const finalType: React.HTMLInputTypeAttribute = type ?? (inputName.includes('password') ? 'password' : ( inputName === 'email' ? 'text' : 'text'));

    return (
        <div className={`text-start ${containerClassName}`}>
            <label htmlFor={inputName}>{inputLabel}{`${isRequired ? '*' : ''}`}</label>
            <br />
            <input
                className={`${className}`}
                name={inputName}
                type={finalType}
                defaultValue={inputValue ? inputValue : ''}
                required={!!isRequired}
                onInput={(event) => {
                    if (inputSetter) {
                        inputSetter(event.currentTarget.value);
                    }
                }}
                onBlur={onBlur}
                onChange={onChange}
            />
        </div>
    );
}

function _textInputAlt({ inputName, inputLabel, containerClassName= '', className = '', inputValue, inputSetter, isRequired, onBlur, onChange, type }: InputArgSimple) {
    const finalType: React.HTMLInputTypeAttribute = type ?? (inputName.includes('password') ? 'password' : ( inputName === 'email' ? 'text' : 'text'));

    return (
        <div className={`text-start ${containerClassName}`}>
            <input
                className={`${className}`}
                name={inputName}
                type={finalType}
                defaultValue={inputValue ? inputValue : ''}
                required={!!isRequired}
                onInput={(event) => {
                    if (inputSetter) {
                        inputSetter(event.currentTarget.value);
                    }
                }}
                onBlur={onBlur}
                onChange={onChange}
            />
            <br />
            <label htmlFor={inputName}>{inputLabel}{`${isRequired ? '*' : ''}`}</label>
        </div>
    );
}

export function VySimpleInput({ inputName, inputLabel, inputValue, className, containerClassName, inputSetter, isRequired, onBlur }: InputArgSimple) {
    return _textInput({ inputName: inputName, inputLabel: inputLabel, className: className, containerClassName: containerClassName, inputValue: inputValue, inputSetter: inputSetter, isRequired: isRequired, onBlur: onBlur })
}

export function VySimpleInputLarge({ inputName, inputLabel, inputValue, className, containerClassName,  inputSetter, isRequired, onBlur }: InputArgSimple) {
    return _textInput({ inputName: inputName, inputLabel: inputLabel, className: `fs-5 ${className}`, containerClassName: containerClassName, inputValue: inputValue, inputSetter: inputSetter, isRequired: isRequired, onBlur: onBlur })
}

export function VySimpleCheckbox({ inputName, inputLabel, inputValue, className, containerClassName, inputSetter, isRequired, onChange }: InputArgSimple) {
    return _textInputAlt({ type: 'checkbox', inputName: inputName, inputLabel: inputLabel, className: className, containerClassName: containerClassName, inputValue: inputValue, inputSetter: inputSetter, isRequired: isRequired, onChange: onChange })
}

// #####################
// #### Default Input ####
export function VyInput({ inputName, inputLabel, inputValue, inputSetter, isRequired, validateInput, frameWidthClass }: InputArgFeedback) {
    const [inputValidation, setInputValidation] = useState<ValidationError[]>();
    const { inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    // const errorMessage = Array.isArray(inputValidation) ? inputValidation[0].value : undefined;
    const errorMessage = Array.isArray(inputValidation) ? (unpackValidationError(inputValidation, langInputFeedback)?.messageTexts ?? [])[0] : undefined;

    const onInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const currentValue = event.currentTarget.value;

        validateInput((currentValue))
            .then(result => {
                if (result.length > 0) {
                    setInputValidation(result);
                }
                else {
                    setInputValidation(undefined);
                }
            })
            .catch(err => console.log(err))
    }

    const simpleInput = VySimpleInput({inputLabel: inputLabel, inputName: inputName, inputSetter: inputSetter, inputValue: inputValue, isRequired: isRequired, onBlur: onInputBlur});
    const feedbackFrame = new VyFeedbackFrame(simpleInput, {message: errorMessage, isError: !!errorMessage, hideFrame: errorMessage ? false : true, moreClasses: frameWidthClass});

    return feedbackFrame.getFrameElement();
}


// #####################
// #### Large Input ####
export function VyInputLarge({ inputName, inputLabel, inputValue, inputSetter, isRequired, validateInput, frameWidthClass }: InputArgFeedback) {
    const [inputValidation, setInputValidation] = useState<ValidationError[]>();
    const { inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    // const errorMessage = Array.isArray(inputValidation) ? inputValidation[0].value : undefined;
    const errorMessage = Array.isArray(inputValidation) ? (unpackValidationError(inputValidation, langInputFeedback)?.messageTexts ?? [])[0] : undefined;

    const onInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const currentValue = event.currentTarget.value;

        validateInput((currentValue))
            .then(result => {
                if (result.length > 0) {
                    setInputValidation(result);
                }
                else {
                    setInputValidation(undefined);
                }
            })
            .catch(err => console.log(err))
    }

    const simpleInput = VySimpleInputLarge({inputLabel: inputLabel, inputName: inputName, inputSetter: inputSetter, inputValue: inputValue, isRequired: isRequired, onBlur: onInputBlur});
    const feedbackFrame = new VyFeedbackFrame(simpleInput, {message: errorMessage, isError: !!errorMessage, hideFrame: errorMessage ? false : true, moreClasses: frameWidthClass});

    return feedbackFrame.getFrameElement();
}

// #####################
// #### Text Area ####
interface InputOptions {
    inputLabel?: string | JSX.Element;
    containerClassName?: string;
    className?: string;
    inputValue?: string;
    inputSetter?: React.Dispatch<React.SetStateAction<string>>;
    isRequired?: boolean;
    onBlurInput?: React.FocusEventHandler<HTMLInputElement>;
    onBlurTextArea?: React.FocusEventHandler<HTMLTextAreaElement>;
    inputType?: string;

}

class VyInputClass {
    inputName: string;
    Options: InputOptions;
    
    constructor(inputName: string, Options?: InputOptions) {
        this.inputName = inputName;
        this.Options = Options ?? {};
    }

    getInputElement() {
        const {inputLabel, containerClassName, className, inputValue, inputSetter, isRequired, onBlurInput, inputType} = this.Options;

        return (
            <div className={`text-start ${containerClassName}`}>
                <label htmlFor={this.inputName}>{`${inputLabel}${isRequired ? '*' : ''}`}</label>
                <br />
                <input
                    className={`${className}`}
                    name={this.inputName}
                    type={inputType}
                    defaultValue={inputValue ? inputValue : ''}
                    required={!!isRequired}
                    onInput={(event) => {
                        if (inputSetter) {
                            inputSetter(event.currentTarget.value);
                        }
                    }}
                    onBlur={onBlurInput}
                />
            </div>
        );
    }

    getInputElementAlt() {
        const { inputLabel, containerClassName, className, inputValue, inputSetter, isRequired, onBlurInput, inputType } = this.Options;

        return (
            <div className={`text-start ${containerClassName}`}>
                <input
                    className={`${className}`}
                    name={this.inputName}
                    type={inputType}
                    defaultValue={inputValue ? inputValue : ''}
                    required={!!isRequired}
                    onInput={(event) => {
                        if (inputSetter) {
                            inputSetter(event.currentTarget.value);
                        }
                    }}
                    onBlur={onBlurInput}
                />
                <br />
                <label htmlFor={this.inputName}>{`${inputLabel}${isRequired ? '*' : ''}`}</label>
            </div>
        );
    }

    getTextAreaElement() {
        const {inputLabel, containerClassName, className, inputValue, inputSetter, isRequired, onBlurTextArea, inputType} = this.Options;

        return (
            <div className={`text-start ${containerClassName}`}>
                <label htmlFor={this.inputName}>{`${inputLabel}${isRequired ? '*' : ''}`}</label>
                <br />
                <textarea
                    className={`${className}`}
                    name={this.inputName}
                    defaultValue={inputValue ? inputValue : ''}
                    required={!!isRequired}
                    onInput={(event) => {
                        if (inputSetter) {
                            inputSetter(event.currentTarget.value);
                        }
                    }}
                    onBlur={(event) => {
                        // if (inputSetter) {
                        //     inputSetter(event.currentTarget.value);
                        // }
                        if (onBlurTextArea) {
                            onBlurTextArea(event);
                        }
                    }
                    }
                />
            </div>
        );
    }
}

export function VyTextAreaElement({inputName, inputLabel, className, containerClassName, inputValue, inputSetter, isRequired, onBlurTextArea}: TextAreaArg) {
    const mTextArea = new VyInputClass(inputName, {
        className: className,
        containerClassName: containerClassName,
        inputLabel: inputLabel,
        inputSetter: inputSetter,
        inputValue: inputValue,
        isRequired: isRequired,
        onBlurTextArea: onBlurTextArea
    });

    return mTextArea.getTextAreaElement();
}

// #####################
// #### Checkbox Input ####
export function VyCheckboxInput({ inputName, inputLabel, inputValue, inputSetter, isRequired, validateInput, frameWidthClass }: InputArgFeedback) {
    const [inputValidation, setInputValidation] = useState<ValidationError[]>();
    const { inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    // const errorMessage = Array.isArray(inputValidation) ? inputValidation[0].value : undefined;
    const errorMessage = Array.isArray(inputValidation) ? (unpackValidationError(inputValidation, langInputFeedback)?.messageTexts ?? [])[0] : undefined;

    const onChange = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const currentValue = event.currentTarget.checked;
        if (inputSetter) {
            inputSetter(`${currentValue}`);
        }

        validateInput((`${currentValue}`))
            .then(result => {
                if (result.length > 0) {
                    setInputValidation(result);
                }
                else {
                    setInputValidation(undefined);
                }
            })
            .catch(err => console.log(err))
    }

    const simpleInput = VySimpleCheckbox({inputLabel: inputLabel, inputName: inputName, inputSetter: inputSetter, inputValue: inputValue, isRequired: isRequired, onChange: onChange, containerClassName: 'w-75 d-flex flex-row', className: 'mx-2'});
    const feedbackFrame = new VyFeedbackFrame(simpleInput, {message: errorMessage, isError: !!errorMessage, hideFrame: errorMessage ? false : true, moreClasses: frameWidthClass});

    return feedbackFrame.getFrameElement();
}

