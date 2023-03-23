import React, { lazy, Suspense } from "react";

const mdChangelog = `
**2023.03.23:**
* Added music favorites
* Implemented the music approval process
* Added the ability to review previous music submissions
`;

const ReactMarkdown = lazy(() => import('react-markdown'));
export function ChangelogItems() {

    return (
        <div className="markdown w-100 vy-bg-primary p-2 rounded">
            <Suspense fallback={<div>Loading...</div>} >
                <ReactMarkdown>{mdChangelog}</ReactMarkdown>
            </Suspense>
        </div>
    );
}
