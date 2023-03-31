import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import '../css/musicCard.css'

import { divToBody } from "../util/divToBody";
import { Navbar } from "../components/navigation/container/navbar";
import { HeroTitle } from "../components/text/presentational/heroTitle";
import { defaultLangData, LangDataContext } from "../context/langContext";
import { Header } from "../components/section/container/header";
import { Footer } from "../components/section/container/footer";
import { initLangFromStorage } from "../util/functionalities/opLang";
import { BrowserSection } from "../components/section/container/musicBrowser";

function MusicBrowser() {

    const [langData, setLangData] = useState(defaultLangData);

    useEffect(() => initLangFromStorage(langData, setLangData));

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <BrowserSection />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<MusicBrowser />);
}
else {
    console.error('Failed to load music-browser. Missing container with id: "music-browser"');
}
