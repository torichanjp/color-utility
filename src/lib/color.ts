import { sprintf } from 'sprintf-js'
/**
 *
 */

type RGB = {r: number, g: number, b: number, nr: number, ng: number, nb: number} // 0~255, 0~100 for prefix n
type HSV = {h: number, s: number, v: number} // 0~255

export class Color {
    chroma: number // 0~255
    luma: number // 0~255
    hsv: HSV
    rgb: RGB
    hex: string // color code which includes #

    constructor(hex: string) {
        const _hex = hex.startsWith('#') ? hex.substring(1) : hex
        const rgb = Color.hex2rgb(_hex)
        const hsv = Color.rgb2hsv(rgb)

        this.chroma = Math.max(rgb.nr, rgb.ng, rgb.nb) - Math.max(rgb.nr, rgb.ng, rgb.nb)
        this.luma = Math.round(0.3 * rgb.nr + 0.59 * rgb.ng + 0.11 * rgb.nb)
        this.hsv = hsv
        this.rgb = rgb
        this.hex = _hex
    }

    public static hex2rgb(hex: string): RGB {
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)

        return {
            r,
            g,
            b,
            nr: Math.round(r / 255 * 100),
            ng: Math.round(g / 255 * 100),
            nb: Math.round(b / 255 * 100),
        }
    }

    public static rgb2hsv(rgb: RGB): HSV {
        const calcHue = (chr: number) => {
            return (a: number, b: number, add: number) => 60 * (a - b) / chr + add
        }

        const {r, g, b} = rgb

        const max = Math.max(...[r, g, b]);
        const min = Math.min(...[r, g, b]);

        const chr = max - min;
        let hue = 0;
        const val = Math.round(max / 255 * 100);
        let sat: number;

        if (max === min || max === 0) {
            hue = 0
            sat = 0
        } else {
            sat = chr / max;
            const hueFunc = calcHue(chr)
            if (r === max) {
                hue = hueFunc(g, b, 0)
            } else if (g === max) {
                hue = hueFunc(b, r, 120)
            } else if (b === max) {
                hue = hueFunc(r, g, 240)
            }
            if (hue < 0) {
                hue += 360;
            }
        }

        return {
            h: Math.round(hue),
            s: Math.round(sat * 100),
            v: val,
        }
    }

    public static sortByLuma(colors: Color[]) {
        return colors.sort(function (a, b) {
            return a.luma - b.luma;
        })
    }

    public static sortByHue(colors: Color[]) {
        return colors.sort(function (a, b) {
            return a.hsv.h - b.hsv.h;
        })
    }

    public static sortDefault(colors: Color[]) {
        // 色相を10段階に分け、色相と明度でソートする。
        // hue = 0は、グレーと定義
        // satとvalを1次不等式でグレーに選別
        // sat <= -8/100val + 10
        return colors.map(color => {
            const hue = Math.round(color.hsv.h / 36) + 1
            const hueIndex = color.hsv.s + color.hsv.v * 8 / 100 <= 10 ? 0 : hue
            const sortKey = hueIndex * 1000 + color.luma
            return {
                sortKey,
                color,
            }
        }).sort((a, b) => {
            return a.sortKey - b.sortKey
        }).map(color => color.color)
    }

    public toString() {
        const rgb = sprintf('r:  %3d, g:  %3d, b:  %3d', this.rgb.r, this.rgb.g, this.rgb.b)
        const nrgb = sprintf('nr: %3d, ng: %3d, nb: %3d', this.rgb.nr, this.rgb.ng, this.rgb.nb)
        const hsv = sprintf('h:  %3d, s:  %3d, v:  %3d', this.hsv.h, this.hsv.s, this.hsv.v)

        return `
hex:    ${this.hex}
rgb:    ${rgb}
        ${nrgb}
hsv:    ${hsv}
chroma: ${this.chroma}
luma:   ${this.luma}
        `
    }
}

export class ColorLib extends Array<Color> {
    public sortByHue() {
        return Color.sortByHue(this)
    }

    public sortByLuma() {
        return Color.sortByLuma(this)
    }

    public sortDefault() {
        return Color.sortDefault(this)
    }
}
