# `Olympic2020` class

エンブレム１文字を表現するクラス

## _Olympic2020 Constructor_

### `constructor(c, opt)`

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

## _Olympic2020 Instance Method_

### `Olympic2020#to(c)`

エンブレムを別の文字に変化させる

#### Arguments

1. __`c`__ _(stirng)_ : 変化させる文字

#### Returns

_(boolean)_ : 与えられた文字に変化した場合はtrue、文字が不正もしくは変化しない場合falseを返す

