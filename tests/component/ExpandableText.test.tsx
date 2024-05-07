import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';


describe('ExpandableText', () => {
    const limit = 255;
    const long_text = "a".repeat(limit + 1);
    const truncated_text = long_text.substring(0, limit) + "...";

    it("should render all text if it's not longer than 255 character limit", () => {
        const text = "hello, itdwd's me";

        render(<ExpandableText text={text} />); 

        const article = screen.getByText(text);
        expect(article).toBeInTheDocument();

    })

    it("should truncate text if it's longer than 255 character", () => {
        render(<ExpandableText text={long_text} />); 

        const article = screen.getByText(truncated_text);
        expect(article).toBeInTheDocument();

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(/more/i)
    });

    it("should expand text when Show More button is clicked", async () => {
        render(<ExpandableText text={long_text} />); 

        const button = screen.getByRole("button");
        const user = userEvent.setup();   
        await user.click(button);

        expect(screen.getByText(long_text)).toBeInTheDocument(); 
        expect(button).toHaveTextContent(/less/i)

    });

    it("should collapse text when Show Less button is clicked", async () => {
        render(<ExpandableText text={long_text} />); 
        const showMoreButton = screen.getByRole("button", {name: /more/i});
        const user = userEvent.setup();   
        await user.click(showMoreButton);

        const showLessButton = screen.getByRole("button", {name: /less/i});
        await user.click(showLessButton);

        expect(screen.getByText(truncated_text)).toBeInTheDocument(); 
        expect(showMoreButton).toHaveTextContent(/more/i)

    });
})