import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox', () => {
    const renderSearchBox = () =>{
        const onChange = vi.fn();

        render(<SearchBox  onChange={onChange}/>);
        
        return{
            input: screen.getByPlaceholderText(/search/i),
            user: userEvent.setup(),
            onChange
        }
    }

    it('should render an input field for searching', () => {
        const {input} = renderSearchBox();
        expect(input).toBeInTheDocument(); 
    });

    it('should call onChange when enter is pressed', async () => {
        const {user, input, onChange} = renderSearchBox();  

        const search_term = "SeachValue";
        await user.type(input, search_term + "{enter}");

        expect(onChange).toHaveBeenCalledWith(search_term)
    })

    it('should not  call onChange if input field is empty', async () => {
        const {user, input, onChange} = renderSearchBox();  

        await user.type(input, "{enter}");
        expect(onChange).not.toHaveBeenCalled();
    })
})