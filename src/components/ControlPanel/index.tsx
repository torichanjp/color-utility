import React, {useState} from "react";
import classes from "./ControlPanel.module.sass"
import { useParams } from "../../contexts/ParamsContext"

export const ControlPanel: React.FC = () => {
    const { useLuma, hueDivisions, setHueDivisions, setUseLuma } = useParams()
    const [inputValue, setInputValue] = useState(hueDivisions.toString())

    const buttonClick = (value: number, minusPlus: number, condition: Function, minMax: number) => {
        const n = value + minusPlus
        const v = condition(n) ? minMax : n
        setHueDivisions(v)
        setInputValue(v.toString())
    }
    const minus1ButtonClick = () => {
        buttonClick(hueDivisions, -1, (n: number) => n <= 0, 0)
    }
    const minus10ButtonClick = () => {
        buttonClick(hueDivisions, -10, (n: number) => n <= 0, 0)
    }
    const plus1ButtonClick = () => {
        buttonClick(hueDivisions, +1, (n: number) => n >= 360, 360)
    }
    const plus10ButtonClick = () => {
        buttonClick(hueDivisions, +10, (n: number) => n >= 360, 360)
    }
    const valueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseInt(e.target.value)
        if (e.target.value.length === 0 || Number.isNaN(v)) {
            setInputValue(e.target.value)
            return
        }

        const _v = v < 0 ? 0 : (v > 360 ? 360 : v)
        setHueDivisions(_v)
        setInputValue(_v.toString())
    }
    const radioChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseLuma(e.target.value === "luma")
    };
    return (
        <div className={classes.wrapper}>
            <div className={classes.firstSortKey}>
                <p>First sort key: HSV Hue</p>
                <p className={classes.description}>How many divisions of HSV Hue?</p></div>
            <button onClick={minus10ButtonClick}>-10</button>
            <button onClick={minus1ButtonClick}>-1</button>
            <input type="text" aria-label="num-of-hue-divisions" value={inputValue} onChange={valueChanged}/>
            <button onClick={plus1ButtonClick}>+1</button>
            <button onClick={plus10ButtonClick}>+10</button>
            <div className={classes.secondSortKey}>
                <p>Second sort key</p>
                <input id="luma" type="radio" value="luma" checked={useLuma} onChange={radioChanged}/>
                <label htmlFor={"luma"}>Luma</label>
                <input id="hsv" type="radio" value="hsv" checked={!useLuma} onChange={radioChanged}/>
                <label htmlFor={"hsv"}>HSV Value</label>
            </div>

        </div>
    )
}
