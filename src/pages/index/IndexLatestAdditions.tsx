import React from "react";
import { VySectionTitle01 } from "../components/base/vySectionTitle01";
import { LatestMusicAddition } from "../components/musicCard/LatestMusicAddition";

export function IndexLatestAdditions() {
    return (
        <div className="container d-flex flex-column justify-content-center px-2 py-4 w-100">
            <VySectionTitle01 text="Latest Additions" />
            <LatestMusicAddition />
        </div>
    );
}
