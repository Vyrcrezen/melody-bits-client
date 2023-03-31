import ClickableOptions from "./ClickableOptions";

export interface ButtonOptions extends ClickableOptions {
    ariaExpanded?: boolean;
    buttonRef?: React.RefObject<HTMLButtonElement>;
    isDisabled?: boolean;
    isNoninteractable?: boolean;
    skipBtnClass?: boolean;

    dataBsToggle?: string;
    dataBsAutoClose?: string;
}