import React, { useState } from "react";
import VyButton from "../../shared/presentational/VyButton";
import { sitemap } from "../../../sitemap";
import { defaultLangData } from "../../../context/langContext";

function ClosedCommentEditor({isEditorOpen, setIsEditorOpen, commentSideLang}: {
    isEditorOpen: boolean,
    setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>,
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {
    return (
        <div className="py-1 vy-bg-primary">
            <VyButton
                btnText={commentSideLang.writeComment}
                onClick={() => {
                    console.log('Now opening the editor...');
                    setIsEditorOpen(!isEditorOpen);
                }}
                Options={{
                    border: false
                }}
            />
        </div>
    );
}

function OpenCommentEditor({isEditorOpen, setIsEditorOpen, commentSideLang}: {
    isEditorOpen: boolean,
    setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>,
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {

    const svgLocation = sitemap.mediaContent.svg;

    const closeButtonSvg = (
        <img className="" src={`${svgLocation}/hamburger-menu-close.svg`} alt="" />
    );

    return (
        <div className="d-flex flex-column w-100">
            <div className="d-flex flex-row mb-1">
                <div className="text-start w-100">
                    <span>{commentSideLang.replyingTo}</span>
                    <span className="fw-bold ms-1">Vyr</span>
                </div>
                <VyButton
                    btnText={closeButtonSvg}
                    onClick={() => {
                        setIsEditorOpen(!isEditorOpen);
                    }}
                    Options={{
                        moreClassNames: 'w-fs-5',
                        border: false,
                        padding: 'py-0'
                    }}
                />
            </div>
            <div>
                <textarea className="rounded w-100" name="" id="" rows={7}></textarea>
            </div>
            <div className="d-flex flex-column align-items-center">
                <VyButton
                    btnText={commentSideLang.send}
                    onClick={() => {
                        console.log('Now sending the comment...');
                    }}
                    Options={{
                        border: false,
                        padding: 'px-3 py-2'
                    }}
                />
            </div>
        </div>
    );
}

export default function CommentEditor({commentSideLang}: {
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {

    const [isEditorOpen, setIsEditorOpen] = useState(false);

    return (
        <div className="d-flex flex-column align-items-center my-1">
            {
                isEditorOpen
                ? <OpenCommentEditor isEditorOpen={isEditorOpen} setIsEditorOpen={setIsEditorOpen} commentSideLang={commentSideLang} />
                : <ClosedCommentEditor isEditorOpen={isEditorOpen} setIsEditorOpen={setIsEditorOpen} commentSideLang={commentSideLang} />
            }
        </div>
    );
}
