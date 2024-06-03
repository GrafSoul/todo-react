import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCheckbox from './CustomCheckbox';

describe('CustomCheckbox', () => {
    const handleChange = jest.fn();

    it('renders CustomCheckbox component', () => {
        render(<CustomCheckbox checked={false} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('applies checked class when checkbox is checked', () => {
        render(<CustomCheckbox checked={true} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
        expect(checkbox).toHaveClass('checkbox');
        expect(checkbox).toHaveClass('checked');
    });

    it('does not apply checked class when checkbox is unchecked', () => {
        render(<CustomCheckbox checked={false} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveClass('checkbox');
        expect(checkbox).not.toHaveClass('checked');
    });

    it('calls onChange when checkbox is clicked', () => {
        render(<CustomCheckbox checked={false} onChange={handleChange} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalled();
    });
});
