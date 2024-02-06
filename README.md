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
import {ColorLib, Color} from "./lib/color";

const colors = [
    "#c5b9a1",
    "#ffffff",
    "#cfc2ab",
]
const colorElements = colors.map(color => new Color(color))
const sortedColors = new ColorLib(...colorElements)
    .sortDefault()
    .reverse()
// Do something
sortedColors.toString()
```

### Other sorting method
* sortByHue()
* sortByLuma()

### A sample of a sorted color palette.
```shell
$ yarn run start
```

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

## Output

![color-palette](https://github.com/torichanjp/color-utility/assets/2854426/615f66d1-39f7-4e59-9b9f-1a3b1d41d5e8)
