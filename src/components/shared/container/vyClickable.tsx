import React from "react";

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
