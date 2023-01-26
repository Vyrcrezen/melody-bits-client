import React from "react";
import { VyBtn } from "../base/vyClickable";

export function MinimizedPanelBar({ buttons }: { buttons: JSX.Element[] }) {
    return (
        <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-row justify-content-around vy-bg-primary px-5 w-100 rounded" >
                
                {buttons}

                {/* <div className="vy-bg-secondary vy-dark vy-clickable rounded px-3 fw-bold">
                    Navigation
                </div>
                <div className="vy-bg-secondary vy-dark vy-clickable rounded px-3 fw-bold">
                    Something else
                </div> */}
            </div>
        </div>
    );
}