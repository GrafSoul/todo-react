import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteNoteModal from './DeleteNoteModal';

describe('DeleteNoteModal', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();

    beforeEach(() => {
        render(
            <DeleteNoteModal
                show={true}
                onClose={handleClose}
                onDelete={handleDelete}
            />,
        );
    });

    test('renders DeleteNoteModal component with correct title and text', () => {
        expect(screen.getByText(/Confirm Deletion/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Are you sure you want to delete this note\?/i),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Cancel/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Delete/i }),
        ).toBeInTheDocument();
    });

    test('calls onClose when the cancel button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(handleClose).toHaveBeenCalled();
    });

    test('calls onDelete when the delete button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
        expect(handleDelete).toHaveBeenCalled();
    });

    test('calls onClose when the modal is dismissed', () => {
        fireEvent.click(screen.getByLabelText(/Close/i));
        expect(handleClose).toHaveBeenCalled();
    });
});
