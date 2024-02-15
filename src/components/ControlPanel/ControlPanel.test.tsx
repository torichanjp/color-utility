import React from 'react';
import { render, screen } from '@testing-library/react';
import { ControlPanel } from './index';
import userEvent from "@testing-library/user-event";
import {ParamsContext} from "../../contexts/ParamsContext";

test('ControlPanel has 4 buttons', async () => {
    render(<ControlPanel />);
    const buttons = await screen.queryAllByRole('button');
    expect(buttons).toHaveLength(4);
});

test('ControlPanel has a textbox', async () => {
    render(<ControlPanel />);
    const textBox = await screen.queryByRole('textbox');
    expect(textBox).not.toBeNull();
});

const buttonTest = async (name: string) => {
    const value = parseInt(name)

    render(<ParamsContext><ControlPanel /></ParamsContext>);
    const button = screen.getByRole("button", { name })
    const textBox = screen.getByLabelText("num-of-hue-divisions") as HTMLInputElement
    const currentValue = parseInt(textBox.value || "-99")
    await userEvent.click(button)
    expect(textBox.value).toBe((currentValue + value).toString())
}
test("-1 button affects the textbox.", async () => {
    await buttonTest("-1")
});

test("-10 button affects the textbox.", async () => {
    await buttonTest("-10")
});

test("+1 button affects the textbox.", async () => {
    await buttonTest("+1")
});

test("+10 button affects the textbox.", async () => {
    await buttonTest("+10")
});

test("Snap shot for ControlPanel", () => {
    const view = render(<ControlPanel />);
    expect(view.container).toMatchSnapshot();
});
