import assert from 'power-assert'
import appendCSS from 'append-css'

describe('Olympic2020 test', () => {
    const BASE_CHAR_LOWER   = 'a';
    const BASE_CHAR_UPPER   = 'A';
    const BASE_CHAR_INVALID = '$';
    const ALL_VALID_CHARS   = "abcdefghijklmnopqrstuvwxyz1234567890!.':;/_";
    const CSS_PATH          = 'src/bundle.css';
    const DISPLAY_TIME      = 1000;
    const EMBLEM_SIZE       = 90;
    const GOLD      = 'rgb(180, 145, 70)';
    const SILVER    = 'rgb(180, 180, 180)';
    const DARK_GRAY = 'rgb(55, 55, 55)';
    const SUN_RED   = 'rgb(230, 3, 20)';
    const BLANK     = 'rgba(0, 0, 0, 0)';

    describe('インスタンスの生成', () => {

        it('大文字小文字を区別しない', done => {
            let lowerO = new Olympic2020(BASE_CHAR_LOWER);
            let upperO = new Olympic2020(BASE_CHAR_UPPER);
            assert.equal(lowerO.char, BASE_CHAR_LOWER);
            assert.equal(upperO.char, BASE_CHAR_LOWER);
            done();
        });

        describe('引数なしでnew', () => {
            let o;

            beforeEach('インスタンス生成', done => {
                o = new Olympic2020;
                done();
            })

            it('正しく生成されているか', done => {
                assert.equal(o.char, null);
                assert.ok(o instanceof Olympic2020);
                done();
            });

            describe('toを使って文字を変更', () => {

                it('小文字を与えると小文字になる', done => {
                    let res = o.to(BASE_CHAR_LOWER);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    assert.ok(res);
                    done();
                });

                it('大文字を与えても小文字になる', done => {
                    let res = o.to(BASE_CHAR_UPPER);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    assert.ok(res);
                    done();
                });

                it('this.pedal有効時、現在の文字と同じ文字を与えるとfalseを返し、this.charは変化しない', done => {
                    o.to(BASE_CHAR_LOWER);
                    let res = o.to(BASE_CHAR_LOWER);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    assert.ok(o.pedal);
                    assert.equal(res, false);
                    done();
                });

                it('無効な文字を与えるとfalseを返し、this.charは変化しない', done => {
                    let res = o.to(BASE_CHAR_INVALID);
                    assert.equal(o.char, null);
                    assert.equal(res, false);
                    done();
                });

                it('"abc...xyz...:/_"全ての文字を順に変換', done => {
                    [].reduce.call(ALL_VALID_CHARS, (o, char) => {
                        let res = o.to(char);
                        assert.equal(o.char, char);
                        return o;
                    }, o);
                    done();
                });

                describe('olympic2020.optionsにオブジェクトを渡して設定', () => {
                    let opt = {
                        size:        800,
                        displayTime: 3000,
                        duration:    1200,
                        easing:      'cubic-bezier(.1,.8,.5,.9)',
                        loop:        false,
                        random:      true,
                        pedal:       false,
                    };

                    it('オプションの各パラメータが正しく設定されているか', done => {
                        o.options = opt;
                        assert.equal(o.displayTime, opt.displayTime);
                        assert.equal(o.duration,    opt.duration);
                        assert.equal(o.easing,      opt.easing);
                        assert.equal(o.loop,        opt.loop);
                        assert.equal(o.random,      opt.random);
                        assert.equal(o.pedal,       opt.pedal);
                        done();
                    });

                    it('o.optionsが返すオブジェクトが正しいか', done => {
                        o.options = opt;
                        assert.deepEqual(o.options, opt);
                        done();
                    });
                });
            });
        });

        describe('引数ありでnew', () => {
            let o;

            beforeEach('インスタンス生成', done => {
                o = new Olympic2020(BASE_CHAR_LOWER);
                done();
            })

            it('正しく生成されているか', done => {
                assert.equal(o.char, BASE_CHAR_LOWER);
                assert.ok(o instanceof Olympic2020);
                done();
            });

            describe('toを使って文字を変更', () => {

                it('小文字を与えると小文字になる', done => {
                    let res = o.to(BASE_CHAR_LOWER);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    assert.equal(res, false);
                    done();
                });

                it('大文字を与えても小文字になる', done => {
                    let res = o.to(BASE_CHAR_UPPER);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    done();
                });

                it('this.pedal有効時、現在の文字と同じ文字を与えるとfalseを返し、this.charは変化しない', done => {
                    o.to(BASE_CHAR_LOWER);
                    let res = o.to(BASE_CHAR_LOWER);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    assert.ok(o.pedal);
                    assert.equal(res, false);
                    done();
                });


                it('無効な文字を与えるとfalseを返し、this.charは変化しない', done => {
                    let res = o.to(BASE_CHAR_INVALID);
                    assert.equal(o.char, BASE_CHAR_LOWER);
                    assert.equal(res, false);
                    done();
                });

                it('"abc...xyz...:/_"全ての文字を順に変換', done => {
                    [].reduce.call(ALL_VALID_CHARS, (o, char) => {
                      let res = o.to(char);
                      assert.equal(o.char, char);
                      return o;
                    }, o);
                    done();
                });

                describe('olympic2020.optionsにオブジェクトを渡して設定', () => {
                    let opt = {
                        size:        800,
                        displayTime: 3000,
                        duration:    1200,
                        easing:      'cubic-bezier(.1,.8,.5,.9)',
                        loop:        false,
                        random:      true,
                        pedal:       false,
                    };

                    it('オプションの各パラメータが正しく設定されているか', done => {
                        o.options = opt;
                        assert.equal(o.displayTime, opt.displayTime);
                        assert.equal(o.duration,    opt.duration);
                        assert.equal(o.easing,      opt.easing);
                        assert.equal(o.loop,        opt.loop);
                        assert.equal(o.random,      opt.random);
                        assert.equal(o.pedal,       opt.pedal);
                        done();
                    });

                    it('o.optionsが返すオブジェクトが正しいか', done => {
                        o.options = opt;
                        assert.deepEqual(o.options, opt);
                        done();
                    });
                });
            });
        });

    });

    describe('DOM', () => {
        let testField = document.createElement('div');
        testField.id = 'olympic2020-test-field';
        appendCSS(`
            #olympic2020-test-field {
              width:    100%;
              display:  block;
              position: relative;
              margin:   0;
              padding:  0;
            }
        `);
        appendCSS(`
            #olympic2020-test-field .olympic-emblem {
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


        describe('aの文字を表示', () => {
            let olm = new Olympic2020('a', { size: EMBLEM_SIZE });
            olm.appendTo(testField);


            it('サイズが指定通りになっているか', done => {
                var recentStyle = getComputedStyle(olm.dom);
                assert.equal(olm.size, EMBLEM_SIZE);
                assert.equal(recentStyle.width,  `${ EMBLEM_SIZE }px`);
                assert.equal(recentStyle.height, `${ EMBLEM_SIZE }px`);
                done();
            });


            it('文字のスタイルが正しく設定されているか', done => {
                setTimeout(() => {
                    var recentStyles = [].map.call(olm.dom.childNodes, (node) => {
                        return getComputedStyle(node);
                    });
                    const A_STYLES = [
                        [GOLD],      [DARK_GRAY], [GOLD],
                        [SILVER],    [SUN_RED],   [SILVER],
                        [DARK_GRAY], [BLANK],     [DARK_GRAY]
                    ];
                    recentStyles.forEach((recentStyle, idx) => {
                        assert.equal(recentStyle.backgroundColor, A_STYLES[idx][0]);
                    });
                    done();
                }, DISPLAY_TIME);
            });

        });

        describe('/の文字を表示', () => {
            let olm = new Olympic2020('/');
            testField.appendChild(olm.dom);

            it('サイズが指定通りになっているか', done => {
                olm.size = EMBLEM_SIZE;
                let recentStyle = getComputedStyle(olm.dom);
                assert.equal(recentStyle.width,  `${ EMBLEM_SIZE }px`);
                assert.equal(recentStyle.height, `${ EMBLEM_SIZE }px`);
                setTimeout(done, DISPLAY_TIME);
            });

            it('文字のスタイルが正しく設定されているか', done => {
                let recentStyles = [].map.call(olm.dom.childNodes, (node) => {
                    return getComputedStyle(node);
                });
                const SLASH_STYLES = [
                    [GOLD],   [BLANK],  [SILVER],
                    [BLANK],  [SILVER], [GOLD],
                    [SILVER], [GOLD],   [BLANK]
                ];
                recentStyles.forEach((recentStyle, idx) => {
                    assert.equal(recentStyle.backgroundColor, SLASH_STYLES[idx][0]);
                });
                done();
            });
        });

        describe('aの文字を表示後toでzに変換',() => {
            let olm = new Olympic2020('a');
            testField.appendChild(olm.dom);

            before('aを表示', done => {
                olm.size = EMBLEM_SIZE;
                olm.to('z');
                setTimeout(done, DISPLAY_TIME);
            });

            it('サイズが指定通りになっているか', done => {
                let recentStyle = getComputedStyle(olm.dom);
                assert.equal(recentStyle.width,  `${ EMBLEM_SIZE }px`);
                assert.equal(recentStyle.height, `${ EMBLEM_SIZE }px`);
                done();
            });

            it('文字のスタイルが正しく設定されているか', done => {
                setTimeout(() => {
                    let recentStyles = [].map.call(olm.dom.childNodes, (node) => {
                        return getComputedStyle(node);
                    });
                    const A_STYLES = [
                        [GOLD],   [DARK_GRAY], [SILVER],
                        [BLANK],  [SUN_RED],   [BLANK],
                        [SILVER], [DARK_GRAY], [SILVER]
                    ];
                    recentStyles.forEach((recentStyle, idx) => {
                        assert.equal(recentStyle.backgroundColor, A_STYLES[idx][0]);
                    });
                    done();
                }, DISPLAY_TIME);
            });

        });

        describe('文字列に沿って順番に変化させる', () => {
            let olm = new Olympic2020('a', { size : 500 });
            testField.appendChild(olm.dom);
            olm.dom.addEventListener('click', () => {
                if (olm.isAnimating) {
                    olm.stopAnimate.call(olm);
                } else {
                    olm.resumeAnimate.call(olm);
                }
            });
            olm.animateFromString(ALL_VALID_CHARS, { loop: true });

            it('変化の様子を観察');
        });

        describe('グローバルにインスタンスを配置', () => {
            let olm = new Olympic2020('t');
            testField.appendChild(olm.dom);
            window.olympic = olm;
            olm.size = EMBLEM_SIZE;

            it('コンソールからテスト');
        });

    });

});
