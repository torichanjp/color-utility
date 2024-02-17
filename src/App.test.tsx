import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { colorObjs } from "./data/data";
import {ControlPanel} from "./components/ControlPanel";

const nColor = colorObjs.length

test('renders some elements', () => {
  render(<App />);
  const buttons = screen.queryAllByRole("button");
  expect(buttons).toHaveLength(4)

  // all colors
  const divs = screen.queryAllByText(/#[a-f0-9]{6}/i)
  expect(divs).toHaveLength(nColor)
});

test("Snap shot for App", () => {
  const view = render(<ControlPanel />);
  expect(view.container).toMatchSnapshot();
});
