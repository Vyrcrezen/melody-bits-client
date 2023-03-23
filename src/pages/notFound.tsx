import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import { divToBody } from "../util/divToBody";
import { HeroTitle } from "./components/heroTitle";
import { Navbar } from "./components/navbar/navbar";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import { defaultLangData, LangDataContext } from "./components/context/langContext";

function NotFoundSection() {
    const [langData, setLangData] = useState(defaultLangData);

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <div className="container">
                    404, Not Found!
                </div>
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const indexContainer = divToBody();

if (indexContainer) {
    const reactRoot = createRoot(indexContainer);
    reactRoot.render(<NotFoundSection />);
}
else {
    console.error('Failed to load index-section. Couldn\'t create container');
}
