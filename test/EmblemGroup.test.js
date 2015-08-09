import assert from 'power-assert'
import appendCSS from 'append-css'

describe('EmblemGroup test', () => {

    const TITLE_COPY = 'tokyo 2020';
    const LONG_COPY  = 'olympic paralympic games';
    const SHORT_COPY = 'a to z';
    const BLANK_COPY = '                                                        ';

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
            let group = new EmblemGroup(TITLE_COPY, LONG_COPY.length);

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
            let group = new EmblemGroup(TITLE_COPY, SHORT_COPY.length);

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
            }
        `);
        appendCSS(`
            #emblemgroup-test-field .olympic-emblem {
              margin: ${ EMBLEM_SIZE / 3 }px;
              float: left;
            }
        `);

        before('DOMContentLoaded待ち', done => {
            let link = document.createElement('link');
            link.setAttribute('rel',  'stylesheet');
            link.setAttribute('href', CSS_PATH);

            new Promise((resolve, reject) => {
                let readyState = document.readyState;

                if (readyState === 'interactive' || readyState === 'complete') {
                    resolve();
                } else {
                    window.onload = resolve;
                }
            }).then(() => {
                document.head.appendChild(link);
                document.body.appendChild(testField);
                done();
            });
        });
    });
});
