
export function addClickRipple(event: React.MouseEvent<HTMLElement, MouseEvent>, initialRippleWidth: number, colorClass: string, onRippleEnded: () => void) {
    
    const btnElement = event.target as HTMLButtonElement;
    const rippleDiv = document.createElement('div');
    rippleDiv.className = `vy-ripple-element ripple ${colorClass}`;
    rippleDiv.style.left = `${event.nativeEvent.offsetX - (initialRippleWidth / 2)}px`;
    rippleDiv.style.top = `${event.nativeEvent.offsetY - (initialRippleWidth / 2)}px`;
    btnElement.appendChild(rippleDiv);

    setTimeout(() => {
        onRippleEnded();
        btnElement.removeChild(rippleDiv);
    }, 2000);
}
