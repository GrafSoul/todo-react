import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutModal from '../../../../app/components/Modals/LogoutModal/LogoutModal';

describe('LogoutModal', () => {
    const handleClose = jest.fn();
    const handleLogout = jest.fn();

    beforeEach(() => {
        render(
            <LogoutModal
                show={true}
                handleClose={handleClose}
                handleLogout={handleLogout}
            />,
        );
    });

    it('renders LogoutModal component with correct title and text', () => {
        expect(screen.getByText(/Confirm Logout/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Are you sure you want to log out\?/i),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Cancel/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Logout/i }),
        ).toBeInTheDocument();
    });

    it('calls handleClose when the cancel button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
        expect(handleClose).toHaveBeenCalled();
    });

    it('calls handleLogout when the logout button is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
        expect(handleLogout).toHaveBeenCalled();
    });

    it('calls handleClose when the modal is dismissed', () => {
        fireEvent.click(screen.getByLabelText(/Close/i));
        expect(handleClose).toHaveBeenCalled();
    });
});
