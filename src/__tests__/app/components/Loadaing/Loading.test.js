import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../../../../app/components/Loading/Loading';

describe('Loading', () => {
    it('renders Loading component with Spinner', () => {
        render(<Loading />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('applies correct styles to the loading container', () => {
        render(<Loading />);
        expect(screen.getByRole('status').parentElement).toHaveClass(
            'loadingContainer',
        );
    });
});
