import React from "react";
import { EnvVariables } from "../../../env";

import palceholderImage from '../../../media/img/kelly-sikkema-VyUdiYH5tiY-unsplash.jpg'
import { MusicCardData } from "../../../models/musicCard";
import { sitemap } from "../../../sitemap";
import { CardFrontOptions } from "../../../types/cardFrontOptions";
import { getDateString } from "../../../util/formatTimestring";
import { collapseNumber } from "../../../util/functionalities/collapseNumber";
import { increaseMusicPlayed } from "../../../util/functionalities/increaseMusicPlayed";
import { defaultLangData } from "../../../context/langContext";
import { VyAudio } from "../../widgets/container/vyAudioPlayer";
import { MusicHeart } from "../../shared/presentational/musicHeart";
import { MusicMenu } from "../../navigation/container/musicMenu";
import { StarRating } from "../../widgets/container/starRating";

export function CoverImage({ imageSrc, title, imageId, backgroundId }: { imageSrc?: string, title?: string, imageId?: string, backgroundId?: string }) {

    const titleFinal = title ? title : palceholderImage;
    const srcFinal = imageSrc ? imageSrc : palceholderImage;

    return (
        <div id={backgroundId ?? ''} className="w-100 align-self-center music-image vy-music-card-bg-image" style={{ backgroundImage: `url(${srcFinal})` }}>
            <div className="d-flex justify-content-center h-100 w-100 vy-backdrop-blur-strong">
                <img id={imageId ?? ''} className="h-100 vy-fit-contain vy-mw-100" src={`${srcFinal}`} alt={`card-image-${titleFinal}`} title={titleFinal} />
            </div>
        </div>
    );
}

export function MusicTitleBar({musicData, cardFront, setCardFront, authToken}: {musicData: MusicCardData, cardFront: CardFrontOptions, setCardFront: React.Dispatch<React.SetStateAction<CardFrontOptions>>, authToken?: string }) {
    return (
        <div id="mcard-template-label" className="d-flex rounded-top p-1 justify-content-between vy-black vy-bg-white h-fs-5">
            <MusicMenu authToken={authToken} musicData={musicData} className="w-fs-5" cardFront={cardFront} setCardFront={setCardFront} />
            <span id="mcard-template-title" className="fs-5 text-start">{musicData.title}</span>
            <MusicHeart authToken={authToken} musicData={musicData} />
        </div>
    );
}

export function CardAudioPlayer({musicData, setNumPlays, authToken}: {musicData: MusicCardData, setNumPlays?: React.Dispatch<React.SetStateAction<number>>, authToken?: string }) {
    return (
        <div className="music-audio d-flex align-center">
            <VyAudio
                src={`${EnvVariables.serverAddress}/music-data/music-file/${musicData.id}`}
                onEnded={(event) => {
                    event.currentTarget.play();
                    increaseMusicPlayed({ musicId: musicData.id, authToken: authToken })
                        .then((result) => {
                            if (result.data && typeof +result.data === 'number' && setNumPlays) {
                                setNumPlays(+result.data);
                            }

                        })
                        .catch(err => { });
                }}
            />
        </div>
    )
}

export function MusicOverviewData({ musicData, numPlays, musicCardLang, numPostfixLang }:
    {
        musicData: MusicCardData,
        numPlays: number,
        musicCardLang: typeof defaultLangData.musicCard,
        numPostfixLang: typeof defaultLangData.numPostfix
    }) {
    return (
        <>
            <div className="d-flex flex-row justify-content-between mb-1 mx-2 fw-bold">
                <span>{collapseNumber(numPlays, numPostfixLang)}&nbsp;{musicCardLang.plays}</span>
                <span>Uploader: <a href={`${sitemap.profile.overview}${musicData.uploader.user_id}`}>{musicData.uploader.user_name}</a></span>
            </div>
            <table className="table table-sm m-1 ps-2 vy-white">
                <tbody>
                    <tr>
                        <td className="fs-small vy-w-80px">{musicCardLang.artist}:</td>
                        <td className="text-start">{musicData.artist.name}</td>
                    </tr>
                    <tr>
                        <td className="fs-small vy-w-80px">{musicCardLang.label}:</td>
                        <td className="text-start">{musicData.record_label.name}</td>
                    </tr>

                </tbody>
            </table>
        </>
    );
}

export function MusicOverviewFooter({musicData, authToken, musicCardLang, setCardFront}: {musicData: MusicCardData, authToken?: string,  musicCardLang: typeof defaultLangData.musicCard, setCardFront: React.Dispatch<React.SetStateAction<CardFrontOptions>>, }) {
    return (
        <div className="card-footer d-flex justify-content-between align-items-center p-0">
            <StarRating musicId={musicData.id} ratingScore={musicData.avg_rating ?? 1} ratingsNum={musicData.ratings_num ?? 0} userRating={musicData.user_rating ?? 0} authToken={authToken} />
            <button
                className="align-self-end btn vy-white"
                onClick={() => {
                    setCardFront('comments');
                }}
            >
                {musicCardLang.comments} ({0})
            </button>
        </div>
    );
}

export function MusicCardDetails({ musicData, musicCardLang, numPostfixes }: { musicData: MusicCardData, musicCardLang: typeof defaultLangData.musicCard, numPostfixes: typeof defaultLangData.numPostfix }) {

    function DataTableRow({text, value}: {text: string, value: string}) {
        return (
            <tr>
                <td className="fs-small vy-w-80px">{text}:</td>
                <td className="text-start text-break">{value}</td>
            </tr>
        );
    }

    return (
        <div className="h-100 pe-2 vy-verflow-vertical">
        <table className="table table-sm m-1 ps-2 h-100 vy-white">
            <tbody>
                <DataTableRow text={musicCardLang.uploader} value={musicData.uploader.user_name} />
                <DataTableRow text={musicCardLang.title} value={musicData.title} />
                <DataTableRow text={musicCardLang.artist} value={musicData.artist.name} />
                <DataTableRow text={musicCardLang.label} value={musicData.record_label.name} />
                <DataTableRow text={musicCardLang.publisher} value={musicData.publisher.name} />
                <DataTableRow text={musicCardLang.source} value={musicData.link} />
                <DataTableRow text={musicCardLang.uploaded} value={getDateString(musicData.created_at)} />
                <DataTableRow text={musicCardLang.plays} value={collapseNumber(musicData.num_played, numPostfixes)} />
                <DataTableRow text={musicCardLang.approver} value={""} />
                <DataTableRow text={musicCardLang.tagList} value={musicData.tags.map(item => item.name).join(', ')} />
            </tbody>
        </table>
        </div>
    );
}
