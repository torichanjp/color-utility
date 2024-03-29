# Color utility

## What can this utility do?

### Convert color from RGB space to HSV space
```typescript
import {Color} from "./lib/color";
const color = new Color("#ff638d")

// do something
console.log(color.toString())
```
#### Result
```text
hex:    ff638d
rgb:    r: 255, g: 99, b: 141,
        nr: 100, ng: 39, nb: 55
hsv:    h: 344, s: 61, v: 100
chroma: 0
luma:   59
```
### Optimized color sorting.
```typescript
import {ColorArray, Color} from "./lib/color";

const colors = [
    "#c5b9a1",
    "#ffffff",
    "#cfc2ab",
]
const colorElements = colors.map(color => new Color(color))
const sortedColors = new ColorArray(...colorElements)
    .sortDefault()
    .reverse()
// Do something
sortedColors.toString()
```

### Other sorting method
* sortByHue()
* sortByLuma()

## A sample of a sorted color palette.
```shell
$ yarn run start
```

### Output

[https://color-utility.torichan.jp/](https://color-utility.torichan.jp/)

![image](https://github.com/torichanjp/color-utility/assets/2854426/a079b580-2cc0-474f-961f-68c7c928f241)

## Development
```shell
$ yarn
$ yarn run start
```

## Build
```shell
$ yarn build
# If you have serve command, you can launch it on localhost.
$ serve build
```
