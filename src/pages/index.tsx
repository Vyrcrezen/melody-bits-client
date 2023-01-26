import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import { divToBody } from "../util/divToBody";
import { HeroTitle } from "./components/heroTitle";
import { Navbar } from "./components/navbar";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { IndexCarousel } from "./index/carousel";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import { defaultLangData, LangDataContext } from "./components/context/langContext";

function IndexSection() {
    const [langData, setLangData] = useState(defaultLangData);

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <IndexCarousel />
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
