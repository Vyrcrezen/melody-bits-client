import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";

import { MusicCardData } from "../../../models/musicCard";
import { CardFrontOptions } from "../../../types/cardFrontOptions";
import { VyDropdown } from "../../shared/presentational/VyDropdown";
import { MusicMenuDropdown } from "./musicMenuDropdown";
import HamburgerAnimation from "../../shared/util/HamburgerAnimation";

export function MusicMenu({authToken, musicData, className, cardFront, setCardFront}: { authToken?: string, musicData: MusicCardData, className?: string, cardFront: CardFrontOptions, setCardFront: React.Dispatch<React.SetStateAction<CardFrontOptions>> }) {
    const elMenuButton = useRef<HTMLButtonElement>(null);


    const [hamburgerAnimation, setHamburgerAnimation] = useState<HamburgerAnimation>();

    useEffect(() => {

        if (elMenuButton.current && !hamburgerAnimation) {
            setHamburgerAnimation(new HamburgerAnimation(elMenuButton.current));
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
                content: MusicMenuDropdown({ authToken: authToken, musicData: musicData, cardFront: cardFront, setCardFront: setCardFront, hamburgerAnimation: hamburgerAnimation})
            }}
        />
    );
}
