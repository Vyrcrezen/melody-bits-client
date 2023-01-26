import React, { useEffect, useReducer, useRef } from "react";

import '../../css/elements/vySlider.css';

import { Autobind } from "../../util/autobind";

export function VySlider({Options}:
    {
    Options?: {
        values?: number[],
        isContinuous?: boolean,
        onChange?: (newValue: { singleValue: number | null, minDouble: number | null, maxDouble: number | null }) => void,
        boundaryElement?: HTMLElement,
        isDoubleSlider?: boolean,
        dragDefaultHidden?: boolean,
        showSliderBoundaries?: boolean,
        showCurrentValue?: boolean,
        bufferedWidth?: number,
        useReferencedValue?: {
            singleValue?: number,
            minDouble?: number,
            maxNumber?: number
        }
    }
}) {

    const rangeValues = Options?.values ?? [0, 100];
    const isContinuous = Options?.isContinuous ?? true;
    const onChange = Options?.onChange ? Options?.onChange : () => {};
    const bufferedWidth = Options?.bufferedWidth ?? 0;

    const minSliderValue = rangeValues[0];
    const maxSliderValue = rangeValues[rangeValues.length - 1];
    const rangeSliderValue = maxSliderValue - minSliderValue;

    const parentSlider = useRef<HTMLDivElement>(null);
    const bufferedWidthElement = useRef<HTMLDivElement>(null);

    const minSlider = useRef<HTMLDivElement>(null);
    const minDrag = useRef<HTMLDivElement>(null);
    const minOrignalValue = useRef(minSliderValue)
    const minSliderValueElement = useRef<HTMLDivElement>(null);

    const maxSlider = useRef<HTMLDivElement>(null);
    const maxDrag = useRef<HTMLDivElement>(null);
    const maxOrignalValue = useRef(Options?.isDoubleSlider ? maxSliderValue : minSliderValue);
    const maxSliderValueElement = useRef<HTMLDivElement>(null);

    const divSliderBoundaries = useRef<HTMLDivElement>(null);
    const sliderEncompassingDiv = useRef<HTMLDivElement>(null);

    const sumMovementX = useRef(0);

    const dragObjectWidth = 20;

    useEffect(() => {
        if (minSlider.current && maxSlider.current && parentSlider.current && sliderEncompassingDiv.current && bufferedWidthElement.current) {

            const parentWidthPx = parentSlider.current.offsetWidth;
            // const relativeSliderValues = sliderValues.map((valueItem) => Math.floor((((valueItem - minSliderValue) / rangeSliderValue)) * (parentWidthPx - dragObjectWidth)) + dragObjectWidth);
            const relativeSliderValues = rangeValues.map((valueItem) => Math.floor((((valueItem - minSliderValue) / rangeSliderValue)) * parentWidthPx));

            minSlider.current.style.width = Options?.isDoubleSlider ? `${relativeSliderValues[0]}px` : `0px`;
            // maxSlider.current.style.width = Options?.isDoubleSlider ? `${relativeSliderValues[relativeSliderValues.length - 1]}px` : `${dragObjectWidth}px`;
            maxSlider.current.style.width = Options?.isDoubleSlider ? `${relativeSliderValues[relativeSliderValues.length - 1]}px` : `${0}px`;

            if (Options?.dragDefaultHidden) {
                if (minDrag.current) {
                    minDrag.current.style.opacity = '0';
                    //minDrag.current.style.transition = 'all .3s';
                }
                if (maxDrag.current) {
                    maxDrag.current.style.opacity = '0';
                    //maxDrag.current.style.transition = 'all .3s';
                }
            }

            bufferedWidthElement.current.style.width = `${bufferedWidth}%`;

            if (Options?.showCurrentValue) {
                sliderEncompassingDiv.current.style.paddingTop = `25px`;
            }

            if (!Options?.showSliderBoundaries) {
                // sliderEncompassingDiv.current.style.paddingBottom = `${dragObjectWidth/2}px`
            }

            if (divSliderBoundaries.current && Options?.showSliderBoundaries) {
                divSliderBoundaries.current.style.margin = `${dragObjectWidth/2}px 0 0 0`
            }
        }
    });

    const dragSlider = (event: MouseEvent, sliderElement: React.RefObject<HTMLDivElement>, designation: string, moveCondition: (newWidth: number) => boolean) => {
        // Check if the moveable slider and parent exist, and if the mouse moved at least a whole pixel on the x axis
        if (sliderElement.current && parentSlider.current?.offsetWidth && event.movementX !== 0) {

            const parentWidthPx = parentSlider.current.offsetWidth;
            sumMovementX.current += event.movementX;

            if (!isContinuous) {
                const dragOffsetPx = +sliderElement.current.style.width.replace('px', '') + sumMovementX.current;

                // const relativeSliderValues = sliderValues.map((valueItem) => Math.round((((valueItem - minSliderValue) / rangeSliderValue)) * (parentWidthPx - dragObjectWidth)) + dragObjectWidth);
                const relativeSliderValues = rangeValues.map((valueItem) => Math.round((((valueItem - minSliderValue) / rangeSliderValue)) * parentWidthPx));

                const { nearestRelativeValue, orignalValue } = relativeSliderValues.reduce((bestMatch: { nearestRelativeValue: number | null, distance: number | null, orignalValue: number | null }, valueItem, valueIndex) => {

                    if (bestMatch.nearestRelativeValue === null || bestMatch.distance === null || bestMatch.orignalValue === null) {
                        bestMatch.nearestRelativeValue = valueItem;
                        bestMatch.distance = Math.abs(valueItem - dragOffsetPx);
                        bestMatch.orignalValue = rangeValues[valueIndex];
                    }
                    else {
                        if (Math.abs(valueItem - dragOffsetPx) < bestMatch.distance) {
                            bestMatch.nearestRelativeValue = valueItem;
                            bestMatch.distance = Math.abs(valueItem - dragOffsetPx);
                            bestMatch.orignalValue = rangeValues[valueIndex];
                        }
                    }

                    return bestMatch;
                }, { nearestRelativeValue: null, distance: null, orignalValue: null });

                if (sliderElement.current.style.width !== `${nearestRelativeValue}px` && nearestRelativeValue !== null && orignalValue !== null && moveCondition(nearestRelativeValue)) {
                    sumMovementX.current = sumMovementX.current - (nearestRelativeValue - +sliderElement.current.style.width.replace('px', ''));

                    sliderElement.current.style.width = `${nearestRelativeValue}px`;

                    switch (designation) {
                        case 'single':
                        case 'max': maxOrignalValue.current = orignalValue;
                            if (maxSliderValueElement.current) {
                                maxSliderValueElement.current.innerHTML = `${orignalValue}`;
                            }
                            break;
                        case 'min': minOrignalValue.current = orignalValue;
                            if (minSliderValueElement.current) {
                                minSliderValueElement.current.innerHTML = `${orignalValue}`;
                            }
                            break;
                    }
                    onChange({
                        singleValue: Options?.isDoubleSlider ? null : maxOrignalValue.current,
                        maxDouble: Options?.isDoubleSlider ? maxOrignalValue.current : null,
                        minDouble: Options?.isDoubleSlider ? minOrignalValue.current : null,
                    });
                }
            }
            else {
                const newWidth = +sliderElement.current.style.width.replace('px', '') + event.movementX;

                if (newWidth <= (parentWidthPx) && newWidth >= 0 && moveCondition(newWidth)) {

                    // const mappedPosition = Math.round(((newWidth - dragObjectWidth) / (parentWidthPx - dragObjectWidth) * rangeSliderValue) + minSliderValue);
                    const mappedPosition = Math.round((newWidth / parentWidthPx * rangeSliderValue) + minSliderValue);
    
                    switch (designation) {
                        case 'single':
                        case 'max': maxOrignalValue.current = mappedPosition;
                            if (maxSliderValueElement.current) {
                                maxSliderValueElement.current.innerHTML = `${mappedPosition}`;
                            }
                            break;
                        case 'min': minOrignalValue.current = mappedPosition;
                            if (minSliderValueElement.current) {
                                minSliderValueElement.current.innerHTML = `${mappedPosition}`;
                            }
                            break;
                    }
    
                    onChange({
                        singleValue: Options?.isDoubleSlider ? null : maxOrignalValue.current,
                        maxDouble: Options?.isDoubleSlider ? maxOrignalValue.current : null,
                        minDouble: Options?.isDoubleSlider ? minOrignalValue.current : null,
                    });
    
                    sliderElement.current.style.width = `${newWidth}px`;
                }

            }
        }
    }

    const minDragSliderHandler = (event: MouseEvent) => {
        dragSlider(event, minSlider, 'min', (newPos) => {
            return maxSlider.current ? newPos < +maxSlider.current.style.width.replace('px', '') : true;
        })
    }

    const activateDragMin = (event: React.PointerEvent<HTMLDivElement>) => {
        if (minSlider.current && parentSlider.current && minDrag.current) {
            minDrag.current.setPointerCapture(event.pointerId);

            sumMovementX.current = 0;

            const abortDragMin = new AbortController();

            document.addEventListener('mousemove', minDragSliderHandler, { signal: abortDragMin.signal, capture: true });
            document.addEventListener('mouseup', () => {
                abortDragMin.abort();
            }, { once: true });
        }
    }

    const maxDragSliderHandler = (event: MouseEvent) => {
        dragSlider(event, maxSlider, 'max', (newPos) => {
            return (minSlider.current && Options?.isDoubleSlider) ? newPos > +minSlider.current.style.width.replace('px', '') : true;
        })
    }

    const activateDragMax = (event: React.PointerEvent<HTMLDivElement>) => {
        if (minSlider.current && parentSlider.current && maxDrag.current) {
            maxDrag.current.setPointerCapture(event.pointerId);

            sumMovementX.current = 0;

            const abortDragMax = new AbortController();

            document.addEventListener('mousemove', maxDragSliderHandler, { signal: abortDragMax.signal });
            document.addEventListener('mouseup', () => {
                abortDragMax.abort();
            }, { once: true });
        }
    }


    return (

        <div className="w-100" ref={sliderEncompassingDiv} >
            <div className="vySlider" ref={parentSlider} >
                <div className="buffered-width" ref={bufferedWidthElement}></div>
                <div className="slider-min" ref={minSlider}>
                    { Options?.isDoubleSlider ? <div className="drag-min" ref={minDrag} onPointerDown={activateDragMin} >
                        { Options?.showCurrentValue ? <div className="slider-value" ref={minSliderValueElement}>{minOrignalValue.current}</div> : null}
                    </div> : null}
                </div>
                <div className="slider-max" ref={maxSlider}>
                    <div className="drag-max" ref={maxDrag} onPointerDown={activateDragMax} >
                        {Options?.showCurrentValue ? <div className="slider-value" ref={maxSliderValueElement} >{maxOrignalValue.current}</div> : null}
                    </div>
                </div>
            </div>
            {
                Options?.showSliderBoundaries ?
                <div className="d-flex justify-content-between" ref={divSliderBoundaries} >
                    <div className="ms-2">{minSliderValue}</div>
                    <div className="me-2" >{maxSliderValue}</div>
                </div>
                :
                null
            }
            
        </div>
    );
}

