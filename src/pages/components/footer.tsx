import React from "react";

export function Footer() {

    return (
        <footer className="pt-2 mt-5 vy-bright" >
            <div className="container d-flex flex-md-row flex-column justify-content-between" >
                <div className="order-md-2 mb-4" >
                    <a className="vy-bright" href="/about">About</a>
                    <br />
                    <a className="vy-bright" href="/about">Contact</a>
                    <br />
                    <a className="vy-bright" href="/about">Privacy Policy</a>
                    <br />
                    <a className="vy-bright" href="/about">Terms and Rules</a>
                </div>

                <div className="d-flex flex-column order-md-1 mb-2">
                    <div className="fs-6">
                        Copyright © 2023
                        <br />
                        All Rights Reserved.
                    </div>
                    <div className="fs-7 mt-2 fs-small">
                        Designed and developed by:
                        <br />
                        <a className="vy-bright" href="#">Vyrcrezen</a> 
                    </div>
                </div>
            </div>
        </footer>
    );
}
