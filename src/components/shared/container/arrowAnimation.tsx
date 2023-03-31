import Lottie, { AnimationItem } from "lottie-web";
import React, { useEffect, useRef } from "react";

import animArrow from '../../../media/lottie/85608-arrow-up-circle.json';
import { VyBtn } from "./vyClickable";

export function ArrowAnimation({pointsDown, isSelected, onClick}: { pointsDown?: boolean, isSelected?: boolean, onClick?: () => void }) {
    const elArrowButton = useRef<HTMLButtonElement>(null);

    let animArrowButton = useRef<AnimationItem>();
    

    useEffect(() => {
        if (elArrowButton.current) {
            if (!animArrowButton.current) {
                animArrowButton.current = Lottie.loadAnimation({
                    container: elArrowButton.current,
                    animationData: animArrow,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    name: 'filter_arrow_button',
                    initialSegment: [0, 1],
                    rendererSettings: {
                        className: '',
                        viewBoxSize: '33 12 30 60'

                        
                    }
                });

                // animArrowButton.current.setSpeed(3);
                // animArrowButton.current.
            }
        }
    });

    return (
        <VyBtn
            btnText=''
            onClick={() => {
                if (onClick) {
                    onClick();
                }
                if (animArrowButton.current) {
                    animArrowButton.current.playSegments([0, 20]);
                }
            }}
            Options={{
                buttonRef: elArrowButton,
                backgroundColor: isSelected ? 'vy-bg-selection' : 'vy-bg-primary',
                border: false,
                moreClassNames: pointsDown ? 'filter-arrow-size vy-flip-horizontally' : 'filter-arrow-size',
                padding: 'p-0'
            }}
        />
    );
}
