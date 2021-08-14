import React from "react";
import { render, fireEvent } from "../../utils/testUtils";
import { RenderResult } from "@testing-library/react";
import Register from "./Register";
import { get } from "react-hook-form";

const TEST_EMAIL = "abc@gmail.com";
const TEST_PASSWORD = "123456";

let component: RenderResult;

beforeEach(() => {
  component = render(<Register />);
});

describe("Register page render correctly", () => {
  test("Register page render", () => {
    const { asFragment } = component;
    expect(asFragment).toMatchSnapshot();
  });

  test("Register page show Email input field", () => {
    const { getAllByLabelText } = component;
    expect(getAllByLabelText("Email").length).toEqual(1);
  });
  test("Register page show Password input field", () => {
    const { getAllByLabelText } = component;
    expect(getAllByLabelText("Password").length).toEqual(1);
  });

  test("Register page show Register button", () => {
    const { getAllByLabelText } = component;
    expect(getAllByLabelText("Register").length).toEqual(1);
  });

  test("Register page show Login link", () => {
    const { getAllByLabelText } = component;
    expect(getAllByLabelText("To Login Page").length).toEqual(1);
  });
});

describe("Register page function properly", () => {
  test("Email input allow input and change value", () => {
    const { getByLabelText, getAllByDisplayValue } = component;
    const emailInputRef = getByLabelText("Email") as HTMLInputElement;
    fireEvent.input(emailInputRef, { target: { value: TEST_EMAIL } });
    expect(getAllByDisplayValue(TEST_EMAIL).length).toEqual(1);
  });
  test("Password input allow input and change value", () => {
    const { getByLabelText, getAllByDisplayValue } = component;
    const passwordInputRef = getByLabelText("Password") as HTMLInputElement;
    fireEvent.input(passwordInputRef, { target: { value: TEST_PASSWORD } });
    expect(getAllByDisplayValue(TEST_PASSWORD).length).toEqual(1);
  });

  test("Checkbox allow input to be checked and unchecked", () => {
    const { getByRole } = component;
    const checkboxInputRef = getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkboxInputRef);
    expect(checkboxInputRef.checked).toEqual(true);
    fireEvent.click(checkboxInputRef);
    expect(checkboxInputRef.checked).toEqual(false);
  });
});
