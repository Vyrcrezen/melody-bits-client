import Lottie, { AnimationItem } from "lottie-web";
import { sitemap } from "../../../sitemap";

export default class HamburgerAnimation {

    readonly animMenuButton: AnimationItem;
    readonly buttonElement: HTMLButtonElement;

    isMenuOpen = false;

    constructor( buttonElement: HTMLButtonElement ) {

       const lottieAnimFiles = sitemap.mediaContent.lottie;

        this.buttonElement = buttonElement;

        this.animMenuButton = Lottie.loadAnimation({
            container: buttonElement,
            path: `${lottieAnimFiles}/5145-menu-open-and-close.json`,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            name: 'card_menu_button',
            initialSegment: [0, 1],
            rendererSettings: {
                className: ''
            }
        });

        this.animMenuButton.setSpeed(3);

        buttonElement.addEventListener('pointerdown', (_event) => {
            if (this.isMenuOpen) { this.playCloseAnim(); }
            else { this.playOpenAnim(); }
        });

    }

    playCloseAnim() {
        if (this.animMenuButton ) {
            this.animMenuButton.playSegments([60, 0], true);
        }
        this.isMenuOpen = false;

        if (this.buttonElement) {
            this.buttonElement.classList.replace('vy-bg-selection', 'vy-bg-white');
        }
    }

    playOpenAnim() {
        if (this.animMenuButton) {
            this.animMenuButton.playSegments([0, 60], true);
        }
        
        this.isMenuOpen = true;

        if (this.buttonElement) {
            this.buttonElement.classList.replace('vy-bg-white', 'vy-bg-selection');
        }
    }
}
