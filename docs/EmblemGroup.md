# `EmblemGroup` Class

`Olympic2020`のインスタンスをまとめて扱うためのクラス。

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
