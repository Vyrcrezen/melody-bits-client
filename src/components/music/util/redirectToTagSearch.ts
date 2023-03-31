import { NameTable } from "../../../models/musicCard";
import { sitemap } from "../../../sitemap";
import { setTagFlashTagList } from "../../../util/functionalities/opFlashStore";

export default function redirectToTagSearch(tagList: NameTable[]) {

    const originAddress = window.location.origin;
    const addrMusicBrowser = `${originAddress}${sitemap.browse}`;

    // const queryParams = new URLSearchParams({ tags: tagIds.toString() });

    setTagFlashTagList(tagList);

    window.location.href = `${addrMusicBrowser}`;
}
