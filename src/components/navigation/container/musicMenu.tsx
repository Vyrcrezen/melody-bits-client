import _ from "lodash";
import Lottie, { AnimationItem } from "lottie-web";
import React, { useEffect, useRef } from "react";

import animMenu from '../../../media/lottie/5145-menu-open-and-close.json';
import { MusicCardData } from "../../../models/musicCard";
import { CardFrontOptions } from "../../../types/cardFrontOptions";
import { VyDropdown } from "../../shared/presentational/VyDropdown";
import { MusicMenuDropdown } from "./musicMenuDropdown";

export function MusicMenu({authToken, musicData, className, cardFront, setCardFront}: { authToken?: string, musicData: MusicCardData, className?: string, cardFront: CardFrontOptions, setCardFront: React.Dispatch<React.SetStateAction<CardFrontOptions>> }) {
    const elMenuButton = useRef<HTMLButtonElement>(null);

    let animMenuButton = useRef<AnimationItem>();
    let menuEventListenerAdded = useRef(false);
    
    let isMenuOpen = false;

    const closeDropdown = () => {
        if (animMenuButton.current ) {
            animMenuButton.current.playSegments([60, 0], true);
        }
        isMenuOpen = false;

        if (elMenuButton.current) {
            elMenuButton.current.classList.replace('vy-bg-selection', 'vy-bg-white');
        }
    }

    const openDropdown = () => {
        if (animMenuButton.current) {
            animMenuButton.current.playSegments([0, 60], true);
        }
        
        isMenuOpen = true;

        if (elMenuButton.current) {
            elMenuButton.current.classList.replace('vy-bg-white', 'vy-bg-selection');
        }
    }

    useEffect(() => {
        if (elMenuButton.current) {
            if (!animMenuButton.current) {
                animMenuButton.current = Lottie.loadAnimation({
                    container: elMenuButton.current,
                    animationData: animMenu,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    name: 'card_menu_button',
                    initialSegment: [0, 1],
                    rendererSettings: {
                        className: ''
                    }
                });

                animMenuButton.current.setSpeed(3);
            }

            if (!menuEventListenerAdded.current) {
                menuEventListenerAdded.current = true;

                elMenuButton.current.addEventListener('pointerdown', (_event) => {
                    if (isMenuOpen) { closeDropdown(); }
                    else { openDropdown(); }
                })
            }
        }
    });

    return (
        <VyDropdown
            btnText=''
            btnOptions={{
                buttonRef: elMenuButton,
                backgroundColor: 'vy-bg-white',
                dataBsAutoClose: 'inside',
                border: false
            }}
            dropdownOptions={{
                menuPosition: "dropdown-menu-start",
                backgroundColor: "vy-bg-white",
                containerClass: className,
                skipDropdownToggle: true,
                content: MusicMenuDropdown({ authToken: authToken, musicData: musicData, cardFront: cardFront, setCardFront: setCardFront, closeDropdown: closeDropdown, openDropdown: openDropdown})
            }}
        />
    );
}
