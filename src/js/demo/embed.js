document.addEventListener('DOMContentLoaded', () => {
    let wrapper       = document.querySelector('#wrapper');
    let verticalInput = document.querySelector('#vertical');
    let horizonInput  = document.querySelector('#horizon');
    let displayInput  = document.querySelector('#display');
    let durationInput = document.querySelector('#duration');
    let messageInput  = document.querySelector('#message');
    let genButton     = document.querySelector('#generate-button');

    const WIDTH   = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    const PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    const SIZE    = WIDTH - PADDING * 2;
    const TITLE_COPY  = 'tokyo  2020   olympic';
    const SHORT_COPY  = 'hi!!';
    const DATE_COPY   = '8/9:sunday'
    const BLANK_COPY  = '                                                        ';
    const LONG_COPY   = 'olympic paralympic games';
    const COPYS       = [
        TITLE_COPY,
        LONG_COPY,
        SHORT_COPY,
        '1234567890',
        BLANK_COPY,
        DATE_COPY,
        'happy day!',
        BLANK_COPY,
        'hello world',
        TITLE_COPY,
        LONG_COPY,
        SHORT_COPY,
        BLANK_COPY,
        '1234567890',
        'happy day!',
        'hello world',
        BLANK_COPY,
    ];

    let cfg = {
        vertical: 3,
        horizon: 7,
        display: 1500,
        duration: 800,
        msg: COPYS.join('')
    };


    messageInput.textContent = COPYS.join('\n');

    clickButtonHandler(cfg);

    genButton.addEventListener('click', e => {
        clickButtonHandler();
    });

    function clickButtonHandler(cfg) {

        if (typeof cfg !== 'object') {
            let vertical = verticalInput.value | 0;
            let horizon  = horizonInput.value | 0;
            let display  = displayInput.value | 0;
            let duration = durationInput.value | 0;
            let msg      = messageInput.value.replace(/\n/g, '');

            cfg = { vertical, horizon, display, duration, msg };
        }

        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }

        let group = generateSignboard(cfg);
        group.appendTo(wrapper);

        wrapper.addEventListener('click', () => {
            if (group.isAnimating) {
                group.stopAnimate.call(group);
            } else {
                group.resumeAnimate.call(group);
            }
        });

        group.animateFromString(cfg.msg, { loop: true });
    }

    function generateSignboard(cfg) { // object => EmblemGroup
        if (!typeof cfg === 'object') { return; }

        let { vertical, horizon, display, duration, msg } = cfg;

        vertical = vertical || 3;
        horizon  = horizon || 7;
        display  = display || 1500;
        let margin      = SIZE / (horizon * 5);
        let emblemSize = margin * 3;

        let group = new EmblemGroup(msg, { length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

        group.emblems.forEach(e => {
            e.dom.style.margin = `${ margin }px`;
        });

        return group;
    }
});

