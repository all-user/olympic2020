# `EmblemGroup` Class

`Olympic2020`のインスタンスをまとめて扱うためのクラス。<br>
`Olympic2020`が１文字を表現するのに対し、`EmblemGroup`は文字列を表現することが出来る。<br>
内部に[`Olympic2020`](https://github.com/all-user/olympic2020/blob/master/docs/Olympic2020.md#olympic2020-class)のインスタンスの配列を持ち、それらに対して様々な操作を行うことが出来る。

## Usage

```javascript
var group = new EmblemGroup('tokyo 2020');
console.log(group.toString()); // 'tokyo 2020'
console.log(group.emblems);    // Array of Olympic2020 instances.

document.addEventListener('DOMContentLoaded', e => {

    group.appendTo(document.body);

    group.map('olympic paralympic games');
    console.log(group.toString()); // 'olympic pa'
    // Ignore over initial length.
});
```


------------------------------

#### `EmblemGroup Constructor`

- [constructor](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupchars-opt)

#### `EmblemGroup Instance Methods`

- [map](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototypemapstr)
- [appendTo](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototypeappendtoparent)
- [animateFromString](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototypeanimatefromstringstr-opt)
- [animateFromStringArray](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototypeanimatefromstringarraystrarr-opt)
- [stopAnimate](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototypestopanimate)
- [resumeAnimate](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototyperesumeanimate)
- [toString](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblemgroupprototypetostring)

#### `EmblemGroup Instance Properties`

- [options](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#options)
- [length](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#displaytime)
- [displayTime](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#displaytime)
- [loop](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#loop)
- [random](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#random)

#### `EmblemGroup Instance Getter Properties`

- [emblems](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#emblems)
- [isAnimating](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md#isanimating)

------------------------------

## _EmblemGroup Constructor_

### `EmblemGroup(chars, opt)`

`EmblemGroup`のインスタンスを生成する。


#### Arguments

1. __`chars`__ _(string)_ : この文字列の各文字から`Olympic2020`のインスタンスを生成する。
2. __`[opt]`__ _(Object)_ : その他のオプション。
  - __`[opt.length]`__ _(number)_ : 内部的に保持する`Olympic2020`インスタンスの数を指定する。
  - __`[opt.size]`__ _(number)_ : 内部に保持する`Olympic2020`のインスタンスに対してまとめてサイズを指定する、[`Olympic2020`のオプション](https://github.com/all-user/olympic2020/blob/master/docs/Olympic2020.md#arguments)を参照。
  - __`[opt.displayTime]`__ _(number=1500)_ : `EmblemGroup.prototype.animateFromString`、`EmblemGroup.prototype.animateFromStringArray`実行時、次のパターンへ切り替わるまでの`opt.duration`を含めた表示時間。
  - __`[opt.duration]`__ _(number)_ : `EmblemGroup.prototype.animateFromString`、`EmblemGroup.prototype.animateFromStringArray`実行時、次のパターンへ切り替わるアニメーションに掛かる時間。
  - __`[opt.loop]`__ _(boolean)_ : `EmblemGroup.prototype.animateFromString`、`EmblemGroup.prototype.animateFromStringArray`実行時、アニメーションをループさせるかどうか。

------------------------------

## _EmblemGroup Instance Methods_

### `EmblemGroup.prototype.map(str)`

グループが表現する文字列を引数で受け取った文字列で置き換える。<br>
受け取った文字列に添って、内部に持つ`Olympic2020`インスタンスの文字を変更していく。<br>
元の文字列の長さを超える部分はカットされ、元の長さに満たない部分は` `半角スペースで埋められる。

#### Arguments

1. __`str`__ _(string)_ : グループで表現する新しい文字列。

------------------------------

### `EmblemGroup.prototype.appendTo(parent)`

受け取った要素にエンブレムの文字列を追加する。

#### Arguments

1. __`parent`__ _(ParentNode)_ : エンブレムの文字列を追加する親要素。


------------------------------

### `EmblemGroup.prototype.animateFromString(str, opt)`

受け取った文字列に沿って、グループの表現する文字列を順に変化せていく。

#### Arguments

1. __`str`__ _(string)_ : アニメーションの元になる文字列。グループの持つ文字列の長さで分割され、順番に切り替わる。
2. __`[opt]`__ _(Object)_ : その他のオプション。
  - __`[opt.size]`__ _(number)_ : エンブレムの大きさ、単位はpx。
  - __`[opt.displayTime]`__ _(number)_ : 次のパターンへ切り替わるまでの`opt.duration`を含めた表示時間。
  - __`[opt.duration]`__ _(number)_ : 次のパターンへ切り替わるアニメーションに掛かる時間
  - __`[opt.loop]`__ _(boolean)_ : アニメーションをループさせるかどうか。

------------------------------

### `EmblemGroup.prototype.animateFromStringArray(strArr, opt)`

グループの表現する文字列を、配列の頭から順にその中の文字列に変化させていく。<br>
配列内の文字列が元の文字列より長い場合は超える部分がカットされ、元の文字列より短い場合は` `半角スペースで埋められる。

#### Arguments

1. __`strArr`__ _(Array)_ : アニメーションの元になる文字列。グループの持つ文字列の長さで分割され、順番に切り替わる。
2. __`[opt]`__ _(Object)_ : その他のオプション。
  - __`[opt.size]`__ _(number)_ : エンブレムの大きさ、単位はpx。
  - __`[opt.displayTime]`__ _(number)_ : 次のパターンへ切り替わるまでの`opt.duration`を含めた表示時間。
  - __`[opt.duration]`__ _(number)_ : 次のパターンへ切り替わるアニメーションに掛かる時間
  - __`[opt.loop]`__ _(boolean)_ : アニメーションをループさせるかどうか。

------------------------------

### `EmblemGroup.prototype.stopAnimate()`

`EmblemGroup.prototype.animateFromString()`、`EmblemGroup.prototype.animateFromStringArray()`の実行を中断する。

------------------------------

### `EmblemGroup.prototype.resumeAnimate()`

`EmblemGroup.prototype.stopAnimate()`で中断したアニメーションを再開する。

------------------------------

### `EmblemGroup.prototype.toString()`

グループの表現する文字列を取得する。

------------------------------

## _EmblemGroup Instance Properties_

### `options`

オブジェクトを代入することでオプションをまとめて設定出来る。<br>
また、参照することでオプション設定をオブジェクトで取得出来る。

#### Type

_(Object)_

#### Example
```javascript
let group = new EmblemGroup('some message', { length: 30, displayTime: 12000 });
console.log(olm.options);
// {
//     length     : 30,
//     displayTime: 12000,
//     loop       : false,
//     random     : false,
// }

olm.opttion = { loop: true, random: true };
console.log(olm.options);
// {
//     length     : 30,
//     displayTime: 12000,
//     loop       : true,
//     random     : true,
// }
```

------------------------------


### `displayTime`

アニメーション時、次のパターンへ切り替わるまでの表示時間。<br>
単位は1/1000秒。

#### Type

_(number)_

------------------------------

### `loop`

`EmblemGroup.prototype.animateFromString`、あるいは`EmblemGroup.prototype.animateFromStringArray`実行時、アニメーションをループさせるかどうか。

#### Type

_(boolean)_

------------------------------

### `random`

このオプションが有効の時`EmblemGroup.prototype.animateFromString`、あるいは`EmblemGroup.prototype.animateFromStringArray`を実行すると、受け取った文字列、配列から次に変化する文字列をランダムで選ぶようになる。

#### Type

_(boolean)_

------------------------------

## _EmblemGroup Instance Getter Properties_

### `emblems`

`Olympic2020`のインスタンスの配列。

#### Type

_(Array)_

------------------------------

### `isAnimating`

現在`EmblemGroup.prototype.animateFromString`が実行中かどうか。

#### Type

_(boolean)_
