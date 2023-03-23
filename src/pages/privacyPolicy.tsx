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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mdPrivacyPolicy from '../media/doc/privacyPolicy.md';

function PrivacyPolicySection() {
    const [langData, setLangData] = useState(defaultLangData);

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <div className="container rounded mt-3 p-3 vy-bg-primary">
                    <ReactMarkdown children={mdPrivacyPolicy} remarkPlugins={[remarkGfm]} />
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
    reactRoot.render(<PrivacyPolicySection />);
}
else {
    console.error('Failed to load index-section. Couldn\'t create container');
}
