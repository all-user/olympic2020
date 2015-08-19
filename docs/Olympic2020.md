# Olympic2020

エンブレム１文字を表現するクラス

## constructor(c, opt)

### Arguments
1. `[c=null]`(string): エンブレムが表す文字の初期値
2. `[opt]`(Object): その他のオプション
  * `[opt.size=100]`: エンブレムの大きさ、単位はpx
  * `[opt.displayTime=1500]`: アニメーション時、opt.durationの時間を含めて一文字が表示され続けている時間
  * `[opt.duration=1000]`: アニメーション時、次の文字に変化するのに掛かる時間
  * `[opt.loop=false]`: animateFromString実行時、アニメーションをループさせるかどうか
  * `[opt.random=false]`: animateFromString実行時、与えられた文字列から次に変化する文字をランダムで選ぶ
  * `[opt.pedal=true]`: エンブレムに文字が設定された際、その文字が現在と同じ場合何もしない
  * `[opt.easing='cubic-bezier(.26,.92,.41,.98)']`: 次の文字に変化するアニメーションのイージング、CSS3timing-function
