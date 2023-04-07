import React from "react";
import { defaultLangData } from "../../../../context/langContext";

export default function CommentPoster({commentSideLang}: {
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {
    return (
        <div className="">
            <div className="d-inline-block rounded fw-bold px-2 py-1 vy-bg-bright vy-dark">
                <span className="me-1 fst-italic vy-selection">Dev</span>
                <span className="">Vyr</span>
            </div>
            <span className="ps-2 vy-secondary">3d</span>
        </div>
    );
}
