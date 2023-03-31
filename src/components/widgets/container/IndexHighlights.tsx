import _ from "lodash";
import React, { useContext } from "react";

import { sitemap } from '../../../sitemap';
import { VySectionTitle01 } from "../../shared/presentational/vySectionTitle01";
import { HighlightCarousel } from "../presentational/HighlightCarousel";
import { defaultLangData, LangDataContext } from "../../../context/langContext";

export function IndexHighlights() {

    const { index: langIndex } = _.merge({}, defaultLangData, useContext(LangDataContext));

    return (
        <div className="container d-flex flex-column justify-content-center px-2 py-4 w-100">
            <VySectionTitle01 text={langIndex.highlights} />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-xl-9">
                        <HighlightCarousel/>
                    </div>
                </div>
            </div>
        </div>
    );
}