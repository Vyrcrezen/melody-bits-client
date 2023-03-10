import _ from "lodash";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { getProfileId } from "../../util/functionalities/getProfileId";
import { getAuthData } from "../../util/functionalities/opAuthData";
import { getProfileData, ProfileData } from "../../util/functionalities/opProfileData";
import { VyBtn } from "../components/base/vyClickable";
import { MinimizedPanelBar } from "../components/complex/minimizedPanelBar";
import { ProfileNavMenu } from "../components/complex/profileNavMenu";
import { defaultLangData, LangDataContext } from "../components/context/langContext";
import { BioSection } from "./bioSection";
import { MainSection } from "./mainSection";
import { StatsSection } from "./statsSection";

export type ProfileAccessLevel = 'editable' | 'full' | 'public';

export function ProfileOverview() {
    const [profileData, setProfileData] = useState<ProfileData>();
    const [profileNavOpen, changeProfileNavState] = useReducer((profileNavOpen) => {
        return !profileNavOpen;
    }, true);

    const langData = _.merge({}, defaultLangData, useContext(LangDataContext));
    const authData = getAuthData();
    const profileId = getProfileId();

    const profileAccessLevel: ProfileAccessLevel = authData?.user_id === profileId ? 'editable' : (authData?.user_id === '1' || authData?.user_id == '2') ? 'full' : 'public';

    useEffect(() => {
        if (profileId && !profileData) {
            getProfileData(profileId, authData?.token)
                .then(result => {
                    setProfileData(result.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    });

    return (
        <div className="container d-flex flex-column mt-2">

            <div className="container d-flex flex-row mt-2">
                {
                    profileNavOpen
                        ? <ProfileNavMenu changeProfileNavState={changeProfileNavState} profileId={profileId ?? '0'} langData={langData} selectedItem='account' />
                        : null
                }

                <div className="d-flex flex-column m-auto">
                    {
                        profileNavOpen
                            ? null
                            : <div className="mb-2">
                                <MinimizedPanelBar buttons={[
                                    <VyBtn key={'mini-bar-nav-btn'} btnText={langData.profile.nav_menu.navigation} onClick={() => { changeProfileNavState(); }} />
                                ]} />
                            </div>
                    }

                    <MainSection authData={authData} profileAccessLevel={profileAccessLevel} profileData={profileData} langData={langData} />
                    <StatsSection profileAccessLevel={profileAccessLevel} profileData={profileData} langData={langData} />
                    <BioSection authData={authData} profileAccessLevel={profileAccessLevel} profileData={profileData} langData={langData} />
                </div>
            </div>
        </div>
    );
}