export function getHrefMusicId() {
    const href = window.location.href;

    const [profileId] = href.match(/\d+(\.\d+)?$/u) ?? [];
    return profileId;
}