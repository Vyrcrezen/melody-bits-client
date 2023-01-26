import React, { useRef, useState } from "react";
import { StarGradient } from "../../../media/svg/star-fill";
import { updateMusicRating } from "../../../util/functionalities/updateMusicRating";

export function StarRating({ musicId, ratingScore, ratingsNum, userRating, authToken }: { musicId: number, ratingScore: number, ratingsNum: number, userRating: number, authToken?: string }) {

    const defaultRatingColor = 'rgb(var(--vy-secondary-color))';
    const userRatingColor = 'rgb(var(--vy-selection-color))';

    const [updatedScore, setUpdatedScore] = useState({ ratingScore: ratingScore, userRating: userRating });
    const [dynamicRating, setDynamicRating] = useState({score: updatedScore.ratingScore, color: ( updatedScore.userRating > 0 ? userRatingColor : defaultRatingColor )});

    const getFillPercent = (starNumber: number) => {
        return Math.min(Math.max(((dynamicRating.score - (starNumber - 1)) * 100), 0), 100);
    }

    const starPointerEnter = (event: React.PointerEvent<HTMLButtonElement>, starNumber: number) => {
        setDynamicRating({score: starNumber, color: userRatingColor });
    }

    const starPointerLeave = (event: React.PointerEvent<HTMLButtonElement>, starNumber: number) => {
        setDynamicRating({score: updatedScore.ratingScore, color: ( updatedScore.userRating > 0 ? userRatingColor : defaultRatingColor ) });
    }

    const starClick = (event: React.PointerEvent<HTMLButtonElement>, starNumber: number) => {
        updateMusicRating({ authToken: authToken, musicId: musicId, ratingScore: starNumber })
        .then((result) => {
            if (result.messageCode === 'MD_035') {
                const newRatingScore = (ratingScore > 0) ? Math.max(Math.round(((ratingScore * ratingsNum) - ratingScore) * 10) / 10, 1) : ratingScore;
                setUpdatedScore({
                    ratingScore: newRatingScore,
                    userRating: 0
                });
                setDynamicRating({
                    score: newRatingScore,
                    color: defaultRatingColor
                });
            }
            else {
                const newRatingScore = Math.round((((ratingScore * ratingsNum) + starNumber - (userRating > 0 ? userRating : 0)) / (ratingsNum + (userRating > 0 ? 0 : 1))) * 10) / 10;
                setUpdatedScore({
                    ratingScore: newRatingScore,
                    userRating: starNumber
                });
                setDynamicRating({
                    score: newRatingScore,
                    color: userRatingColor
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="d-flex flex-row">
            <div className="d-flex flex-row mx-2">
                <button
                    className="d-flex align-items-center btn p-0 m-0"
                    type="button"
                    onPointerEnter={(event) => { starPointerEnter(event, 1); }}
                    onPointerLeave={(event) => { starPointerLeave(event, 1); }}
                    onPointerDown={(event) => { starClick(event, 1); }}
                >
                    <StarGradient blankColor="rgb(var(--vy-white-color))" fillColor={dynamicRating.color} fillPercent={getFillPercent(1)} uniqueId={`${musicId}-1`} />
                </button>
                <button
                    className="d-flex align-items-center btn p-0 m-0"
                    type="button"
                    onPointerEnter={(event) => { starPointerEnter(event, 2); }}
                    onPointerLeave={(event) => { starPointerLeave(event, 2); }}
                    onPointerDown={(event) => { starClick(event, 2); }}
                >
                    <StarGradient blankColor="rgb(var(--vy-white-color))" fillColor={dynamicRating.color} fillPercent={getFillPercent(2)} uniqueId={`${musicId}-2`} />
                </button>
                <button
                    className="d-flex align-items-center btn p-0 m-0"
                    type="button"
                    onPointerEnter={(event) => { starPointerEnter(event, 3); }}
                    onPointerLeave={(event) => { starPointerLeave(event, 3); }}
                    onPointerDown={(event) => { starClick(event, 3); }}
                >
                    <StarGradient blankColor="rgb(var(--vy-white-color))" fillColor={dynamicRating.color} fillPercent={getFillPercent(3)} uniqueId={`${musicId}-3`} />
                </button>
                <button
                    className="d-flex align-items-center btn p-0 m-0"
                    type="button"
                    onPointerEnter={(event) => { starPointerEnter(event, 4); }}
                    onPointerLeave={(event) => { starPointerLeave(event, 4); }}
                    onPointerDown={(event) => { starClick(event, 4); }}
                >
                    <StarGradient blankColor="rgb(var(--vy-white-color))" fillColor={dynamicRating.color} fillPercent={getFillPercent(4)} uniqueId={`${musicId}-4`} />
                </button>
                <button
                    className="d-flex align-items-center btn p-0 m-0"
                    type="button"
                    onPointerEnter={(event) => { starPointerEnter(event, 5); }}
                    onPointerLeave={(event) => { starPointerLeave(event, 5); }}
                    onPointerDown={(event) => { starClick(event, 5); }}
                >
                    <StarGradient blankColor="rgb(var(--vy-white-color))" fillColor={dynamicRating.color} fillPercent={getFillPercent(5)} uniqueId={`${musicId}-5`} />
                </button>                
            </div>
            <span>({updatedScore.ratingScore})</span>
        </div>
    );
}