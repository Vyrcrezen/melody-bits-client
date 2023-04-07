import React from "react";
import { sitemap } from "../../../../sitemap";
import VyButton from "../../../shared/presentational/VyButton";
import { defaultLangData } from "../../../../context/langContext";


function ReplyButtonContent(commentSideLang: typeof defaultLangData.musicCard.commentSide) {

    const svgLocation = sitemap.mediaContent.svg;

    return (
        <div className="d-flex flex-row align-items-center">
            <img className="rounded vy-bg-secondary p-1" src={`${svgLocation}/reply.svg`} alt="" />
            <span className="ms-1 vy-secondary">{commentSideLang.reply}</span>
        </div>
    );
}

export default function CommentActions({commentSideLang}: {
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {
    return (
        <div className="d-flex flex-row my-1">
            <VyButton
                btnText={ReplyButtonContent(commentSideLang)}
                onClick={() => { console.log("Now replying..."); }}
                Options={{
                    backgroundColor: 'vy-bg-primary',
                    border: false,
                    padding: 'p-0',
                    moreClassNames: 'ms-1'
                }}
            />
        </div>
    );
}