interface VySliderCore {
    param: {
        values: number[];
        isContinuous: boolean;
        onChange: (newValue: { singleValue: number | null, minDouble: number | null, maxDouble: number | null }) => void;
        onDragUp: (newValue: { singleValue: number | null, minDouble: number | null, maxDouble: number | null }) => void;
        onDragMinUp: (newValue: { singleValue: number | null, minDouble: number | null, maxDouble: number | null }) => void;
        onDragDown: (newValue: { singleValue: number | null, minDouble: number | null, maxDouble: number | null }) => void;
        onDragMinDown: (newValue: { singleValue: number | null, minDouble: number | null, maxDouble: number | null }) => void;
        boundaryElement: HTMLElement | null;
        isDoubleSlider: boolean;
        dragDefaultHidden: boolean;
        showSliderBoundaries: boolean;
        showCurrentValue: boolean;
        bufferedWidth: number;
        dragObjectWidth: number;
        zIndexRoot: number;

        startingWidth: {
            value: number,
            isPercentage: boolean
        },
        startingMinWidth: {
            value: number,
            isPercentage: boolean
        },
    }
}


export class cVySlider implements VySliderCore {

    param: VySliderCore["param"] & { minValue: number, maxValue: number, fullRange: number };
    element = {
        sliderShell: useRef<HTMLDivElement>(null),
        sliderParent: useRef<HTMLDivElement>(null),
    
        sliderBuffered: useRef<HTMLDivElement>(null),
        sliderLimits: useRef<HTMLDivElement>(null),
    
        sliderMin: useRef<HTMLDivElement>(null),
        sliderMinDrag: useRef<HTMLDivElement>(null),
        sliderMinValue: useRef<HTMLDivElement>(null),
    
        slider: useRef<HTMLDivElement>(null),
        sliderDrag: useRef<HTMLDivElement>(null),
        sliderValue: useRef<HTMLDivElement>(null)
    };
    calculated: {
        sumPathX: number,
        mappedValues?: number[],
        currentOriginalValue: number,
        currentOriginalMinValue: number
    } = {
        sumPathX: 0,
        currentOriginalValue: 0,
        currentOriginalMinValue: 0
    };

