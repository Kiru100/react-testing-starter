import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet component", () => {
    it("Should render Hello with the name when name is provided", () => {
        render(<Greet name="Noel"/>)

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/noel/i);
    });

    it("Should render Login button when name is not provided", () => { 
        render(<Greet />)

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/login/i);
    });
})
