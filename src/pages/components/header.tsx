import React, { useContext } from "react";
import { VyDropdownLarge } from "./base/vyDropdown";

 import langSvg from '../../media/svg/translate.svg'
import { VyAnchor, VyBtn } from "./base/vyClickable";
import { defaultLangData, LangDataContext } from "./context/langContext";
import { conditionallyUpdateLangData } from "../../util/functionalities/opLang";

export function Header({ setLangData }: { setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>>}) {

    const langData = useContext(LangDataContext);
    const capitalizedLang = langData.lang[0].toUpperCase() + langData.lang.substring(1, langData.lang.length);

    const btnContent = (
        <span>
            <img className="fs-3 p-1 me-2 rounded lang-icon-size" src={langSvg} alt="" />
            {capitalizedLang}
        </span>
    );

    const btnStyleOptions = {color: 'vy-bright', backgroundColor: 'vy-bg-primary', border: false};

    const langOptions = (
        <div className="d-flex flex-column">
            <VyBtn btnText='De (Deutch)' Options={btnStyleOptions} onClick={() => conditionallyUpdateLangData(langData, 'de', setLangData)} />
            <VyBtn btnText='En (English)' Options={btnStyleOptions} onClick={() => conditionallyUpdateLangData(langData, 'en', setLangData)} />
            <VyBtn btnText='Es (Español)' Options={btnStyleOptions} onClick={() => conditionallyUpdateLangData(langData, 'es', setLangData)} />
            <VyBtn btnText='Hu (Magyar)' Options={btnStyleOptions} onClick={() => conditionallyUpdateLangData(langData, 'hu', setLangData)} />
            <VyBtn btnText='Jp (日本語)' Options={btnStyleOptions} onClick={() => conditionallyUpdateLangData(langData, 'jp', setLangData)} />
        </div>
    );

    return (
        <header className="d-flex flex-row-reverse align-items-center">
            <div className="container d-flex flex-row-reverse" >
                <VyDropdownLarge btnText={btnContent} dropdownContent={langOptions} btnBgClass='vy-bg-primary' btnColorClass="vy-bright" dropdownBgClass="vy-z-over-nav vy-bg-primary" />
            </div>
        </header>
    );
}