    constructor(Options?: Partial<VySliderCore["param"]>) {
        const values = Options?.values && Array.isArray(Options?.values) ? Options.values : [0, 100];
        const isDoubleSlider = Options?.isDoubleSlider === true ? Options.isDoubleSlider : false;
        const startingWidth = typeof Options?.startingWidth?.value === 'number' ? Options?.startingWidth?.value : ( isDoubleSlider ? values[values.length - 1] : values[0] );

        this.param = {
            values: values,
            isContinuous: Options?.isContinuous ? Options?.isContinuous : true,
            onChange: typeof Options?.onChange === 'function' ? Options.onChange : () => {},
            onDragUp: typeof Options?.onDragUp === 'function' ? Options.onDragUp : () => {},
            onDragMinUp: typeof Options?.onDragMinUp === 'function' ? Options.onDragMinUp : () => {},
            onDragDown: typeof Options?.onDragDown === 'function' ? Options.onDragDown : () => {},
            onDragMinDown: typeof Options?.onDragMinDown === 'function' ? Options.onDragMinDown : () => {},
            boundaryElement: typeof Options?.boundaryElement === 'object' ? Options.boundaryElement : null,
            isDoubleSlider: typeof Options?.isDoubleSlider === 'boolean' ? Options.isDoubleSlider : false,
            dragDefaultHidden: typeof Options?.dragDefaultHidden === 'boolean' ? Options.dragDefaultHidden : false,
            showSliderBoundaries: typeof Options?.showSliderBoundaries === 'boolean' ? Options.showSliderBoundaries : false,
            showCurrentValue: typeof Options?.showCurrentValue === 'boolean' ? Options.showCurrentValue : true,
            bufferedWidth: typeof Options?.bufferedWidth === 'number' ? Options.bufferedWidth : 0,
            dragObjectWidth: typeof Options?.dragObjectWidth === 'number' ? Options.dragObjectWidth : 20,
            minValue: values[0],
            maxValue: values[values.length - 1],
            fullRange: values[values.length - 1] - values[0],
            zIndexRoot: typeof Options?.zIndexRoot === 'number' ? Options.zIndexRoot : 1,
    
            startingWidth: {
                value: typeof Options?.startingWidth?.value === 'number' ? Options?.startingWidth?.value : ( isDoubleSlider ? values[values.length - 1] : values[0] ),
                isPercentage: Options?.startingWidth?.isPercentage === true ? Options?.startingWidth?.isPercentage : false
            },
            startingMinWidth: {
                value: typeof Options?.startingMinWidth?.value === 'number' ? Options?.startingMinWidth?.value : values[0],
                isPercentage: Options?.startingMinWidth?.isPercentage === true ? Options?.startingMinWidth?.isPercentage : false
            }
        };

        this.calculated.currentOriginalValue = this.param.startingWidth.value;
        this.calculated.currentOriginalMinValue = this.param.startingMinWidth.value;
    }

