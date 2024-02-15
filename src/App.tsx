import React from 'react';
import './App.css';
import { ColorsWithParams } from "./components/Color"
import { ColorArray, Color } from "./lib/color";
import { ControlPanel } from "./components/ControlPanel";
import { ParamsContext } from "./contexts/ParamsContext"
import {colorObjs} from "./data/data";

function App() {
    const colorElements = colorObjs.map(color => new Color(color))
    const colorArrays = new ColorArray(...colorElements)

    return (
        <div className="App">
            <ParamsContext>
                <ControlPanel/>
                <ColorsWithParams colors={colorArrays}/>
            </ParamsContext>
        </div>
    );
}

export default App;
