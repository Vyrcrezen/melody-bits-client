import React, { useState } from "react";
import { MusicCardData } from "../../../models/musicCard";
import { updateFavoriteMusic } from "../../../util/functionalities/updateFavoriteMusic";

import heartFilled from '../../../media/svg/heart-filled.svg';
import heartEmpty from '../../../media/svg/heart-empty.svg';

export function MusicHeart({ authToken, musicData }: { authToken?: string, musicData: MusicCardData }) {
    let HeartElement: JSX.Element;

    const [isHearted, setIsHearted] = useState(musicData.is_favorite);

    if (isHearted) {
        HeartElement = (
            <button type="button" className="btn p-1">
                <img
                    src={heartFilled}
                    alt=""
                    onClick={() => {
                        if (musicData.id) {
                            updateFavoriteMusic({ authToken: authToken, musicId: musicData.id, isFavorite: false })
                            .then(result => {
                                console.log(result);
                                console.log('Setting isHearted to false');
                                setIsHearted(false);
                            })
                            .catch(err => {

                            });
                        }
                    }}
                />
            </button>
        );
    }
    else {
        HeartElement = (
            <button className="btn p-1">
                <img
                    src={heartEmpty}
                    alt=""
                    onClick={() => {
                        if (musicData.id) {
                            updateFavoriteMusic({ authToken: authToken, musicId: musicData.id, isFavorite: true })
                            .then(result => {
                                console.log(result);
                                console.log('Setting isHearted to true');
                                setIsHearted(true);
                            })
                            .catch(err => {

                            });
                        }
                    }}
                />
            </button>);
    }

    return (HeartElement);
}
