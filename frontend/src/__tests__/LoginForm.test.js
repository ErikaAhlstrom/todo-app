import {render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from '../components/LoginForm';

test("that LoginForm has a submit button and that it triggers a click event", () => {
    
    let input = "";
    const onSubmit = () => {
        input = "Loggin in";
    }

    render(<LoginForm handleOnSubmit={onSubmit} />)

    const submit = screen.getByRole('button')
    expect(submit).toBeInTheDocument();

    fireEvent(submit, new MouseEvent("click"))
    expect(input).toBe("Loggin in")
})