    @Autobind
    private _getSliderParentWidth() {
        const {sliderParent: {current: sliderParent}} = this.element;

        if (sliderParent) {
            return sliderParent.offsetWidth;
        }
    }

    @Autobind
    private _getMappedWidths() {
        const {values, minValue, fullRange} = this.param;
        const sliderParentWidth = this._getSliderParentWidth();

        if (sliderParentWidth) {
            return values.map((valueItem) => Math.round((((valueItem - minValue) / fullRange)) * sliderParentWidth));
        }
    }

    @Autobind
    private _getMappedWidth(targetWidth: number) {
        const { fullRange, minValue } = this.param;
        const sliderParentWidth = this._getSliderParentWidth();

        if (sliderParentWidth) {
            return Math.round((((targetWidth - minValue) / fullRange)) * sliderParentWidth);
        }
    }

    @Autobind
    private _revertMappedWidth(targetWidth: number) {
        const { fullRange, minValue } = this.param;
        const sliderParentWidth = this._getSliderParentWidth();

        if (sliderParentWidth) {
            return Math.round((targetWidth / sliderParentWidth * fullRange) + minValue);
        }
    }

    @Autobind
    private _setDefaultStyling() {
        const { sliderParent: { current: sliderParent }, slider: { current: slider }, sliderMin: { current: sliderMin }, sliderBuffered: { current: sliderBuffered }, sliderShell: {current: sliderShell}, sliderLimits: {current: sliderLimits}, sliderDrag: {current: SliderDrag}, sliderMinDrag: {current: sliderMinDrag}} = this.element;
        const { dragDefaultHidden, bufferedWidth, showCurrentValue, showSliderBoundaries, dragObjectWidth, isDoubleSlider, startingWidth, startingMinWidth, zIndexRoot } = this.param;
        const { calculated: calcd } = this;

        calcd.mappedValues = this._getMappedWidths();

        if (sliderParent) {
            sliderParent.style.zIndex = `${zIndexRoot}`;
        }

        if (slider && sliderMin) {
            slider.style.width = startingWidth.isPercentage ? `${startingWidth.value}%` : `${this._getMappedWidth(startingWidth.value)}px`;
            sliderMin.style.width = startingMinWidth.isPercentage ? `${startingMinWidth.isPercentage}%` : `${this._getMappedWidth(startingMinWidth.value)}px`;

            slider.style.zIndex = `${zIndexRoot}`;
            sliderMin.style.zIndex = `${zIndexRoot + 1}`;
        }

        if (SliderDrag) {
            SliderDrag.style.zIndex = `${zIndexRoot + 2}`;

            if (dragDefaultHidden) {
                SliderDrag.style.opacity = '0';
            }
        }
        if (sliderMinDrag) {
            sliderMinDrag.style.zIndex = `${zIndexRoot + 2}`;

            if (dragDefaultHidden) {
                sliderMinDrag.style.opacity = '0';
            }
        }

        if (sliderBuffered) {
            sliderBuffered.style.width = `${bufferedWidth}%`;
            sliderBuffered.style.zIndex = `${zIndexRoot}`;
        }
        if (sliderShell && showCurrentValue) {
            sliderShell.style.paddingTop = `25px`;
        }
        if (sliderLimits && showSliderBoundaries) {
            sliderLimits.style.margin = `${dragObjectWidth/2}px 0 0 0`
        }
    }

