import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';

import { divToBody } from "../util/divToBody";
import { LoginForm } from "./login/loginForm";
import { Navbar } from "./components/navbar/navbar";
import { HeroTitle } from "./components/heroTitle";
import { defaultLangData, LangDataContext } from "./components/context/langContext";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { initLangFromStorage } from "../util/functionalities/opLang";

function LoginSection() {
    const [langData, setLangData] = useState(defaultLangData);

    useEffect(() => initLangFromStorage(langData, setLangData));

    return (
        <LangDataContext.Provider value={langData}>
        <div className='footer-container'>
            <div>
                <Header setLangData={setLangData} />
                <HeroTitle />
                <Navbar />
                <LoginForm />
            </div>
            <Footer />
        </div>
        </LangDataContext.Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<LoginSection />);
}
else {
    console.error('Failed to load login-section. Missing container with id: "login-section"');
}
