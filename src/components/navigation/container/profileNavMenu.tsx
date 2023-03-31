import React from "react";
import { ClickableOptions, VyAnchorLarge } from "../../shared/container/vyClickable";
import { defaultLangData } from "../../../context/langContext";

import { SvgClose} from '../../../media/svg/svgClose';
import { sitemap } from "../../../sitemap";

export function ProfileNavMenu({ langData, profileId, changeProfileNavState, selectedItem }: { langData: typeof defaultLangData, profileId: string, changeProfileNavState?: React.DispatchWithoutAction, selectedItem?: string }) {

    const { profile: { nav_menu: navMenuLang } } = langData;
    
    const { profile: profileLinks } = sitemap;

    function getElementOptions(elementName: string): ClickableOptions {
        const thisSelected = selectedItem === elementName;
        return {
            backgroundColor: thisSelected ? 'vy-bg-selection' : 'vy-bg-primary',
            boldFont: thisSelected ? true : false,
            color: thisSelected ? 'vy-dark' : 'vy-bright',
            border: false,
            moreClassNames: 'w-100 text-start'
        }
    }

    return (
        <div className="music-filter vy-primary-bg rounded me-lg-2 p-2 pb-4">
            <div className="d-flex flex-row justify-content-between filter-element mb-2">
                <div className="ms-2 fs-3 fw-bold text-center">{navMenuLang.navigation}</div>
                <SvgClose classNames='fs-3 p-1 me-2 rounded lang-icon-size vy-bright w-auto vy-fill-bright vy-clickable' height="100%" onClick={() => { if (changeProfileNavState) changeProfileNavState(); }} />
                {/* <img className="fs-3 p-1 me-2 rounded lang-icon-size vy-bright" alt="" /> */}
            </div>

            <VyAnchorLarge Options={getElementOptions('account')} aText={navMenuLang.account} href={`${profileLinks.overview}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('messages')} aText={navMenuLang.messages} href={`${profileLinks.messages}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('preferences')} aText={navMenuLang.preferences} href={`${profileLinks.prefereces}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('submissions')} aText={navMenuLang.submissions} href={`${profileLinks.submissions}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('favorites')} aText={navMenuLang.favorites} href={`${profileLinks.favorites}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('comments')} aText={navMenuLang.comments} href={`${profileLinks.comments}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('discussions')} aText={navMenuLang.discussions} href={`${profileLinks.discussions}-${profileId}`} />
            <VyAnchorLarge Options={getElementOptions('moderator')} aText={navMenuLang.moderator} href={`${profileLinks.moderator}-${profileId}`} />

        </div>
    );
}