    @Autobind
    private _getNearestWidth(mappedWidth: number) {
        const { values } = this.param;
        const { mappedValues } = this.calculated;
        
        if (mappedValues) {
            const { nearestMappedValue, nearestOriginalValue } = mappedValues.reduce((bestMatch: { nearestMappedValue: number | null, distance: number | null, nearestOriginalValue: number | null }, valueItem, valueIndex) => {
        
                if (bestMatch.nearestMappedValue === null || bestMatch.distance === null || bestMatch.nearestOriginalValue === null) {
                    bestMatch.nearestMappedValue = valueItem;
                    bestMatch.distance = Math.abs(valueItem - mappedWidth);
                    bestMatch.nearestOriginalValue = values[valueIndex];
                }
                else {
                    if (Math.abs(valueItem - mappedWidth) < bestMatch.distance) {
                        bestMatch.nearestMappedValue = valueItem;
                        bestMatch.distance = Math.abs(valueItem - mappedWidth);
                        bestMatch.nearestOriginalValue = values[valueIndex];
                    }
                }
    
                return bestMatch;
            }, { nearestMappedValue: null, distance: null, nearestOriginalValue: null });
    
            if ( nearestMappedValue !== null && nearestOriginalValue !== null) {
                return {
                    mappedValue: nearestMappedValue,
                    originalValue: nearestOriginalValue
                }
            }
        }
    }

