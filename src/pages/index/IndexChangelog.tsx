import React from "react";

import { sitemap } from '../../sitemap';
import { VySectionTitle01 } from "../components/base/vySectionTitle01";
import { HighlightCarousel } from "../components/carousel/HighlightCarousel";
import { ChangelogItems } from "../components/text/ChangelogItems";

export function IndexChangelog() {

    return (
        <div className="container d-flex flex-column justify-content-center px-2 py-4 w-100">
            <VySectionTitle01 text="Changelog" />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-xl-9">
                        <ChangelogItems />
                    </div>
                </div>
            </div>
        </div>
    );
}