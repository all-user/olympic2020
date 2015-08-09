import assert from 'power-assert'
import appendCSS from 'append-css'

describe('EmblemGroup test', () => {
    const TITLE_COPY   = 'tokyo 2020';
    const LONG_COPY    = 'olympic paralympic games';
    const SHORT_COPY   = 'a to z';
    const BLANK_COPY   = '                                                        ';
    const EMBLEM_SIZE  = 90;
    const DISPLAY_TIME = 1000;
    const COPYS        = [
        TITLE_COPY,
        BLANK_COPY,
        LONG_COPY,
        BLANK_COPY,
        SHORT_COPY,
        '1234567890',
        BLANK_COPY,
        'happy day!',
        BLANK_COPY,
        'hello world',
        BLANK_COPY,
        TITLE_COPY,
        LONG_COPY,
        SHORT_COPY,
        '1234567890',
        'happy day!',
        'hello world',
    ];

    describe('インスタンスの生成', () => {
        let group = new EmblemGroup(TITLE_COPY);

        it('文字列から生成', done => {
            assert.equal(group.toString(), TITLE_COPY);
            done();
        });

        it('長い文字列を与えて変換', done => {
            group.map(LONG_COPY);
            assert.equal(group.toString(), LONG_COPY.slice(0, TITLE_COPY.length));
            done();
        });

        it('短い文字列を与えて変換', done => {
            group.map(SHORT_COPY);
            assert.equal(group.toString(), (SHORT_COPY + BLANK_COPY).slice(0, TITLE_COPY.length));
            done();
        });
    });

    describe('長さを指定してインスタンスの生成', () => {

        describe('与える文字列より長い長さを指定', () => {
            let group = new EmblemGroup(TITLE_COPY, { length: LONG_COPY.length });

            it('文字列から生成', done => {
                assert.equal(group.toString(), (TITLE_COPY + BLANK_COPY).slice(0, LONG_COPY.length));
                done();
            });

            it('長い文字列を与えて変換', done => {
                group.map(LONG_COPY);
                assert.equal(group.toString(), LONG_COPY);
                done();
            });

            it('短い文字列を与えて変換', done => {
                group.map(SHORT_COPY);
                assert.equal(group.toString(), (SHORT_COPY + BLANK_COPY).slice(0, LONG_COPY.length));
                done();
            });
        })

        describe('与える文字列より短い長さを指定', () => {
            let group = new EmblemGroup(TITLE_COPY, { length: SHORT_COPY.length });

            it('文字列から生成', done => {
                assert.equal(group.toString(), TITLE_COPY.slice(0, SHORT_COPY.length));
                done();
            });

            it('長い文字列を与えて変換', done => {
                group.map(LONG_COPY);
                assert.equal(group.toString(), LONG_COPY.slice(0, SHORT_COPY.length));
                done();
            });

            it('短い文字列を与えて変換', done => {
                group.map(SHORT_COPY);
                assert.equal(group.toString(), SHORT_COPY);
                done();
            });
        })
    });

    describe('DOM', () => {
        let testField = document.createElement('div');
        testField.id = 'emblemgroup-test-field';
        appendCSS(`
            #emblemgroup-test-field {
                width:    100%;
                display:  block;
                position: relative;
                margin:   0;
                padding:  0;
                clear:    both;
            }
        `);
        appendCSS(`
            #emblemgroup-test-field .olympic-emblem {
              margin: ${ EMBLEM_SIZE / 3 }px;
              float: left;
            }
        `);

        before('DOMContentLoaded待ち', done => {

            new Promise((resolve, reject) => {
                let readyState = document.readyState;

                if (readyState === 'interactive' || readyState === 'complete') {
                    resolve();
                } else {
                    window.onload = resolve;
                }
            }).then(() => {
                document.body.appendChild(testField);
                done();
            });

        });

        describe('インスタンスをDOMに追加', () => {

            let group = new EmblemGroup(TITLE_COPY, { length: TITLE_COPY.length, size: EMBLEM_SIZE });

            group.appendTo(testField);

            it('全てのOlympic2020インスタンスがDOMに存在するか', done => {
                group.emblems.forEach(e => {
                    assert.equal(e.dom.parentNode, testField);
                });
                setTimeout(done, DISPLAY_TIME);
            });

            describe('与えた配列中の文字列のに変化', () => {
                group.animateFromString(COPYS);
            });

        });


    });
});
