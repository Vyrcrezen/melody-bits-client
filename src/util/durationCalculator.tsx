
export const secToTime = (timeInSec: number) => {
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);

    return `${minutes}:${seconds >= 10 ? seconds : `0${seconds}` }`
}

// export class DurationCalculator {
//     inSeconds = 0;
//     inText = '0:00';

//     newInput(imeInSec: number) {
//         const minutes = Math.floor(imeInSec / 60);
//         const seconds = Math.floor(imeInSec % 60);
    
//         this.inSeconds = Math.floor(imeInSec);
//         this.inText = `${minutes}:${seconds >= 10 ? seconds : `0${seconds}` }`
//     }
// }
