import React from "react";
import VyButton from "../../../shared/presentational/VyButton";
import { defaultLangData } from "../../../../context/langContext";

export default function CommentReplies({commentSideLang}: {
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {
    return (
        <div className="d-flex flex-row justify-content-center">
            <VyButton
                btnText={commentSideLang.loadReplies}
                onClick={() => { console.log("Now loading replies..."); }}
                Options={{
                    border: false,
                    isPill: true
                }}
            />
        </div>
    );
}
