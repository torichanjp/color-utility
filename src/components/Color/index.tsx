import React from "react";
import "./Color.css"
import {Color as ColorLib} from "../../lib/color";

export const Color: React.FC<{color: ColorLib, text?: string}> = (props) => {
    const {color, text} = props
    const backgroundColor = '#' + color.hex
    const textColor = color.luma > 50 ? 'black' : 'white'
    const textJsx = (text ? [text] : ['#' + color.hex, `Hue: ${color.hsv.h}`, `Sat: ${color.hsv.s}`, `Val: ${color.hsv.v}`])
        .map((_text, i) => {
            return (
                <p key={i} style={{color: textColor}}>{_text}</p>
            )
    })

    return (
        <div className="colorItem" style={{backgroundColor: backgroundColor}}>
            {textJsx}
        </div>
    )
}

export const Colors: React.FC<{colors: ColorLib[]}> = (props) => {
    const {colors} = props
    const colorsTsx = colors.map((color, i) => {
        return (
            <Color key={i} color={color}/>
        )
    })
    return (
        <div className="color-container">
            {colorsTsx}
        </div>
    )
}
