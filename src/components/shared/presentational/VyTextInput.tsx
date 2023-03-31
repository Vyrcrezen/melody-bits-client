import React from "react";
import TextInputOptions from "../types/TextInputOptions";

function _placeTextInputLabel(Options: TextInputOptions, currentPos: TextInputOptions["labelPos"]) {

    const { labelPos = 'before', inputName, inputLabel, isRequired } = Options;

    if (labelPos === currentPos) {
        return (
            <label htmlFor={inputName}>{inputLabel}{`${isRequired ? '*' : ''}`}</label>
        );
    }
}

export default function VyTextInput(Options: TextInputOptions) {

    const { inputName, containerClassName= '', className = '', inputValue, placeholder, inputSetter, isRequired, onBlur, onChange, onInput, type} = Options;
    
    const resolvedType: React.HTMLInputTypeAttribute = type ?? (inputName.includes('password') ? 'password' : ( inputName === 'email' ? 'text' : 'text'));

    const inputEventHandler: React.FocusEventHandler<HTMLInputElement> | undefined = inputSetter ? function (event) { inputSetter(event.currentTarget.value); } : onInput;

    return (
        <div className={`text-start ${containerClassName}`}>

            {_placeTextInputLabel(Options, 'before')}

            <br />
            <input
                className={`${className}`}
                name={inputName}
                placeholder={placeholder}
                type={resolvedType}
                defaultValue={inputValue ? inputValue : ''}
                required={!!isRequired}
                onInput={inputEventHandler}
                onBlur={onBlur}
                onChange={onChange}
            />

            {_placeTextInputLabel(Options, 'after')}
        </div>
    );
}
