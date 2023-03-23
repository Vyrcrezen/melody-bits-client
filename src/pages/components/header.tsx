import React, { useContext } from "react";
import { defaultLangData, LangDataContext } from "./context/langContext";
import { LangDropdown } from "./dropdown/LangDropdown";

export function Header({ setLangData }: { setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>>}) {

    const langData = useContext(LangDataContext);

    return (
        <header className="d-flex flex-row-reverse align-items-center">
            <div className="container d-flex flex-row-reverse" >
                <LangDropdown langData={langData} setLangData={setLangData} />
            </div>
        </header>
    );
}
