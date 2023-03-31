import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

import { divToBody } from "../util/divToBody";
import { HeroTitle } from "../components/text/presentational/heroTitle";
import { Navbar } from "../components/navigation/container/navbar";

import { Header } from "../components/section/container/header";
import { Footer } from "../components/section/container/footer";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';
import { defaultLangData, LangDataContext } from "../context/langContext";
import mdTermsAndRules from '../media/doc/termsAndRules.md';

function TermsAndRulesSection() {
    const [langData, setLangData] = useState(defaultLangData);

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <div className="container rounded mt-3 p-3 vy-bg-primary">
                    <ReactMarkdown children={mdTermsAndRules} remarkPlugins={[remarkGfm]} />
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
    reactRoot.render(<TermsAndRulesSection />);
}
else {
    console.error('Failed to load index-section. Couldn\'t create container');
}
