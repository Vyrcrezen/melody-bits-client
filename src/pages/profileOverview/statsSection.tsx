import React from "react";
import { getDateString } from "../../util/formatTimestring";
import { ProfileData } from "../../util/functionalities/opProfileData";
import { defaultLangData} from "../components/context/langContext";
import { ProfileAccessLevel } from "./profileOverview";

export function StatsSection({profileAccessLevel, profileData, langData} : {profileAccessLevel: ProfileAccessLevel, profileData?: ProfileData, langData: typeof defaultLangData}) {

    const { profile: { overview: langProfile } } = langData;

    return (
        <div className="m-auto p-3 mt-3 vy-primary-bg vy-lone-backdrop">
                <div className="d-flex flex-column justify-content-center align-items-center p-2 pb-2 rounded vy-bg-secondary vy-dark" >
                    {
                        profileAccessLevel === 'editable'
                        ? <div className="w-75 d-flex flex-row justify-content-between">
                            <span>{langProfile.id}:</span>
                            <span className="fw-bold fs-5">{profileData?.user_id}</span>
                        </div>
                        : undefined
                    }

                    {
                        profileAccessLevel === 'editable'
                        ? <div className="w-75 d-flex flex-row justify-content-between">
                            <span>{langProfile.hashId}:</span>
                            <span className="fw-bold fs-5">#{profileData?.hashId}</span>
                        </div>
                        : undefined
                    }

                    <div className="w-75 d-flex flex-row justify-content-between">
                        <span>{langProfile.registrationDate}:</span>
                        <span className="fw-bold fs-5">{getDateString(profileData?.registrationTime)}</span>
                    </div>

                    <div className="w-75 d-flex flex-row justify-content-between">
                        <span>{langProfile.lastOnline}:</span>
                        <span className="fw-bold fs-5">{getDateString(profileData?.lastOnline)}</span>
                    </div>

                    {
                        profileAccessLevel === 'editable'
                        ? <div className="w-75 d-flex flex-row justify-content-between">
                            <span>{langProfile.clearance}:</span>
                            <span className="fw-bold fs-5">{profileData?.clearance}</span>
                        </div>
                        : undefined
                    }

                    <div className="w-75 d-flex flex-row justify-content-between">
                        <span>{langProfile.comments}:</span>
                        <span className="fw-bold fs-5">{profileData?.comment_num ?? 0}</span>
                    </div>

                    <div className="w-75 d-flex flex-row justify-content-between">
                        <span>{langProfile.uploads}:</span>
                        <span className="fw-bold fs-5">{profileData?.uploads ?? 0}</span>
                    </div>

                    <div className="w-75 d-flex flex-row justify-content-between">
                        <span>{langProfile.favorites}:</span>
                        <span className="fw-bold fs-5">{profileData?.favorites ?? 0}</span>
                    </div>
                </div>
            </div>
    );
}
