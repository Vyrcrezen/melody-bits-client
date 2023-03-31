import React, { lazy, Suspense } from "react";
import { retrieveLangSetting } from "../../../util/functionalities/opLang";

const MarkdownDisplayer = lazy(() => import('./MarkdownFromUrl'));

export function ChangelogItems() {

    const lang = retrieveLangSetting() || 'en';

    return (
        <div className="markdown w-100 vy-bg-primary p-2 rounded">
            <Suspense fallback={<div>Loading...</div>} >
                <MarkdownDisplayer mdUrl={`/lang/${lang}/changes.md`} fallbackUrl={'/lang/en/changes.md'} />
            </Suspense>
        </div>
    );
}
