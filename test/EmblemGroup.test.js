import assert from 'power-assert'
import appendCSS from 'append-css'

describe('EmblemGroup test', () => {

    const TITLE_COPY = 'tokyo 2020';

    describe('インスタンスの生成', () => {

        it('文字列から生成', done => {
            let group = new EmblemGroup(TITLE_COPY);

            assert.equal(group.toString(), TITLE_COPY);
        });
    });
});
