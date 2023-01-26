
export function isValidNumber(value?: number) {
    return !(!value || value === Infinity );
}

export function getZeroUnlessValid(value?: number): number {
    if (value && value !== Infinity ) {
        return value;
    }
    return 0;
}
