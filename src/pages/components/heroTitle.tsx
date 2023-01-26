import React, { useRef } from "react";

export function HeroTitle() {
    const containerStyle: React.CSSProperties = {
        height: '10vh',
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center rounded-top mt-4 mb-0" style={containerStyle}>
            <h1 className="display-3 m-0 fw-bold">Melody Bits</h1>
        </div>
    );
}
