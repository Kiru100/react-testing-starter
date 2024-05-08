import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../src/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {

    const renderOrderStatusSelector = () =>{
        const onChange = vi.fn();

        render(
            <Theme>
                <OrderStatusSelector onChange={onChange} />
            </Theme>
        )

        return{
            button: screen.getByRole("combobox"),
            user: userEvent.setup(),
            getOption: (label: RegExp) => screen.findByRole("option", {name: label}),
            getOptions: ()=>screen.findAllByRole("option"),
            onChange
        }
    }

    it('should render New as the default value', () => {
        const {button} = renderOrderStatusSelector();

        expect(button).toHaveTextContent(/new/i);
    })

    it('should render correct statuses', async () => {
        const {user, button, getOptions} = renderOrderStatusSelector();
        
        await user.click(button);
     
        const options = await getOptions();
        expect(options).toHaveLength(3);
        const labels = options.map(option =>option.textContent);
        expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
    })

    it.each([
        {label: /process/i, value: "processed" },
        {label: /fulfilled/i, value: "fulfilled" },
        {label: /fulfilled/i, value: "fulfilled" },
    ])('should call onChange with $value when the $label option is selected.', async ({label, value}) => {
        const {button, user, onChange, getOption}  =  renderOrderStatusSelector();
        await user.click(button);

        const option = await getOption(label);
        await user.click(option);

        expect(onChange).toHaveBeenCalledWith(value);
    })

    it('should call onChange with "new" when the New Option is selected', async () => {
        const {button, user, onChange, getOption}  =  renderOrderStatusSelector();
        await user.click(button);

        const processedOption = await getOption(/processed/i);
        await user.click(processedOption);

        await user.click(button);
        const newOption = await getOption(/new/i);
        await user.click(newOption);

        expect(onChange).toHaveBeenCalledWith("new");
    })
})
