import _ from "lodash";
import React, { useContext, useState } from "react";
import { EnvVariables } from "../../../env";
import { MusicCardData, NameTable } from "../../../models/musicCard";
import { CardFrontOptions } from "../../../types/cardFrontOptions";
import { CardAudioPlayer, CoverImage, MusicCardDetails, MusicOverviewData, MusicOverviewFooter, MusicTitleBar } from "./cardElements";
import { defaultLangData, LangDataContext } from "../../../context/langContext";
import MusicTagButtons from "../presentational/MusicTagButtons";

export function MusicCard({ musicData, authToken, onTagClick, activeTags }: { musicData: MusicCardData, authToken?: string, onTagClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tagItem: NameTable) => void, activeTags?: NameTable[] }) {

    // const hrefRoot = window.location.href.includes('?') ? window.location.href.substring(0, window.location.href.indexOf('?')) : window.location.href;
    const { numPostfix: numPostfixLang, musicCard: musicCardLang } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const [numPlays, setNumPlays] = useState(musicData.num_played);
    const [cardFront, setCardFront] = useState<CardFrontOptions>('overview');

    const getSelectedCardFront = () => {
        if (cardFront === 'details') {
            return (
                <>
                    {/* <!-- Card title --> */}
                    <MusicTitleBar musicData={musicData} authToken={authToken} cardFront={cardFront} setCardFront={setCardFront} />
                    <MusicCardDetails musicData={musicData} musicCardLang={musicCardLang} numPostfixes={numPostfixLang} />
                    {/* <!-- Card Audio Player --> */}
                    <CardAudioPlayer musicData={musicData} authToken={authToken} setNumPlays={setNumPlays} />
                </>
            );
        }
        else if (cardFront === 'comments') {
            return (
                <>
                    {/* <!-- Card title --> */}
                    <MusicTitleBar musicData={musicData} authToken={authToken} cardFront={cardFront} setCardFront={setCardFront} />
                    <div className="h-100">Comments not yet implemented</div>
                    {/* <!-- Card Audio Player --> */}
                    <CardAudioPlayer musicData={musicData} authToken={authToken} setNumPlays={setNumPlays} />
                </>
            );
        }
        else {
            return (
                <>
                    {/* Card Front: Overview */}
                    {/* <!-- Card title --> */}
                    <MusicTitleBar musicData={musicData} authToken={authToken} cardFront={cardFront} setCardFront={setCardFront} />
                    {/* <!-- Card Image --> */}
                    <CoverImage imageSrc={`${EnvVariables.serverAddress}/music-data/cover-image/${musicData.id}`} />
                    {/* <!-- Card Audio Player --> */}
                    <CardAudioPlayer musicData={musicData} authToken={authToken} setNumPlays={setNumPlays} />
                    {/* <!-- Card Details --> */}
                    <MusicOverviewData musicData={musicData} numPlays={numPlays} musicCardLang={musicCardLang} numPostfixLang={numPostfixLang}/>
                    {/* <!-- Card Tags --> */}
                    {/* <MusicTagList musicData={musicData} hrefRoot={hrefRoot} /> */}
                    <MusicTagButtons reactKey={`${musicData.id}`} tags={musicData.tags} onTagClick={onTagClick} activeTags={activeTags} />
                    {/* <!-- Card Footer --> */}
                    <MusicOverviewFooter musicData={musicData} authToken={authToken} musicCardLang={musicCardLang} setCardFront={setCardFront} />
                </>
            );
        }
    }

    return (
        <div className="mx-1 my-3 ">
            {/* <!-- Card Body Template --> */}
            <div className="card vy-music-card vy-primary-bg justify-content-center p-2">
                {getSelectedCardFront()}
            </div>
        </div>
    );
}
