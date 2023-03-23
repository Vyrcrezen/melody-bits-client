import React, { useEffect, useState } from "react";

function _clickable({
    clickableText,
    className,
    isBtn=true,
    href = '#',
    dataBsToggle,
    dataBsAutoClose,
    ariaExpanded,
    buttonRef,
    onClick
    }: {
        clickableText: string | JSX.Element,
        className: string,
        isBtn?: boolean,
        href?: string,
        dataBsToggle?: string,
        dataBsAutoClose?: string,
        ariaExpanded?: boolean,
        buttonRef?: React.RefObject<HTMLButtonElement>,
        onClick?: React.MouseEventHandler<HTMLButtonElement>
    }) {
    return (
        isBtn
        ?
        <button
            ref={buttonRef}
            type="button"
            className={className}
            data-bs-toggle={dataBsToggle ? dataBsToggle : null }
            aria-expanded={ariaExpanded ? ariaExpanded : false }
            data-bs-auto-close={dataBsAutoClose ?? null}
            onClick={onClick}
        >
            {clickableText}
        </button>
        :
        <a className={className} href={href}>
            {clickableText}
        </a>

    );
}

export interface ClickableOptions {
    boldFont?: boolean;
    backgroundColor?: string;
    color?: string;
    border?: boolean;
    moreClassNames?: string;
    padding?: string;
    elementKey?: string;
}

class VyAnchorClass {
    private aText: string | JSX.Element;
    private className: string;
    private href: string;
    private Options: ClickableOptions

    constructor(aText: string | JSX.Element, href: string, Options?: ClickableOptions) {
        this.aText = aText;
        this.href = href;
        this.Options = Options ?? {};

        const {boldFont, backgroundColor, color, border, moreClassNames} = this.Options;

        this.className = `btn py-1 rounded vy-clickable ${boldFont ? 'fw-bold' : ''} ${backgroundColor ? backgroundColor : 'vy-bg-secondary'} ${color ? color : 'vy-dark'} ${border ? 'border border-2' : ''} ${moreClassNames ?? ''}`;
    }

    getAnchorElement() {
        return (
            <a className={this.className} href={this.href}>
                {this.aText}
            </a>
        );
    }
}

export interface ButtonOptions extends ClickableOptions {
    dataBsToggle?: string;
    ariaExpanded?: boolean;
    dataBsAutoClose?: string;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    isDisabled?: boolean;
    isNoninteractable?: boolean;
}

export class VyButtonClass {
    private btnText: string | JSX.Element;
    private className: string;
    private onClick: React.MouseEventHandler<HTMLButtonElement>;
    private Options?: ButtonOptions

    constructor(btnText: string | JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, Options?: ButtonOptions) {
        this.btnText = btnText;
        this.onClick = onClick;
        this.Options = Options;

        const {boldFont, backgroundColor, color, border, moreClassNames, padding, isNoninteractable} = this.Options ?? {};

        this.className = `${padding ? padding : 'py-1'} rounded ${ isNoninteractable ? 'vy-btn-intert' : 'btn vy-clickable' } ${boldFont ? 'fw-bold' : ''} ${backgroundColor ? backgroundColor : 'vy-bg-secondary'} ${color ? color : 'vy-dark'} ${border === false ? '' : 'border border-2 vy-border-dark'} ${moreClassNames ?? ''}`;
    }

    getButtonElement() {
        const {dataBsToggle, ariaExpanded, dataBsAutoClose, buttonRef, elementKey, isDisabled} = this.Options || {};

        return (
            <button
                type="button"
                disabled={isDisabled ?? undefined}
                key={elementKey ?? null}
                ref={buttonRef ?? null}
                className={this.className}
                data-bs-toggle={dataBsToggle ? dataBsToggle : null}
                aria-expanded={ariaExpanded ? ariaExpanded : false}
                data-bs-auto-close={dataBsAutoClose ?? null}
                onClick={this.onClick}
            >
                {this.btnText}
            </button>
        );
    }

    // getFileInputElement(inputElement: JSX.Element, inputElementId: string) {
    //     const {dataBsToggle, ariaExpanded} = this.Options || {};
    //     // <input type="file" name="cover_image" id="music-upload-cover-input" required onChange={(_event) => { loadFileToElement('music-upload-cover-input', 'music-upload-cover-image', () => {return true}); }} />
    //     return (
    //         <>
    //             <label htmlFor={inputElementId}>
    //             <button
    //             type="button"
    //             className={this.className}
    //             data-bs-toggle={dataBsToggle ? dataBsToggle : null}
    //             aria-expanded={ariaExpanded ? ariaExpanded : false}
    //         >
    //             {this.btnText}
    //         </button>
    //             </label>
    //             {inputElement}
    //         </>
    //     );
    // }
}


