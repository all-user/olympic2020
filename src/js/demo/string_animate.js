document.addEventListener('DOMContentLoaded', () => {
    var wrapper = document.querySelector('#wrapper');

    let d = new Date();
    const EMBLEM_SIZE     = 90;
    const ALL_VALID_CHARS = "abcdefghijklmnopqrstuvwxyz1234567890!.':;/_";
    const TITLE_COPY      = 'tokyo 2020';
    const SHORT_COPY      = 'hi!!';
    const DATE_COPY       = '8/9:sunday'
    const BLANK_COPY      = '                                                        ';
    const LONG_COPY       = 'olympic paralympic games';
    const COPYS           = [
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

    let group = new EmblemGroup(TITLE_COPY, { length: 20, size: EMBLEM_SIZE });

    group.appendTo(wrapper);

    wrapper.addEventListener('click', () => {
        if (group.isAnimating) {
            group.stopAnimate.call(group);
        } else {
            group.resumeAnimate.call(group);
        }
    });

    group.animateFromString(COPYS, { loop: true });
});
