import { defaultLangData } from "../../pages/components/context/langContext";

export function collapseNumber(numValue: number, numPostfixes: typeof defaultLangData.numPostfix) {
    if (numValue > 1000000) {
        return `${Math.floor(numValue / 1000000)}${numPostfixes.mega}`
    }
    else if (numValue > 1000) {
        return `${Math.floor(numValue / 1000)}${numPostfixes.kilo}`
    }
    else {
        return `${numValue}`;
    }
}
