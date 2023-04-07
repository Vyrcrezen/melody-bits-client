import React, { useEffect, useRef, useState } from "react";
import { VyDropdown } from "../../../shared/presentational/VyDropdown";
import HamburgerAnimation from "../../../shared/util/HamburgerAnimation";
import VyButton from "../../../shared/presentational/VyButton";
import { defaultLangData } from "../../../../context/langContext";

function CommentHamburgerContent({hamburgerAnimation, commentSideLang}: {
    hamburgerAnimation?: HamburgerAnimation,
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {
    return (
        <div className="border p-3 vy-border-dark justify-content-end vy-bg-primary">
            <div className="d-flex flex-column justify-content-end vy-bg-secondary rounded">
                <VyButton
                    btnText={commentSideLang.report}
                    onClick={() => {
                        hamburgerAnimation?.playCloseAnim();
                        console.log('Comment successfully reported');
                    }}
                    Options={{
                        border: false
                    }}
                />
                <VyButton
                    btnText={commentSideLang.edit}
                    onClick={() => {
                        hamburgerAnimation?.playCloseAnim();
                        console.log('Editing comment');
                    }}
                    Options={{
                        border: false
                    }}
                />
                <VyButton
                    btnText={commentSideLang.delete}
                    onClick={() => {
                        hamburgerAnimation?.playCloseAnim();
                        console.log('Deleting comment');
                    }}
                    Options={{
                        border: false
                    }}
                />
            </div>
        </div>
    );
}

export default function CommentHamburger({commentSideLang}: {
    commentSideLang: typeof defaultLangData.musicCard.commentSide
}) {

    const elMenuButton = useRef<HTMLButtonElement>(null);
    const [hamburgerAnimation, setHamburgerAnimation] = useState<HamburgerAnimation>();

    useEffect(() => {
        if (elMenuButton.current && !hamburgerAnimation) {
            setHamburgerAnimation(new HamburgerAnimation(elMenuButton.current));
        }
    });

    return (
        <div>
            <VyDropdown
                btnText=''
                btnOptions={{
                    border: false,
                    buttonRef: elMenuButton,
                    padding: 'py-0',
                    moreClassNames: 'w-fs-5'
                }}
                dropdownOptions={{
                    content: CommentHamburgerContent({ hamburgerAnimation: hamburgerAnimation, commentSideLang: commentSideLang }),
                    menuPosition: "dropdown-menu-end",
                    backgroundColor: 'vy-bg-primary',
                    skipDropdownToggle: true,
                    color: 'vy-dark',
                }}
            />
        </div>
    );
}