    @Autobind
    private _changeSliderWidth (event: MouseEvent, targetSliderRef: React.RefObject<HTMLDivElement>, designation: string, moveCondition: (newWidth: number) => boolean) {
        const { sliderParent: {current: sliderParent}, sliderValue: {current: sliderValue}, sliderMinValue: {current: sliderMinValue} } = this.element;
        const { isContinuous, onChange, isDoubleSlider } = this.param;
        const { calculated: calcd } = this;

        const { current: targetSlider } = targetSliderRef;

        // Check if the moveable slider and parent exist, and if the mouse moved at least a whole pixel on the x axis
        if (targetSlider && sliderParent && event.movementX !== 0) {

            const parentWidthPx = sliderParent.offsetWidth;
            calcd.sumPathX += event.movementX;
            const targetWidth = targetSlider.offsetWidth + calcd.sumPathX;

            const originalWidth = this._revertMappedWidth(targetWidth);

            if(isContinuous) {
                if (targetWidth <= (parentWidthPx) && targetWidth >= 0 && moveCondition(targetWidth) && typeof originalWidth === 'number') {
    
                    switch (designation) {
                        case 'single':
                        case 'max': calcd.currentOriginalValue = originalWidth;
                            if (sliderValue) {
                                sliderValue.innerHTML = `${originalWidth}`;
                            }
                            break;
                        case 'min': calcd.currentOriginalMinValue = originalWidth;
                            if (sliderMinValue) {
                                sliderMinValue.innerHTML = `${originalWidth}`;
                            }
                            break;
                    }
    
                    onChange({
                        singleValue: isDoubleSlider ? null : calcd.currentOriginalValue,
                        maxDouble: isDoubleSlider ? calcd.currentOriginalValue : null,
                        minDouble: isDoubleSlider ? calcd.currentOriginalMinValue : null,
                    });
    
                    targetSlider.style.width = `${targetWidth}px`;
                    calcd.sumPathX = 0;
                }
            }
            else {
                if (calcd.mappedValues && originalWidth) {
                    const nearestValue = this._getNearestWidth(originalWidth);

                    if (nearestValue && targetSlider.offsetWidth !== nearestValue.mappedValue && moveCondition(nearestValue.mappedValue)) {
                        calcd.sumPathX = calcd.sumPathX - (nearestValue.mappedValue - targetSlider.offsetWidth);
    
                        targetSlider.style.width = `${nearestValue.mappedValue}px`;
    
                        switch (designation) {
                            case 'single':
                            case 'max': calcd.currentOriginalValue = originalWidth;
                                if (sliderValue) {
                                    sliderValue.innerHTML = `${originalWidth}`;
                                }
                                break;
                            case 'min': calcd.currentOriginalMinValue = originalWidth;
                                if (sliderMinValue) {
                                    sliderMinValue.innerHTML = `${originalWidth}`;
                                }
                                break;
                        }
                        onChange({
                            singleValue: isDoubleSlider ? null : calcd.currentOriginalValue,
                            maxDouble: isDoubleSlider ? calcd.currentOriginalValue : null,
                            minDouble: isDoubleSlider ? calcd.currentOriginalMinValue : null,
                        });
                    }
                }
            }  
        }
    }

