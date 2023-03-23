import React, { useCallback, useContext, useState } from "react";
import { getAuthData } from "../../../util/functionalities/opAuthData";
import { defaultLangData, LangDataContext } from "../context/langContext";
import { merge as loMerge } from 'lodash';
import { NavToggleButton } from "./navParts/NavToggleButton";
import { NavMainItems } from "./navParts/NavMainItems";
import { NavUserItem } from "./navParts/NavUserItem";

export function Navbar() {
    const [authData, setAuthData] = useState<{ username: string, clearance: number }>();

    if (!authData) {
        const retrievedAuthData = getAuthData();
        if (retrievedAuthData) {
            setAuthData(retrievedAuthData);
        }
    }

    const { nav: langNav } = loMerge({}, defaultLangData, useContext(LangDataContext));

    const MemoizedNav = useCallback(() => {
        return (
            <nav className="navbar navbar-expand-xl p-0 navbar-light sticky-top vy-primary-bg">
                <div className="container-lg d-flex flex-row p-0 rounded vy-secondary-bg vy-nav-area">
                    <NavToggleButton />

                    <div className="offcanvas offcanvas-start vy-bg-primary" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header vy-bg-secondary">
                            <h5 className="offcanvas-title vy-dark" id="offcanvasNavbarLabel">Web-music</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body p-0">
                            <NavMainItems langNav={langNav} clearanceLevel={authData?.clearance} />
                        </div>
                    </div>

                    <div className="navbar-nav h-100">
                        <NavUserItem langNav={langNav} username={authData?.username} />
                    </div>
                </div>
            </nav>
        );
    }, [authData, langNav]);

    return (
        <MemoizedNav />
    );

}
