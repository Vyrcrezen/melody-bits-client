
export default async function fetchMarkdown(url: string, fallbackUrl?: string) {
    try {
        let res = await fetch(url);
        
        if(!res.headers.get('Content-Type')?.includes('text/markdown') && fallbackUrl) {
            res = await fetch(fallbackUrl);
        }
    
        if(!res.headers.get('Content-Type')?.includes('text/markdown')) {
            throw new Error();
        }

        return res.text();
    }
    catch(err) {
        return "Markdown file not found";
    }
}
