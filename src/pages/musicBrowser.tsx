import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import '../css/musicCard.css'

import { divToBody } from "../util/divToBody";
import { Navbar } from "./components/navbar";
import { HeroTitle } from "./components/heroTitle";
import { defaultLangData, LangDataContext } from "./components/context/langContext";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { initLangFromStorage } from "../util/functionalities/opLang";
import { BrowserSection } from "./musicBrowser/browserSection";

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
