import React, { FormEvent, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';

import { divToBody } from "../util/divToBody";
import { RegisterForm } from "../components/auth/container/registerForm";
import { Navbar } from "../components/navigation/container/navbar";
import { HeroTitle } from "../components/text/presentational/heroTitle";
import { defaultLangData, LangDataContext } from "../context/langContext";
import { initLangFromStorage } from "../util/functionalities/opLang";
import { Header } from "../components/section/container/header";
import { Footer } from "../components/section/container/footer";

function RegisterSection() {
    const [langData, setLangData] = useState(defaultLangData);

    useEffect(() => initLangFromStorage(langData, setLangData));

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <RegisterForm />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<RegisterSection />);
}
else {
    console.error('Failed to load register-section. Missing container with id: "register-section"');
}
