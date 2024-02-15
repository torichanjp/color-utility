import React from 'react';
import { render, screen } from '@testing-library/react';
import {Color} from "./index";
import {Color as ColorElement} from "../../lib/color"

const getColorElem = (hex: string, text?: string): HTMLDivElement => {
    const color = new ColorElement(hex)
    render(<Color color={color} text={text}/>)
    const regex = RegExp(`${color.hex}`)
    return screen.getByLabelText(regex) as HTMLDivElement
}

test("Color has some children.", () => {
    const elem = getColorElem("FF0000")
    expect(elem.childElementCount).toBeGreaterThanOrEqual(1)
})

test("Specify text", () => {
    const text = "Red"
    const elem = getColorElem("FF0000", text)
    const p = elem.firstChild as HTMLParagraphElement
    expect(p.textContent).toBe(text)
})

test("#648df9 is black text.", () => {
    const elem = getColorElem("648df9")
    expect(elem.style.color).toBe("black")
})

test("#a38654 is white text.", () => {
    const elem = getColorElem("a38654")
    expect(elem.style.color).toBe("white")
})

test("Snap shot for Color", () => {
    const color = new ColorElement("FFFFFF")
    const view = render(<Color color={color}/>);
    expect(view.container).toMatchSnapshot();
});
