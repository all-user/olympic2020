# Olympic2020

Generate emblem of Olympic in 2020.

## Usage

```shell
npm i @all-user/olympic2020
```

```html
<head>
    <script src="path/to/olympic2020/dist/bundle.js"></script>
    <link rel="stylesheet" href="path/to/olympic2020/dist/bundle.css">
</head>
<body>
    <script>
        var olm = Olympic2020('t', { size: 300 }); // initial charactor and size in px.

        document.addEventListener('DOMContentLoaded', function() {

            olm.appendTo(document.body);
            // or other way.
            // document.body.appendChild(olm.dom);
            // olm.dom is instance of DOMElement.

            olm.to('z'); // change to another charactor.

            olm.animateFromString('tokyo olympic 2020'); // animate from string.

            // grouping
            var group = new EmblemGroup('tokyo 2020');

            group.appendTo(document.body);
        });
    </script>
</body>
```

## Documentation

- [__`Olympic2020`__](https://github.com/all-user/olympic2020/blob/master/docs/Olympic2020.md)
- [__`EmblemGroup`__](https://github.com/all-user/olympic2020/blob/master/docs/EmblemGroup.md)
