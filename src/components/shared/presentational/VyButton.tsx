import React from "react";
import { ButtonOptions } from "../types/ButtonOptions";

export default function VyButton({btnText, onClick, Options}: { btnText: string | JSX.Element, onClick: React.MouseEventHandler<HTMLButtonElement>, Options?: ButtonOptions}) {

    const { boldFont, backgroundColor, color, border, isPill, moreClassNames, padding, isNoninteractable, dataBsToggle, ariaExpanded, dataBsAutoClose, buttonRef, reactKey, isDisabled, skipBtnClass=true } = Options ?? {};

    const classNames = [
        padding ? padding : 'py-1',
        isNoninteractable ? 'vy-btn-intert' : 'vy-clickable',
        isNoninteractable || skipBtnClass ? '' : 'btn',
        boldFont ? 'fw-bold' : '',
        backgroundColor ? backgroundColor : 'vy-bg-secondary',
        color ? color : 'vy-dark',
        border === false ? '' : 'border border-2 vy-border-dark',
        isPill ? 'rounded-pill' : 'rounded',
        moreClassNames ?? '',
    ];

    return (
        <button
            type="button"
            disabled={isDisabled ?? undefined}
            key={reactKey ?? null}
            ref={buttonRef ?? null}
            className={classNames.join(' ')}
            data-bs-toggle={dataBsToggle ? dataBsToggle : null}
            aria-expanded={ariaExpanded ? ariaExpanded : false}
            data-bs-auto-close={dataBsAutoClose ?? null}
            onClick={onClick}
        >
            {btnText}
        </button>
    );
}