import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

  
describe('User Account', () => {
    it('should render edit button if user is admin', () => {
        const user: User = {
            id:1,
            name: "Noel",
            isAdmin: true
        }

        render(<UserAccount user={user}/>)

        const button = screen.queryByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    })


    it('should not render edit button if user is not admin', () => {
        const user: User = {
            id:1,
            name: "Noel",
            isAdmin: false
        }

        render(<UserAccount user={user}/>)

        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    })

    it('should render the user name', () => {
        const user: User = {
            id:1,
            name: "Noel",
            isAdmin: false
        }

        render(<UserAccount user={user}/>)

        const username = screen.getByText(/Noel/i);
        expect(username).toBeInTheDocument();
    })
})