import React from "react";
import { ehUpdateLangData } from "../../../util/functionalities/opLang";
import { VyBtn } from "../../shared/container/vyClickable";
import { VyDropdown } from "../../shared/presentational/VyDropdown";
import { defaultLangData } from "../../../context/langContext";

import { sitemap } from "../../../sitemap";

function LangDropdownItems({langData, setLangData}: { langData: typeof defaultLangData, setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>> }) {
    const btnStyleOptions = {color: 'vy-bright', backgroundColor: 'vy-bg-primary', border: false};

    return (
        <div className="d-flex flex-column">
            <VyBtn btnText='De (Deutch)' Options={btnStyleOptions} onClick={ehUpdateLangData(langData, 'de', setLangData)} />
            <VyBtn btnText='En (English)' Options={btnStyleOptions} onClick={ehUpdateLangData(langData, 'en', setLangData)} />
            <VyBtn btnText='Es (Español)' Options={btnStyleOptions} onClick={ehUpdateLangData(langData, 'es', setLangData)} />
            <VyBtn btnText='Hu (Magyar)' Options={btnStyleOptions} onClick={ehUpdateLangData(langData, 'hu', setLangData)} />
            <VyBtn btnText='Jp (日本語)' Options={btnStyleOptions} onClick={ehUpdateLangData(langData, 'jp', setLangData)} />
        </div>
    );
}

export function LangDropdown({langData, setLangData}: { langData: typeof defaultLangData, setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>> }) {
    const capitalizedLang = langData.lang[0].toUpperCase() + langData.lang.substring(1, langData.lang.length);

    const svgLocation = sitemap.mediaContent.svg;

    const btnContent = (
        <span>
            <img className="fs-3 p-1 me-2 rounded lang-icon-size" src={`${svgLocation}/translate.svg`} alt="" />
            {capitalizedLang}
        </span>
    );

    return (
        <VyDropdown
            btnText={btnContent}
            btnOptions={{
                moreClassNames: 'fs-5',
                color: "vy-bright",
                backgroundColor: 'vy-bg-primary',
                skipBtnClass: true
            }}
            dropdownOptions={{
                backgroundColor: 'vy-z-over-nav vy-bg-primary',
                menuPosition: 'dropdown-menu-end',
                content:LangDropdownItems({langData: langData, setLangData: setLangData})
            }}
        />
    );
}
