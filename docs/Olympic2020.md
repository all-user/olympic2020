# Olympic2020

エンブレム１文字を表現するクラス

### `constructor(c, opt)`

#### Arguments
1. __`[c=null]`__ _(string)_ : エンブレムが表す文字の初期値
2. __`[opt]`__ _(Object)_ : その他のオプション
  - `[opt.size=100]` _(number)_ : エンブレムの大きさ、単位はpx
  - `[opt.displayTime=1500]` _(number)_ : アニメーション時、opt.durationの時間を含めて一文字が表示され続けている時間
  - `[opt.duration=1000]` _(number)_ : アニメーション時、次の文字に変化するのに掛かる時間
  - `[opt.loop=false]` _(boolean)_ : animateFromString実行時、アニメーションをループさせるかどうか
  - `[opt.random=false]` _(boolean)_ : animateFromString実行時、与えられた文字列から次に変化する文字をランダムで選ぶ
  - `[opt.pedal=true]` _(boolean)_ : エンブレムに文字が設定された際、その文字が現在と同じ場合何もしない
  - `[opt.easing='cubic-bezier(.26,.92,.41,.98)']` _(string)_ : 次の文字に変化するアニメーションのイージング、CSS3timing-function
