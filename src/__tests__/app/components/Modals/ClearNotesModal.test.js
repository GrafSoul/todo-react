import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClearNotesModal from '../../../../app/components/Modals/ClearNotesModal/ClearNotesModal';

describe('ClearNotesModal', () => {
    const handleClose = jest.fn();
    const handleClear = jest.fn();

    beforeEach(() => {
        render(
            <ClearNotesModal
                show={true}
                onClose={handleClose}
                onClear={handleClear}
            />,
        );
    });

    it('renders ClearNotesModal component with correct title and text', () => {
        expect(screen.getByText(/Confirm Clear/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Are you sure you want to clear this notes\?/i),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Cancel/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Clear/i }),
        ).toBeInTheDocument();
    });

    it('calls onClose when the cancel button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(handleClose).toHaveBeenCalled();
    });

    it('calls onClear when the clear button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Clear/i }));
        expect(handleClear).toHaveBeenCalled();
    });

    it('calls onClose when the modal is dismissed', () => {
        fireEvent.click(screen.getByLabelText(/Close/i));
        expect(handleClose).toHaveBeenCalled();
    });
});
