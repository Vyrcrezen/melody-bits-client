import _ from "lodash";
import React, { useContext } from "react";
import { defaultLangData, LangDataContext } from "../../../context/langContext";
import { VySectionTitle01 } from "../../shared/presentational/vySectionTitle01";
import { LatestMusicAddition } from "./LatestMusicAddition";

export function IndexLatestAdditions() {
    const { index } = _.merge({}, defaultLangData, useContext(LangDataContext));
    
    return (
        <div className="container d-flex flex-column justify-content-center px-2 py-4 w-100">
            <VySectionTitle01 text={index.latestAdditions} />
            <LatestMusicAddition />
        </div>
    );
}