// Buttons
export function VyBtn({btnText, onClick, Options}: { btnText: string | JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, Options?: ButtonOptions }) {
    const vyButton = new VyButtonClass(btnText, onClick, Options);
    return vyButton.getButtonElement();
}

export function VyBtnLarge({btnText, onClick, Options}: { btnText: string | JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, Options?: ButtonOptions }) {
    const mOptions = { ...(Options || {}), moreClassNames: (Options?.moreClassNames ?? '') + ' fs-5'} as ButtonOptions;

    const vyButton = new VyButtonClass(btnText, onClick, mOptions);
    return vyButton.getButtonElement();
}

export function VyAnchor({aText, href, Options}: {aText: string | JSX.Element, href: string, Options?: ClickableOptions}) {

    const vyAnchor = new VyAnchorClass(aText, href, Options);
    return vyAnchor.getAnchorElement();
}

export function VyAnchorLarge({aText, href, Options}: {aText: string | JSX.Element, href: string, Options?: ClickableOptions}) {

    const vyAnchor = new VyAnchorClass(aText, href, {...Options, moreClassNames: (Options?.moreClassNames ?? '') + ' fs-5'});
    return vyAnchor.getAnchorElement();
}

// Dropdown button

interface DropdownButtonArgType {
    btnText: string | JSX.Element;
    btnBgClass?: string;
    btnColorClass?: string;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    addDropdownToggle?: boolean;
    dataBsAutoClose?: string;
}

export function VyDropdownBtnLarge({btnText, btnBgClass, btnColorClass, buttonRef, addDropdownToggle = true, dataBsAutoClose}: DropdownButtonArgType) {
    return (
        _clickable({
            clickableText: btnText,
            className: `fs-5 py-1 fw-bold rounded ${btnColorClass ? btnColorClass : 'vy-dark'} ${btnBgClass ? btnBgClass : 'vy-bg-secondary'} vy-clickable ${addDropdownToggle ? 'dropdown-toggle' : ''}`,
            dataBsToggle: 'dropdown',
            dataBsAutoClose: dataBsAutoClose,
            ariaExpanded: false,
            buttonRef: buttonRef
        })
    );
}

export function VyDropdownBtn({btnText, btnBgClass, btnColorClass, buttonRef, addDropdownToggle = true, dataBsAutoClose}: DropdownButtonArgType) {
    return (
        _clickable({
            clickableText: btnText,
            className: `py-1 fw-bold rounded ${btnColorClass ? btnColorClass : 'vy-dark'} ${btnBgClass ? btnBgClass : 'vy-bg-secondary'} vy-clickable ${addDropdownToggle ? 'dropdown-toggle' : ''}`,
            dataBsToggle: 'dropdown',
            dataBsAutoClose: dataBsAutoClose,
            ariaExpanded: false,
            buttonRef: buttonRef
        })
    );
}




// export function VyFeedbackBtnLarge({btnText, bold=false, border=true, btnColorClass, btnBgClass, onClick, message, isError, frameWidthClass}: { btnText: string | JSX.Element, bold?: boolean, border?: boolean, btnBgClass?: string, btnColorClass?: string, onClick: React.MouseEventHandler<HTMLButtonElement>, message?: string, isError?: boolean, frameWidthClass?: string }) {

//     const [lastEvent, setLastEvent] = useState<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

//     const btnOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
//         setLastEvent(event);
//         onClick(event);
//     }

//         if (typeof isError === 'boolean' && lastEvent) {
//             const initialWidth = 5;
//             const btnElement = lastEvent.target as HTMLButtonElement;
    
//             const rippleDiv = document.createElement('div');
//             rippleDiv.className = `vy-ripple-element ripple ${isError ? 'vy-bg-error-br' : 'vy-bg-good-br'}`;
//             rippleDiv.style.left = `${lastEvent.nativeEvent.offsetX - (initialWidth / 2)}px`;
//             rippleDiv.style.top = `${lastEvent.nativeEvent.offsetY - (initialWidth / 2)}px`;
//             btnElement.appendChild(rippleDiv);
    
            
//             setTimeout(() => {
//                 setLastEvent(undefined);
//                 btnElement.removeChild(rippleDiv);
//             }, 2000);
//         }

//     return (
//         <VyFeedbackFrame message={message} isError={isError} sizeClassName={frameWidthClass} preserveFrameHeight={true} frameContent={ _vyBtn({btnText: btnText,  size: 'fs-5', addClassNames:'position-relative', bold: bold, border: border, btnColorClass: btnColorClass, btnBgClass: btnBgClass, onClick: btnOnClick}) } />
//     );
// }
