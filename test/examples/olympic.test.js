import assert from 'power-assert'
import Olympic2020 from '../../src/js/Olympic2020.js'

describe('olympic emblem', () => {
  var o;
  var baseCharLower   = 'a';
  var baseCharUpper   = 'A';
  var baseCharInvalid = '$';
  var allValidChars   = "abcdefghijklmnopqrstuvwxyz1234567890!.':;/_";

  describe('引数なしでnew', () => {

    beforeEach('インスタンス生成', done => {
      o = new Olympic2020;
      done();
    })

    it('正しく生成されているか', done => {
      assert.equal(o.char, null);
      assert.ok(o instanceof Olympic2020);
      done();
    });

    describe('formToを使って文字を変更', () => {

      it('小文字を与えると小文字になる', done => {
        var res = o.formTo(baseCharLower);
        assert.equal(o.char, baseCharLower);
        assert.ok(res);
        done();
      });

      it('大文字を与えても小文字になる', done => {
        var res = o.formTo(baseCharUpper);
        assert.equal(o.char, baseCharLower);
        assert.ok(res);
        done();
      });

      it('無効な文字を与えるとfalseを返し、this.charは変化しない', done => {
        var res = o.formTo(baseCharInvalid);
        assert.equal(o.char, null);
        assert.equal(res, false);
        done();
      });

      it('"abc...xyz...:/_"全ての文字を順に変換', done => {
        [].reduce.call(allValidChars, (o, char) => {
          var res = o.formTo(char);
          assert.equal(o.char, char);
          assert.ok(res);
          return o;
        }, o);
        done();
      });
    });
  })

  describe('引数ありでnew', () => {

    beforeEach('インスタンス生成', done => {
      o = new Olympic2020(baseCharLower);
      done();
    })

    it('正しく生成されているか', done => {
      assert.equal(o.char, baseCharLower);
      assert.ok(o instanceof Olympic2020);
      done();
    });

    describe('formToを使って文字を変更', () => {

      it('小文字を与えると小文字になる', done => {
        var res = o.formTo(baseCharLower);
        assert.equal(o.char, baseCharLower);
        assert.ok(res);
        done();
      });

      it('大文字を与えても小文字になる', done => {
        var res = o.formTo(baseCharUpper);
        assert.equal(o.char, baseCharLower);
        assert.ok(res);
        done();
      });

      it('無効な文字を与えるとfalseを返し、this.charは変化しない', done => {
        var res = o.formTo(baseCharInvalid);
        assert.equal(o.char, baseCharLower);
        assert.equal(res, false);
        done();
      });

      it('"abc...xyz...:/_"全ての文字を順に変換', done => {
        [].reduce.call(allValidChars, (o, char) => {
          var res = o.formTo(char);
          assert.equal(o.char, char);
          assert.ok(res);
          return o;
        }, o);
        done();
      });
    });
  })

  it('大文字小文字を区別しない', done => {
    var lowerO = new Olympic2020(baseCharLower);
    var upperO = new Olympic2020(baseCharUpper);
    assert.equal(lowerO.char, baseCharLower);
    assert.equal(upperO.char, baseCharLower);
    done();
  });
});
