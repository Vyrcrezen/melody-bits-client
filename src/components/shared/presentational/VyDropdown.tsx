import React from "react";
import VyButton from "./VyButton";
import { ButtonOptions } from "../types/ButtonOptions";

interface DropdownOptions {
    containerClass?: string;
    menuPosition?: 'dropdown-menu-end' | 'dropdown-menu-start';
    backgroundColor?: string;
    color?: string;
    content?: string | JSX.Element;
    skipDropdownToggle?: boolean;

}

// export function VyDropdown({ btnText, btnOptions, dropdownOptions dropdownContent, btnBgClass, btnColorClass, dropdownColorClass, dropdownBgClass, menuPosition = 'dropdown-menu-end', buttonRef, containerClass, dataBsAutoClose, moreClassNames }: DropdownArgumentType) {
export function VyDropdown({ btnText, btnOptions, dropdownOptions }: { btnText: string | JSX.Element, btnOptions?: ButtonOptions, dropdownOptions?: DropdownOptions }) {

    const buttonOptions: ButtonOptions = Object.assign({}, btnOptions, {
        dataBsAutoClose: btnOptions?.dataBsAutoClose ?? 'inside',
        dataBsToggle: 'dropdown',
        moreClassNames: `${dropdownOptions?.skipDropdownToggle ? '' : 'dropdown-toggle'} ${btnOptions?.moreClassNames ?? ''}`
    });
    
    const dropdownPanelClassnames = [
        'position-absolute m-0 p-0 border-0 dropdown-menu rounded-0',
        dropdownOptions?.menuPosition ?? 'dropdown-menu-start',
        dropdownOptions?.backgroundColor ? dropdownOptions?.backgroundColor : 'vy-bg-primary',
        dropdownOptions?.color ? dropdownOptions?.color : ''
    ];

    return (
        <div className={`btn-group ${dropdownOptions?.containerClass ?? ''}`}>
            <VyButton
                btnText={btnText}
                onClick={() => { }}
                Options={buttonOptions}
            />

            <div className={dropdownPanelClassnames.join(' ')}>
                {dropdownOptions?.content}
            </div>
        </div>
    );
}

