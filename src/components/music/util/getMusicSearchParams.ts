
export default function getMusicSearchParams() {
    try {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
    
        return {
            tags: params.getAll('tags')
        }
    }
    catch(err) {}

    return {};
}