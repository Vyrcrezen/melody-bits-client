import React, { FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { divToBody } from "../util/divToBody";
import { HeroTitle } from "./components/heroTitle";
import { Navbar } from "./components/navbar/navbar";
import { MusicUploadForm } from "./musicUpload/musicUploadForm";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import { defaultLangData, LangDataContext } from "./components/context/langContext";
import { initLangFromStorage } from "../util/functionalities/opLang";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function MusicUploadSection() {
    const [langData, setLangData] = useState(defaultLangData);

    useEffect(() => initLangFromStorage(langData, setLangData));

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <MusicUploadForm />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<MusicUploadSection />);
}
else {
    console.error('Failed to load music-upload. Missing container with id: "music-upload"');
}
