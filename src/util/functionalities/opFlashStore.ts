import { NameTable } from "../../models/musicCard";

function _getFlashData() {
    try {
        const flashData = localStorage.getItem('vy-flash');
        if (flashData) {
            localStorage.removeItem('vy-flash');
            return JSON.parse(flashData) as { [prop: string]: string }
        }
    }
    catch (err) {
    }

    return;
}

export function getFlashEmail() {
    const flashData = _getFlashData();

    if (typeof flashData === 'object' && flashData.email) {
        return {
            email: flashData.email,
            error: flashData.error,
        }
    }
}

export function setFlashEmail(email: string, error?: string) {
    localStorage.setItem('vy-flash', JSON.stringify({
        email: email,
        error: error
    }))
}

export function getFlashTagList() {
    const flashData = _getFlashData();

    if (typeof flashData === 'object') {
        return flashData;
    }
}

export function setTagFlashTagList(tagList: NameTable[]) {
    localStorage.setItem('vy-flash', JSON.stringify(tagList));
}
