import React, { useEffect, useRef, useState } from "react";
import Lottie, { AnimationItem } from "lottie-web";
import { flatten } from 'lottie-colorify';

import '../../css/elements/vyAudioPLayer.css';
import playPause from '../../media/lottie/playPause.json';
import muteIcon from '../../media/lottie/volume.json';
import { cVySlider } from "./slider";
import { secToTime } from "../../util/durationCalculator";
import { getZeroUnlessValid, isValidNumber } from "../../util/isFalseOrInfinity";

export function VyAudio({ id, src, onEnded }: { id?: string, src?: string, onEnded?: (event: React.SyntheticEvent<HTMLAudioElement, Event>) => void }) {

    const elAudioPlayBtn = useRef<HTMLButtonElement>(null);
    const elAudioMuteBtn = useRef<HTMLButtonElement>(null);
    const elAudio = useRef<HTMLAudioElement>(null);
    const elAudioCurrent = useRef<HTMLSpanElement>(null);
    const elAudioDuration = useRef<HTMLSpanElement>(null);

    const audioCurrent = useRef<{ text: string, sec: number }>();

    // const audioDuration = useRef<{ text: string, sec: number }>();
    // let [audioCurrent, setaudioCurrent] = useState<{ text: string, sec: number }>();

    let isPlaying = false;
    let isMuted = false;

    const animPlayPause = useRef<AnimationItem>(null) as React.MutableRefObject<AnimationItem>;
    const animMute = useRef<AnimationItem>(null) as React.MutableRefObject<AnimationItem>;

    const animPlayPauseInitialized = useRef(false);
    const animMuteInitialized = useRef(false);
    // const [bufferedWidth, setBufferedWidth] = useState(0);

    const VolumeSlider = useRef(new cVySlider({
        dragDefaultHidden: true, showCurrentValue: false,
        values: [0, 100],
        zIndexRoot: 10,
        startingWidth: {
            value: 100,
            isPercentage: true
        },
        onChange: (sliderValue) => {
            if (elAudio.current && typeof sliderValue.singleValue === 'number') {
                elAudio.current.volume = (sliderValue.singleValue / 100);
            }
        }
    }));

    const PlaySlider = useRef(new cVySlider({
            dragDefaultHidden: true,
            values: [0, 60],
            showSliderBoundaries: false,
            showCurrentValue: false,
            onDragDown: () => {
                if(elAudioCurrent.current) {
                    if (isPlaying) {
                        elAudio.current?.pause();
                    }
                }
            },
            onChange: (sliderValue) => {
                if(elAudioCurrent.current) {
                    elAudioCurrent.current.innerHTML = secToTime(sliderValue.singleValue ?? 0);
                }
            },
            onDragUp: (sliderValue) => {
                if (elAudioCurrent.current && elAudio.current) {
                    elAudio.current.currentTime = sliderValue.singleValue ?? 0;
                    elAudioCurrent.current.innerHTML = secToTime(sliderValue.singleValue ?? 0);

                    if (isPlaying) {
                        elAudio.current?.play();
                    }
                }
            }
        }));

    useEffect(() => {
        if (elAudioPlayBtn.current && elAudioMuteBtn.current) {
            if (!animPlayPauseInitialized.current) {
                animPlayPauseInitialized.current = true;

                animPlayPause.current = Lottie.loadAnimation({
                    container: elAudioPlayBtn.current,
                    // animationData: flatten('#f0f0f0', playPause),
                    animationData: flatten('#1e1e1e', playPause),
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    name: 'play pause button',
                    initialSegment: [7, 8],
                    rendererSettings: {
                        className: 'audio-icon'
                    }
                });

                elAudioPlayBtn.current.addEventListener('pointerdown', (event) => {
                    event.preventDefault();

                    if(isPlaying === true) {
                        elAudio.current?.pause();
                        animPlayPause.current.playSegments([0, 8], true);
                        isPlaying = false;
                    }
                    else {
                        animPlayPause.current.playSegments([8, 0], true);
                        elAudio.current?.play();
                        isPlaying = true;
                    }
                });
            }

            if (!animMuteInitialized.current ) {
                animMuteInitialized.current = true;

                animMute.current = Lottie.loadAnimation({
                    container: elAudioMuteBtn.current,
                    // animationData: flatten('#f0f0f0', muteIcon),
                    animationData: flatten('#1e1e1e', muteIcon),
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    name: 'play pause button',
                    rendererSettings: {
                        className: 'audio-icon'
                    }
                });


                elAudioMuteBtn.current.addEventListener('pointerdown', (event: PointerEvent) => {
                    // event.preventDefault();

                    if ( event.composedPath().includes(animMute.current.renderer.svgElement) && elAudio.current) {
                        if(isMuted === false) {
                            animMute.current.playSegments([0, 30], true);
                            isMuted = true;
                            elAudio.current.muted = true;
                        }
                        else {
                            animMute.current.playSegments([30, 0], true);
                            isMuted = false;
                            elAudio.current.muted = false;
                        }
                    }
                });
            }
        }

        if (elAudio.current) {

            if (elAudio.current.readyState > 0 && !audioCurrent.current && elAudioDuration.current) {

                PlaySlider.current.setSliderRange([0, Math.floor( getZeroUnlessValid(elAudio.current?.duration) )]);
                audioCurrent.current = { text: secToTime( getZeroUnlessValid(elAudio.current?.duration) ), sec: Math.floor( getZeroUnlessValid(elAudio.current?.duration) )};
                // elAudioDuration.current.innerHTML = secToTime( getZeroUnlessValid(elAudio.current?.duration) );

                if (elAudio.current.buffered.length > 0 && elAudio.current?.duration > 0) {
                    PlaySlider.current.setBufferedWidth( isValidNumber(elAudio.current?.duration) ? Math.floor(elAudio.current.buffered.end(elAudio.current.buffered.length - 1) * 100 / elAudio.current?.duration) : 0);
                }
            }
            else {
                elAudio.current.addEventListener('loadedmetadata', () => {

                    if (elAudio.current && elAudioDuration.current) {
                        if (!audioCurrent.current) {
                            PlaySlider.current.setSliderRange([0, Math.floor( getZeroUnlessValid(elAudio.current?.duration) )]);
                            audioCurrent.current = { text: secToTime( getZeroUnlessValid(elAudio.current?.duration) ), sec: Math.floor( getZeroUnlessValid(elAudio.current?.duration) )};
                            // elAudioDuration.current.innerHTML = secToTime( getZeroUnlessValid(elAudio.current?.duration) );
                        }

                        if (elAudio.current.buffered.length > 0 && elAudio.current?.duration > 0) {
                            PlaySlider.current.setBufferedWidth( isValidNumber(elAudio.current?.duration) ? Math.floor(elAudio.current.buffered.end(elAudio.current.buffered.length - 1) * 100 / elAudio.current?.duration) : 0);
                        }
                    }
                });
            }

            elAudio.current.addEventListener('progress', () => {
                if (elAudio.current) {
                    if (elAudio.current.buffered.length > 0 && elAudio.current?.duration > 0) {
                        PlaySlider.current.setBufferedWidth( isValidNumber(elAudio.current?.duration) ? Math.floor(elAudio.current.buffered.end(elAudio.current.buffered.length - 1) * 100 / elAudio.current?.duration) : 0);
                    }
                }
            });

            elAudio.current.addEventListener('timeupdate', () => {
                if (elAudio.current && elAudioCurrent.current) {
                    elAudioCurrent.current.innerHTML = secToTime(elAudio.current.currentTime);

                    PlaySlider.current.setSliderWidth(elAudio.current.currentTime);
                    // setBufferedWidth(Math.floor(elAudio.current.buffered.end(elAudio.current.buffered.length - 1)));
                }
            });

            elAudio.current.addEventListener('durationchange', () => {
                if (elAudioDuration.current) {
                    elAudioDuration.current.innerHTML = secToTime( getZeroUnlessValid(elAudio.current?.duration) );
                }
            });

            elAudio.current.addEventListener('ended', () => {
                console.log('Ended...');
            })

        }
    });

    return (
        <div className="vy-audio-player d-flex align-items-center justify-content-center" >
            <audio id={id} ref={elAudio} src={src ?? undefined}  preload={'metadata'} onEnded={onEnded} />
            <button type="button" ref={elAudioPlayBtn} className="audio-play-btn" ></button>
            <div className="d-flex align-center fw-bold">
                <span ref={elAudioCurrent} className="time current-time">0:00</span>
                <span className="time duration">&nbsp;/&nbsp;</span>
                <span ref={elAudioDuration} className="time duration">{ audioCurrent.current?.text ?? '0:00'}</span>
            </div>
            <div className="audio-slider mx-4">
                <PlaySlider.current.GetSlider />
            </div>
            <button type="button" ref={elAudioMuteBtn} className="audio-mute-btn h-100 py-0" >
                <div className="align-items-center volume-slider">
                    <VolumeSlider.current.GetSlider />
                </div>
            </button>
        </div>
    );
}
