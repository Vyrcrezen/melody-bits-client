export default interface InputOptions {
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
