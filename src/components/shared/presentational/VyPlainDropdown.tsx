import React from "react";

interface PlainDropdownOptions {
    label?: string;
    labelPos?: 'before' | 'none' | 'after';
    name?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

interface DropdownItem {
    key: string;
    value: string;
    name: string;
}

function _getDropdownItems(itemList: DropdownItem[]) {
    const tagOptions = [];

    // tagOptions.push(<option className="d-none" selected disabled hidden value=''></option>);
    tagOptions.push(<option className="d-none" key={`${0}-`} disabled hidden value=''></option>);

    tagOptions.push(...itemList.map((item) => {
        return (
            <option key={`${item.key}`} value={item.name}>{item.name}</option>
        )
    }));
    return tagOptions;
}

export default function VyPlainDropdown({ itemList, Options }: { itemList: DropdownItem[], Options?: PlainDropdownOptions }) {

    const { label, labelPos = 'before', name, defaultValue, onChange } = Options ?? {};

    return (
        <>
            <div>{label}</div>
            <select defaultValue={defaultValue} name={name} onChange={onChange} >
                {_getDropdownItems(itemList)}
            </select>
        </>
    );
}
