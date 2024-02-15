import classes from "./Color.module.sass"
import {Color as ColorElement, ColorArray} from "../../lib/color";
import React from "react";
import {useParams} from "../../contexts/ParamsContext";

export const Color: React.FC<{color: ColorElement, text?: string}> = (props) => {
    const {color, text} = props
    const backgroundColor = '#' + color.hex
    const textColor = color.luma >= 55 ? 'black' : 'white'
    const textJsx = (text
        ? [text]
        : [
            '#' + color.hex,
            `Hue: ${color.hsv.h}`,
            `Sat: ${color.hsv.s}`,
            `Val: ${color.hsv.v}`,
            `Luma: ${color.luma}`
        ])
        .map((_text, i) => {
            return (
                <p key={i}>{_text}</p>
            )
    })

    return (
        <div
            aria-label={color.hex}
            className={classes.color__item}
            style={{backgroundColor: backgroundColor, color: textColor}}>
            {textJsx}
        </div>
    )
}

export const Colors: React.FC<{colors: ColorElement[]}> = (props) => {
    const {colors} = props
    const colorsTsx = colors.map((color) => {
        return (
            <Color key={color.hex} color={color}/>
        )
    })
    return (
        <div className={classes.color__container}>
            {colorsTsx}
        </div>
    )
}

export const ColorsWithParams: React.FC<{colors: ColorArray}> = (props) => {
    const { colors } = props
    const { useLuma, hueDivisions} = useParams()

    return (
        <>
            <Colors colors={colors.sortDefault(hueDivisions, useLuma).reverse()}/>
        </>
    )
}
