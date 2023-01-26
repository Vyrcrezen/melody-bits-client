/**
 * @throws Error
 */
export function loadFileToElement(inputElementId: string, targetElementId: string, verifySource: (file: File) => boolean) {

    const sourceElement = document.getElementById(inputElementId) as HTMLInputElement;
    const targetElement = document.getElementById(targetElementId) as HTMLMediaElement;

    if (!sourceElement) { throw new Error(`Couldn't find source element by id: ${inputElementId}`); }
    if (!targetElement) { throw new Error(`Couldn't find target element by id: ${targetElementId}`); }

    const sourceFile = (sourceElement.files || [])[0];

    if (!sourceFile) { throw new Error(`Couldn't find source file inside input element with id: ${inputElementId}`); }
    if (!verifySource(sourceFile)) { throw new Error(`Source file failed the verifySource requirement!`); }

    // console.log('Raw file:');
    // console.log(sourceFile);

    const fileReader = new FileReader();
    fileReader.onload = (() => {
        // console.log('Read file:');
        // console.log(fileReader.result);

        if (fileReader.result) {
            
            targetElement.src = fileReader.result.toString();

            // if (targetElement instanceof HTMLSourceElement) {
            //     targetElement.src = fileReader.result.toString();
            // }

            // else if (targetElement instanceof HTMLAudioElement) {
            //     targetElement.src = fileReader.result.toString();
            // }

            // else if (targetElement instanceof HTMLImageElement) {
            //     targetElement.src = fileReader.result.toString();
            // }
        }
    });

    fileReader.readAsDataURL(sourceFile);
}

export function loadFileFromInput(inputElement: HTMLInputElement): Promise<string | undefined> {

    return new Promise((resolve, reject) => {

        if (!inputElement) { reject(new Error(`Couldn't find source element by id: ${inputElement}`)); }

        const sourceFile = (inputElement.files || [])[0];

        if (!sourceFile) { reject(new Error(`Couldn't find source file inside input element with id: ${inputElement}`)); }

        // console.log('Raw file:');
        // console.log(sourceFile);

        const fileReader = new FileReader();
        fileReader.onload = (() => {
            // console.log('Read file:');
            // console.log(fileReader.result);

            if (fileReader.result) {
                
                resolve(fileReader.result.toString());
            }
        });

        fileReader.readAsDataURL(sourceFile);
    });
    
}

export function loadFileAsBackground(inputElementId: string, targetElementId: string, verifySource: (file: File) => boolean) {

    const sourceElement = document.getElementById(inputElementId) as HTMLInputElement;
    const targetElement = document.getElementById(targetElementId) as HTMLMediaElement;

    if (!sourceElement) { throw new Error(`Couldn't find source element by id: ${inputElementId}`); }
    if (!targetElement) { throw new Error(`Couldn't find target element by id: ${targetElementId}`); }

    const sourceFile = (sourceElement.files || [])[0];

    if (!sourceFile) { throw new Error(`Couldn't find source file inside input element with id: ${inputElementId}`); }
    if (!verifySource(sourceFile)) { throw new Error(`Source file failed the verifySource requirement!`); }

    // console.log('Raw file:');
    // console.log(sourceFile);

    const fileReader = new FileReader();
    fileReader.onload = (() => {
        // console.log('Read file:');
        // console.log(fileReader.result);

        if (fileReader.result) {
            
            // targetElement.src = fileReader.result.toString();

            targetElement.style.backgroundImage = `url(${fileReader.result.toString()})`
            // if (targetElement instanceof HTMLSourceElement) {
            //     targetElement.src = fileReader.result.toString();
            // }

            // else if (targetElement instanceof HTMLAudioElement) {
            //     targetElement.src = fileReader.result.toString();
            // }

            // else if (targetElement instanceof HTMLImageElement) {
            //     targetElement.src = fileReader.result.toString();
            // }
        }
    });

    fileReader.readAsDataURL(sourceFile);
}
