import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "../../src/components/UserAccount";

  
describe("User Account", () => {
    it("Should render edit button if user is admin", () => {
        const user: User = { id: 1, name: "Noel", isAdmin: true };

        render(<UserAccount user={user}/>);

        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    })


    it("Should not render edit button if user is not admin", () => {
        const user: User = { id: 1, name: "Noel", isAdmin: false };

        render(<UserAccount user={user}/>);

        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    })

    it("Should render the user name", () => {
        const user: User = { id: 1, name: "Noel", isAdmin: true };

        render(<UserAccount user={user}/>);

        const username = screen.getByText(/Noel/i);
        expect(username).toBeInTheDocument();
    })
})