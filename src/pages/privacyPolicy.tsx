import React, { lazy, Suspense, useState } from "react";
import { createRoot } from "react-dom/client";

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


const MarkdownDisplayer = lazy(() => import('../components/text/container/MarkdownFromUrl') );

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
                    <Suspense fallback={<div>Loading...</div>}>
                        <MarkdownDisplayer mdUrl={'../media/doc/privacyPolicy.md'} />
                    </Suspense>
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
