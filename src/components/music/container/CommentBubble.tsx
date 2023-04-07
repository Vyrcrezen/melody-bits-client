import React from "react";
import CommentPoster from "../presentational/CommentBubble/CommentPoster";
import CommentHamburger from "../presentational/CommentBubble/CommentHamburger";
import CommentText from "../presentational/CommentBubble/CommentText";
import CommentActions from "../presentational/CommentBubble/CommentActions";
import CommentReplies from "../presentational/CommentBubble/CommentReplies";
import { defaultLangData } from "../../../context/langContext";

export default function CommentBubble({commentSideLang, timePostfixLang}: {
    commentSideLang: typeof defaultLangData.musicCard.commentSide
    timePostfixLang: typeof defaultLangData.timePostfix
}) {
    return (
        <div className="d-flex flex-column h-100 vy-verflow-vertical mx-1 my-2">
            <div className="d-flex flex-row my-2 justify-content-between">
                <CommentPoster commentSideLang={commentSideLang} />
                <CommentHamburger commentSideLang={commentSideLang} />
            </div>
            <CommentText />
            <CommentActions commentSideLang={commentSideLang} />
            <CommentReplies commentSideLang={commentSideLang} />
        </div>
    );
}
