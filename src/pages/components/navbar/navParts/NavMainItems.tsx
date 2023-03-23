import React from "react";
import { sitemap } from "../../../../sitemap";
import { VyAnchorLarge } from "../../base/vyClickable";
import { defaultLangData } from "../../context/langContext";

export function NavMainItems({langNav, clearanceLevel}: {langNav: typeof defaultLangData.nav, clearanceLevel?: number}) {

    return (
        <div className="navbar-nav vy-bg-secondary rounded align-items-center">
            <VyAnchorLarge aText={langNav.home} href={sitemap.home} Options={{ boldFont: true }} />
            <VyAnchorLarge aText={langNav.browse} href={sitemap.browse} Options={{ boldFont: true }} />
            <VyAnchorLarge aText={langNav.discussions} href={sitemap.discussions.index} Options={{ boldFont: true }} />
            {(clearanceLevel && clearanceLevel <= 7) ? <VyAnchorLarge aText={langNav.upload} href={sitemap.upload} Options={{ boldFont: true }} /> : null}
            {(clearanceLevel && (1 <= clearanceLevel && clearanceLevel <= 2)) ? <VyAnchorLarge aText={langNav.approve} href={sitemap.approve} Options={{ boldFont: true }} /> : null}
            <VyAnchorLarge aText={langNav.character} href={sitemap.tabletop.charSheet} Options={{ boldFont: true }} />
        </div>
    );
}
