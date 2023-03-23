import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { divToBody } from "../util/divToBody";
import { initLangFromStorage } from "../util/functionalities/opLang";

import { HeroTitle } from "./components/heroTitle";
import { Navbar } from "./components/navbar/navbar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { IndexHighlights } from "./index/IndexHighlights";
import { IndexChangelog } from "./index/IndexChangelog";
import { IndexLatestAdditions } from "./index/IndexLatestAdditions";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'normalize.css';

import '../css/style.css';
import '../css/musicCard.css'
import { defaultLangData, LangDataContext } from "./components/context/langContext";

function IndexSection() {
    const [langData, setLangData] = useState(defaultLangData);

    useEffect(() => initLangFromStorage(langData, setLangData));

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <IndexHighlights />
                <IndexChangelog />
                <IndexLatestAdditions />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const indexContainer = divToBody();

if (indexContainer) {
    const reactRoot = createRoot(indexContainer);
    reactRoot.render(<IndexSection />);
}
else {
    console.error('Failed to load index-section. Couldn\'t create container');
}
