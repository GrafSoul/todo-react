import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewNoteModal from '../../../../app/components/Modals/ViewNoteModal/ViewNoteModal';

describe('ViewNoteModal', () => {
    const handleClose = jest.fn();
    const note = {
        title: 'Sample Note Title',
        text: '<p>This is the note text.</p>',
    };

    beforeEach(() => {
        render(<ViewNoteModal show={true} note={note} onClose={handleClose} />);
    });

    it('renders ViewNoteModal component with correct title and text', () => {
        expect(screen.getByText(note.title)).toBeInTheDocument();
        expect(screen.getByText('This is the note text.')).toBeInTheDocument();
        expect(screen.getByText(/Close/i)).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        fireEvent.click(screen.getByText(/Close/i));
        expect(handleClose).toHaveBeenCalled();
    });

    it('calls onClose when the modal is dismissed', () => {
        fireEvent.click(screen.getByLabelText(/Close/i));
        expect(handleClose).toHaveBeenCalled();
    });
});