    @Autobind
    private _ehMinSliderMove (event: MouseEvent) {
        const {sliderMin, slider} = this.element;

        this._changeSliderWidth(event, sliderMin, 'min', (newPos) => {
            return sliderMin.current && slider.current ? newPos < slider.current.offsetWidth : true;
        })
    }

    @Autobind
    private _ehSliderMinPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        const { sliderMinDrag: { current: sliderMinDrag }} = this.element;
        const { calculated: calcd } = this;

        if (sliderMinDrag) {
            sliderMinDrag.setPointerCapture(event.pointerId);

            calcd.sumPathX = 0;

            const abortDragMin = new AbortController();

            document.addEventListener('mousemove', this._ehMinSliderMove.bind(this), { signal: abortDragMin.signal, capture: true });
            document.addEventListener('mouseup', () => {
                abortDragMin.abort();
            }, { once: true });
        }
    }

    @Autobind
    private _ehSliderMove(event: MouseEvent) {
        const {slider, sliderMin} = this.element;

        this._changeSliderWidth(event, slider, 'max', (newPos) => {
            return (sliderMin.current) ? newPos > sliderMin.current.offsetWidth : true;
        })
    }

    @Autobind
    private _ehSliderPointerDown(event: React.PointerEvent<HTMLDivElement>) {
        const { sliderDrag: { current: sliderDrag } } = this.element;
        const { calculated: calcd } = this;

        if (sliderDrag) {
            sliderDrag.setPointerCapture(event.pointerId);

            calcd.sumPathX = 0;

            const abortDragMax = new AbortController();

            document.addEventListener('mousemove', this._ehSliderMove, { signal: abortDragMax.signal });
            document.addEventListener('mouseup', () => {
                abortDragMax.abort();
            }, { once: true });
        }
    }

    @Autobind
    private _ehDragPointerdown() {
        const { onDragDown, isDoubleSlider } = this.param;
        const {calculated: calcd} = this;
        onDragDown({
            singleValue: isDoubleSlider ? null : calcd.currentOriginalValue,
            maxDouble: isDoubleSlider ? calcd.currentOriginalValue : null,
            minDouble: isDoubleSlider ? calcd.currentOriginalMinValue : null,
        });
    }

    @Autobind
    private _ehDragMinPointerdown() {
        const { onDragMinDown, isDoubleSlider } = this.param;
        const {calculated: calcd} = this;
        onDragMinDown({
            singleValue: isDoubleSlider ? null : calcd.currentOriginalValue,
            maxDouble: isDoubleSlider ? calcd.currentOriginalValue : null,
            minDouble: isDoubleSlider ? calcd.currentOriginalMinValue : null,
        });
    }

    @Autobind
    private _ehDragPointerup() {
        const { onDragUp, isDoubleSlider } = this.param;
        const {calculated: calcd} = this;
        onDragUp({
            singleValue: isDoubleSlider ? null : calcd.currentOriginalValue,
            maxDouble: isDoubleSlider ? calcd.currentOriginalValue : null,
            minDouble: isDoubleSlider ? calcd.currentOriginalMinValue : null,
        });
    }

    @Autobind
    private _ehDragMinPointerup() {
        const { onDragMinUp, isDoubleSlider } = this.param;
        const {calculated: calcd} = this;
        onDragMinUp({
            singleValue: isDoubleSlider ? null : calcd.currentOriginalValue,
            maxDouble: isDoubleSlider ? calcd.currentOriginalValue : null,
            minDouble: isDoubleSlider ? calcd.currentOriginalMinValue : null,
        });

    }

    @Autobind
    setSliderWidth(width: number) {
        const {calculated: calcd} = this;
        const { slider: { current: slider } } = this.element;

        const mappedWidth = this._getMappedWidth(width);
        
        if (slider && mappedWidth) {
            calcd.currentOriginalValue = mappedWidth;
            slider.style.width = `${mappedWidth}px`;
        }
    }

    @Autobind
    setSliderMinWidth(width: number) {
        const {calculated: calcd} = this;
        const { sliderMin: { current: sliderMin } } = this.element;

        const mappedWidth = this._getMappedWidth(width);

        if (sliderMin && mappedWidth) {
            calcd.currentOriginalMinValue = mappedWidth;
            sliderMin.style.width = `${mappedWidth}px`;
        }

    }

    @Autobind
    setSliderRange(values: number[], startingValue?: number, startingMinValue?: number) {
        const {calculated: calcd} = this;
        if (Array.isArray(values) && values.length > 0 && this.param.values !== values ) {

            this.param.values = values;
            this.param.minValue = values[0];
            this.param.maxValue = values[values.length - 1];
            this.param.fullRange = values[values.length - 1] - values[0];
            // this.param.currentValue = typeof initialValue === 'number' ? initialValue : (this.param.isDoubleSlider ? values[values.length - 1] : values[0]);
            // this.param.currentMinValue = typeof initialMinValue === 'number' ? initialMinValue : 0;
                
            // this.param.currentOriginalValue = typeof initialValue === 'number' ? initialValue : (this.param.isDoubleSlider ? values[values.length - 1] : values[0]);
            // this.param.currentOriginalMinValue = typeof initialMinValue === 'number' ? initialMinValue : 0;
        }
    }

    @Autobind
    setBufferedWidth(width: number) {
        const {sliderBuffered: { current: sliderBuffered }} = this.element;

        const mappedWidth = this._getMappedWidth(width);

        if (sliderBuffered && mappedWidth) {
            this.param.bufferedWidth = mappedWidth;
            sliderBuffered.style.width = `${mappedWidth}px`;
        }

    }

    @Autobind
    GetSlider() {
        const {sliderShell, sliderParent, sliderBuffered, sliderMin, sliderMinDrag, sliderMinValue, slider, sliderDrag, sliderValue, sliderLimits} = this.element;
        const {isDoubleSlider, showCurrentValue, showSliderBoundaries, minValue, maxValue} = this.param;
        const {calculated: calcd} = this;

        useEffect(() => {
            this.calculated.mappedValues =  this._getMappedWidths();
            this._setDefaultStyling();
        });

        return (
            <div className="w-100" ref={sliderShell} >
                <div className="vySlider" ref={sliderParent} >
                    <div className="buffered-width" ref={sliderBuffered}></div>
                    <div className="slider-min" ref={sliderMin}>
                        {isDoubleSlider ? <div className="drag-min" ref={sliderMinDrag} onPointerDown={(e) => { this._ehSliderMinPointerDown(e), this._ehDragMinPointerdown() }} onPointerUp={this._ehDragMinPointerup} >
                            {showCurrentValue ? <div className="slider-value" ref={sliderMinValue}>{calcd.currentOriginalMinValue}</div> : null}
                        </div> : null}
                    </div>
                    <div className="slider-max" ref={slider}>
                        <div className="drag-max" ref={sliderDrag} onPointerDown={(e) => { this._ehSliderPointerDown(e), this._ehDragPointerdown() }} onPointerUp={this._ehDragPointerup}  >
                            {showCurrentValue ? <div className="slider-value" ref={sliderValue} >{calcd.currentOriginalValue}</div> : null}
                        </div>
                    </div>
                </div>
                {
                    showSliderBoundaries ?
                    <div className="d-flex justify-content-between" ref={sliderLimits} >
                        <div className="ms-2">{minValue}</div>
                        <div className="me-2" >{maxValue}</div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
