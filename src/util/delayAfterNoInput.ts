
// export function delayAfterNoInput() {
//     const timeoutFunc = () => {
//         if (timeoutEnd.current > new Date().getTime()) {
//             setTimeout(timeoutFunc, 1000);
//         }
//         else {
//             timeoutStarted.current = false;
//             getMusic({ Options: {
//                 musicTitle: queryObject.musicTitle,
//                 tags: { values: queryObject.tags},
//                 uploaderName: queryObject.uploaderName
//             } })
//                 .then((result) => {
//                     if (result.data) {
//                         setMusicData(result.data);
//                     }
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//     }
//     setTimeout(timeoutFunc, 1000);
// }

import { Autobind } from "./autobind";

export class DelayedActionAfterNoInput {

    private actionCallback: () => void;
    private delay: number;
    private triggerTime = 0;
    private isActionPrimed = false;

    constructor(delay: number, actionCallback: () => void) {
        this.actionCallback = actionCallback;
        this.delay = delay;
    }

    @Autobind
    private delayWappedCp() {
        if (this.triggerTime > new Date().getTime()) {
            setTimeout(this.delayWappedCp, this.delay);
        }
        else {
            this.isActionPrimed = false;
            console.log('Delay done, calling function...');
            this.actionCallback();
        }

    }

    regActionEvent() {
        this.triggerTime = (new Date().getTime()) + this.delay;
        
        if (!this.isActionPrimed) {
            setTimeout(this.delayWappedCp, this.delay);
            this.isActionPrimed = true;
        }
    }

}
