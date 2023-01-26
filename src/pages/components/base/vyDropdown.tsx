import React, { useEffect, useRef } from "react";
import { VyDropdownBtn, VyDropdownBtnLarge } from "./vyClickable";

interface DropdownArgumentType {
    btnText: string | JSX.Element;
    dropdownContent: JSX.Element;
    btnBgClass?: string;
    btnColorClass?: string;
    dropdownColorClass?: string;
    dropdownBgClass?: string;
    menuPosition?: 'dropdown-menu-end' | 'dropdown-menu-start';
    buttonRef?: React.RefObject<HTMLButtonElement>;
    addDropdownToggle?: boolean;
    containerClass?: string;
    dataBsAutoClose?: string;
}

export function VyDropdownLarge({ btnText, dropdownContent, btnBgClass, btnColorClass, dropdownColorClass, dropdownBgClass, menuPosition = 'dropdown-menu-end', buttonRef, addDropdownToggle, containerClass, dataBsAutoClose }: DropdownArgumentType) {
    return (
        <div className={`btn-group ${containerClass}`}>
            <VyDropdownBtnLarge btnText={btnText} btnColorClass={btnColorClass} btnBgClass={btnBgClass} buttonRef={buttonRef} addDropdownToggle={addDropdownToggle} dataBsAutoClose={dataBsAutoClose} />
            <div className={`position-absolute m-0 p-0 border-0 dropdown-menu ${menuPosition} rounded-0 ${dropdownBgClass ? dropdownBgClass : 'vy-bg-primary'} ${dropdownColorClass ? dropdownColorClass : ''}`}>
                {dropdownContent}
            </div>
        </div>
    );
}

export function VyDropdown({ btnText, dropdownContent, btnBgClass, btnColorClass, dropdownColorClass, dropdownBgClass, menuPosition = 'dropdown-menu-end', buttonRef, addDropdownToggle, containerClass, dataBsAutoClose }: DropdownArgumentType) {

    return (
        <div className={`btn-group ${containerClass}`}>
            <VyDropdownBtn btnText={btnText} btnColorClass={btnColorClass} btnBgClass={btnBgClass} buttonRef={buttonRef} addDropdownToggle={addDropdownToggle} dataBsAutoClose={dataBsAutoClose} />
            <div className={`position-absolute m-0 p-0 border-0 dropdown-menu ${menuPosition} rounded-0 ${dropdownBgClass ? dropdownBgClass : 'vy-bg-primary'} ${dropdownColorClass ? dropdownColorClass : ''}`}>
                {dropdownContent}
            </div>
        </div>
    );
}
