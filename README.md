# Olympic2020

Generate emblem of Olympic in 2020.

<iframe style="width:100%;height:100vh;border:none;" src="https://all-user.github.io/olympic2020/demo/embed_response/index.html?vertical=1&horizon=1&display=1500&duration=1500&msg=a%2Cb%2Cc%2Cd%2Ce%2Cf%2Cg%2Ch%2Ci%2Cj%2Ck%2Cl%2Cm%2Cn%2Co%2Cp%2Cq%2Cr%2Cs%2Ct%2Cu%2Cv%2Cw%2Cx%2Cy%2Cz%2C0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C%21%2C%3A%2C%3B%2C.%2C%27%2C%2F%2C_"></iframe>

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
