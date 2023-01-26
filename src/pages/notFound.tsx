import React from "react";
import { createRoot } from "react-dom/client";

import { divToBody } from "../util/divToBody";
import { Navbar } from "./components/navbar";
import { HeroTitle } from "./components/heroTitle";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'normalize.css';

import '../css/style.css';

function NotFoundSection() {
    return (
        <>
            <HeroTitle />
            <Navbar />
            <div className="container my-5 text-center">
                <span className="fs-2" >404 Page not found!</span>
            </div>
        </>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<NotFoundSection />);
}
else {
    console.error('Failed to load about-section. Missing container with id: "about-section"');
}
