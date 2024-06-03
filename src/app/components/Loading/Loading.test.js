import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './Loading';

describe('Loading', () => {
    test('renders Loading component with Spinner', () => {
        render(<Loading />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('applies correct styles to the loading container', () => {
        render(<Loading />);
        expect(screen.getByRole('status').parentElement).toHaveClass(
            'loadingContainer',
        );
    });
});
