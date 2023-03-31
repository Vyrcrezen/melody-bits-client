import React from "react";

export function VySectionTitle01({text}: {text: string}) {
    return (
        <div>
            <h4 className="d-inline-block rounded text-decoration-underline p-2 vy-bg-primary">{text}</h4>
        </div>
    );
}
