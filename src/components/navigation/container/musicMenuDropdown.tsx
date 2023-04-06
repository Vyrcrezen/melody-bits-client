import React, { useContext } from "react";
import { logoutUser } from "../../../util/functionalities/logout";
import { VyAnchorLarge, VyBtn, VyBtnLarge } from "../../shared/container/vyClickable";
import { defaultLangData, LangDataContext } from "../../../context/langContext";
import _ from 'lodash';
import { sitemap } from "../../../sitemap";
import { getAuthData } from "../../../util/functionalities/opAuthData";
import { CardFrontOptions } from "../../../types/cardFrontOptions";
import { MusicCardData } from "../../../models/musicCard";
import { deleteMusic } from "../../../util/functionalities/deleteMusic";
import HamburgerAnimation from "../../shared/util/HamburgerAnimation";

export function MusicMenuDropdown({ authToken, musicData, cardFront, setCardFront, hamburgerAnimation }: {
    authToken?: string,
    musicData: MusicCardData,
    cardFront: CardFrontOptions,
    setCardFront: React.Dispatch<React.SetStateAction<CardFrontOptions>>,
    hamburgerAnimation?: HamburgerAnimation
}) {

    const {musicCard: { menu: menuLang }} = _.merge({}, defaultLangData, useContext(LangDataContext));
    const authData = getAuthData();
    
    let user_id: string = '0';
    let user_clearance = 8;
    if (authData) {
        user_id = authData.user_id,
        user_clearance = authData.clearance
    }

    const editActionCleared = musicData.uploader.user_id === user_id;
    const deleteActionCleared = musicData.uploader.user_id === user_id || user_clearance === 1 || user_clearance === 2;

    return (
        <div className="vy-bg-primary border border-top-0 p-3 vy-border-dark">
            <div className="vy-bg-secondary rounded">
                <div className="pe-5">
                    <VyBtn
                        btnText={menuLang.overview}
                        Options={{ border: false }}
                        onClick={() => {
                            hamburgerAnimation?.playCloseAnim();
                            if (cardFront !== 'overview') {
                                setCardFront("overview");
                            }
                        }}
                    />
                    <VyBtn
                        btnText={menuLang.details}
                        Options={{ border: false }}
                        onClick={() => {                            
                            hamburgerAnimation?.playCloseAnim();
                            if (cardFront !== 'details') {
                                setCardFront("details");
                            }
                        }}
                    />
                    <VyBtn
                        btnText={menuLang.comments}
                        Options={{ border: false }}
                        onClick={() => {                            
                            hamburgerAnimation?.playCloseAnim();
                            if (cardFront !== 'comments') {
                                setCardFront("comments");
                            }
                        }}
                    />
                    <VyBtn
                        btnText={menuLang.report}
                        Options={{ border: false }}
                        onClick={() => {

                        }}
                    />
                    {
                        deleteActionCleared
                            ? <VyBtn
                                btnText={menuLang.edit}
                                Options={{ border: false }}
                                onClick={() => {
                                    window.location.href = `${sitemap.musicEdit}${musicData.id}`;
                                }}
                            />
                            : undefined
                    }
                    {
                        deleteActionCleared
                            ? <VyBtn
                                btnText={menuLang.delete}
                                Options={{ border: false }}
                                onClick={() => {
                                    deleteMusic({ authToken: authToken, musicId: musicData.id});
                                }}
                            />
                            : undefined
                    }

                </div>
            </div>
        </div>
    );
}
