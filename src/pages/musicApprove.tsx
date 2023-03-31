import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { divToBody } from "../util/divToBody";

import { PendingMusicList } from "../components/section/container/pendingMusicList";
import { Navbar } from "../components/navigation/container/navbar";
import { HeroTitle } from "../components/text/presentational/heroTitle";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import '../css/musicCard.css'
import { defaultLangData, LangDataContext } from "../context/langContext";
import { initLangFromStorage } from "../util/functionalities/opLang";
import { Header } from "../components/section/container/header";
import { Footer } from "../components/section/container/footer";

function MusicApprove() {
    const [langData, setLangData] = useState(defaultLangData);

    useEffect(() => initLangFromStorage(langData, setLangData));

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <PendingMusicList />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<MusicApprove />);
}
else {
    console.error('Failed to load music-browser. Missing container with id: "music-browser"');
}
