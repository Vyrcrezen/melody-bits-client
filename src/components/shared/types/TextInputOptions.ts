import InputOptions from "./InputOptions";

export default interface TextInputOptions extends InputOptions {
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: React.FocusEventHandler<HTMLInputElement>;

    labelPos?: 'before' | 'after' | 'none';
    placeholder?: string;
}
