import React from "react";

export function TagButtons({ tagList, uniqueId }: { tagList: Array<string>, uniqueId: number }) {
    const hrefRoot = window.location.href.includes('?') ? window.location.href.substring(0, window.location.href.indexOf('?') ) : window.location.href;

    return (
        <ul id="mcard-template-tags" className="card-body p-1 my-1 vy-tag-container">
            {tagList.map((tagName, index) => (
                <a key={`${uniqueId}-${index}`} id={`${uniqueId}-${tagName}`} href={`${hrefRoot}?tagsAny=${tagName}`}>
                    <li className="d-inline-block rounded-pill fs-small mb-1 py-1 px-2 vy-secondary-bg vy-tag-text">{tagName}</li>
                </a>
            ))}
        </ul>
    );
}
