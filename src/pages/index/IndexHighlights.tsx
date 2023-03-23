import React from "react";

import { sitemap } from '../../sitemap';
import { VySectionTitle01 } from "../components/base/vySectionTitle01";
import { HighlightCarousel } from "../components/carousel/HighlightCarousel";

export function IndexHighlights() {

    return (
        <div className="container d-flex flex-column justify-content-center px-2 py-4 w-100">
            <VySectionTitle01 text="Highlights" />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-xl-9">
                        <HighlightCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
}