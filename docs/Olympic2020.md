# `Olympic2020` class

エンブレム１文字を表現するクラス

## Usage

```javascript
var olm = Olympic2020('t', { size: 300 }); // initial charactor and size in px.

document.addEventListener('DOMContentLoaded', function() {

    olm.appendTo(document.body);
    // or other way.
    // document.body.appendChild(olm.dom);
    // olm.dom is instance of DOMElement.

    olm.to('z'); // change to another charactor.

    olm.animateFromString('tokyo olympic 2020'); // animate from string.
});
```


## `Olympic2020` Constructor

### `Olympic2020(c, opt)`

#### Arguments

1. __`[c=null]`__ _(string)_ : エンブレムが表す文字の初期値
2. __`[opt]`__ _(Object)_ : その他のオプション
  - __`[opt.size=100]`__ _(number)_ : エンブレムの大きさ、単位はpx
  - __`[opt.displayTime=1500]`__ _(number)_ : アニメーション時、opt.durationの時間を含めて一文字が表示され続けている時間
  - __`[opt.duration=1000]`__ _(number)_ : アニメーション時、次の文字に変化するのに掛かる時間
  - __`[opt.loop=false]`__ _(boolean)_ : animateFromString実行時、アニメーションをループさせるかどうか
  - __`[opt.random=false]`__ _(boolean)_ : animateFromString実行時、与えられた文字列から次に変化する文字をランダムで選ぶ
  - __`[opt.pedal=true]`__ _(boolean)_ : エンブレムに文字が設定された際、その文字が現在と同じ場合何もしない
  - __`[opt.easing='cubic-bezier(.26,.92,.41,.98)']`__ _(string)_ : 次の文字に変化するアニメーションのイージング、CSS3timing-function

## `Olympic2020` Instance Method

### `Olympic2020.prototype.to(c)`

エンブレムを別の文字に変化させる

#### Arguments

1. __`c`__ _(stirng)_ : 変化させる文字

#### Returns

_(boolean)_ : 与えられた文字に変化した場合はtrue、文字が不正もしくは変化しない場合falseを返す

### `Olympic2020.prototype.appendTo(parent)`

与えられた要素にエンブレムを追加する

#### Arguments

1. __`parent`__ _(ParentNode)_ : エンブレムを追加する親要素


### `Olympic2020.prototype.animateFromString(str, opt)`

与えられた文字列に沿って順に文字を変化せていく

#### Arguments

1. __`str`__ _(string)_ : アニメーションの元になる文字列、この文字列の先頭から順にエンブレムを変化させていく
2. __`[opt]`__ _(Object)_ : その他のオプション
  - __`[opt.size=100]`__ _(number)_ : エンブレムの大きさ、単位はpx
  - __`[opt.displayTime=1500]`__ _(number)_ : アニメーション時、opt.durationの時間を含めて一文字が表示され続けている時間
  - __`[opt.duration=1000]`__ _(number)_ : アニメーション時、次の文字に変化するのに掛かる時間
  - __`[opt.loop=false]`__ _(boolean)_ : animateFromString実行時、アニメーションをループさせるかどうか
  - __`[opt.random=false]`__ _(boolean)_ : animateFromString実行時、与えられた文字列から次に変化する文字をランダムで選ぶ
  - __`[opt.pedal=true]`__ _(boolean)_ : エンブレムに文字が設定された際、その文字が現在と同じ場合何もしない
  - __`[opt.easing='cubic-bezier(.26,.92,.41,.98)']`__ _(string)_ : 次の文字に変化するアニメーションのイージング、CSS3timing-function

### `Olympic2020.prototype.stopAnimate()`

`Olympic2020.prototype.animateFromString()`の実行を中断する

### `Olympic2020.prototype.resumeAnimate()`

`Olympic2020.prototype.stopAnimate()`で中断したアニメーションを再開する
