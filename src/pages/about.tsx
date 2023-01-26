import React, { createContext, useState } from "react";
import { createRoot } from "react-dom/client";

import { divToBody } from "../util/divToBody";
import { AboutSummary } from "./about/aboutSummary";
import { Navbar } from "./components/navbar";
import { HeroTitle } from "./components/heroTitle";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { defaultLangData, LangDataContext } from "./components/context/langContext";

function AboutSection() {
    const [langData, setLangData] = useState(defaultLangData);

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <AboutSummary />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<AboutSection />);
}
else {
    console.error('Failed to load about-section. Missing container with id: "about-section"');
}
