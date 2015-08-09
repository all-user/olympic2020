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
        var olm = Olympic2020('t', 300); // initial charactor and size in px.

        document.addEventListener('DOMContentLoaded', function() {

            document.body.appendChild(olm.dom); // olm.dom is instance of DOMElement.

            olm.formTo('z'); // change to another charactor.

            olm.animateFromString('tokyo olympic 2020'); // animate from string.
        });
    </script>
</body>
```
