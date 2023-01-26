import React, { useCallback, useContext, useState } from "react";
import { getAuthData } from "../../util/functionalities/opAuthData";
import { VyAnchorLarge } from "./base/vyClickable";
import { VyDropdownLarge } from "./base/vyDropdown";
import { LoginDropdown } from "./complex/loginDropdown";
import { UserDropdown } from "./complex/userDropdown";
import { defaultLangData, LangDataContext } from "./context/langContext";
import _ from 'lodash';
import { sitemap } from "../../sitemap";

export function Navbar() {
    const [authData, setAuthData] = useState<{ username: string, clearance: number }>();

    if (!authData) {
        const retrievedAuthData = getAuthData();
        if (retrievedAuthData) {
            setAuthData(retrievedAuthData);
        }
    }

    const { nav: langNav } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const MemoizedNav = useCallback(() => {
        return (
            <nav className="navbar navbar-expand-xl p-0 navbar-light sticky-top vy-primary-bg">
                <div className="container-lg d-flex flex-row p-0 rounded vy-secondary-bg vy-nav-area">
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>

                    <div className="offcanvas offcanvas-start vy-bg-primary" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header vy-bg-secondary">
                            <h5 className="offcanvas-title vy-dark" id="offcanvasNavbarLabel">Web-music</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body p-0">
                            <div className="navbar-nav vy-bg-secondary rounded align-items-center">
                                <VyAnchorLarge aText={langNav.home} href={sitemap.home} Options={{boldFont: true}} />
                                <VyAnchorLarge aText={langNav.browse} href={sitemap.browse} Options={{boldFont: true}} />
                                <VyAnchorLarge aText={langNav.discussions} href={sitemap.discussions.index} Options={{boldFont: true}} />
                                {(authData) ? <VyAnchorLarge aText={langNav.upload} href={sitemap.upload} Options={{boldFont: true}} /> : null}
                                {(authData && (1 <= authData.clearance && authData.clearance <= 2)) ? <VyAnchorLarge aText={langNav.approve} href={sitemap.approve} Options={{boldFont: true}} /> : null}
                            </div>
                        </div>
                    </div>

                    <div className="navbar-nav h-100">
                        {
                            !authData ? <VyDropdownLarge btnText={langNav.login} dropdownContent={LoginDropdown()} /> : null
                        }

                        {(authData) ? <VyDropdownLarge btnText={authData.username} dropdownContent={UserDropdown()} /> : null}
                    </div>
                </div>
            </nav>
        );
    }, [authData, langNav]);

    return (
        <MemoizedNav />
    );

}
