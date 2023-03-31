import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fetchMarkdown from "../util/fetchMarkdown";

export default function MarkdownDisplayer({mdUrl, fallbackUrl}: {mdUrl: string, fallbackUrl?: string}) {

    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetchMarkdown(mdUrl, fallbackUrl)
        .then(data => setMarkdown(data))
        .catch(_err => {});
    }, [mdUrl]);

    return(
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
    );
}
