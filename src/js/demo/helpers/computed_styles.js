function computedStyles() {
    const WIDTH   = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    const PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    const SIZE    = WIDTH - PADDING * 2;

    return { WIDTH, PADDING, SIZE };
}

export { computedStyles };
