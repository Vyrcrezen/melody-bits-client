import React, { useContext } from "react";
import { logoutUser } from "../../../util/functionalities/logout";
import { VyAnchorLarge, VyBtnLarge } from "../../shared/container/vyClickable";
import { defaultLangData, LangDataContext } from "../../../context/langContext";
import _ from 'lodash';
import { sitemap } from "../../../sitemap";
import { getAuthData } from "../../../util/functionalities/opAuthData";

export function UserDropdown() {

    const {nav: { loggedUser: langLogged }} = _.merge({}, defaultLangData, useContext(LangDataContext));
    const authData = getAuthData();
    
    let user_id: string = '0';
    if (authData) {
        user_id = authData.user_id
    }

    return (
        <div className="vy-bg-primary border border-top-0 p-3 vy-border-dark">
            <div className="vy-bg-secondary rounded">
                <div className="pe-5">
                    <VyAnchorLarge aText={langLogged.profile} href={`${sitemap.profile.overview}${user_id}`} />
                    <VyAnchorLarge aText={langLogged.submissions} href={`${sitemap.profile.submissions}${user_id}`} />
                    <VyAnchorLarge aText={langLogged.messages} href="#" />
                    <VyAnchorLarge aText={langLogged.favorites} href="#" />
                </div>
                <div className="text-center mt-2 py-2">
                    <VyBtnLarge btnText={langLogged.logout} onClick={logoutUser} />
                </div>
            </div>
        </div>
    );
}
