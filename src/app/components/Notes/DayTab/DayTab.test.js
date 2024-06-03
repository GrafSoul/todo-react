import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import DayTab from './DayTab';

jest.mock('@components/Notes/NoteItem', () => () => <div>NoteItem</div>);

const mockStore = configureStore([]);

describe('DayTab', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            notes: {
                filter: 'all',
                data: [
                    {
                        notes: [
                            { checked: true, text: 'Note 1' },
                            { checked: false, text: 'Note 2' },
                        ],
                    },
                ],
            },
        });
    });

    const renderWithStore = (component) => {
        return render(<Provider store={store}>{component}</Provider>);
    };

    test('renders DayTab component with notes', () => {
        renderWithStore(<DayTab dayIndex={0} />);

        expect(screen.getAllByText(/NoteItem/i)).toHaveLength(2);
    });

    test('renders "No notes available" when no notes are present', () => {
        store = mockStore({
            notes: {
                filter: 'all',
                data: [{ notes: [] }],
            },
        });

        renderWithStore(<DayTab dayIndex={0} />);

        expect(screen.getByText(/No notes available/i)).toBeInTheDocument();
    });

    test('filters and renders only checked notes when filter is "ready"', () => {
        store = mockStore({
            notes: {
                filter: 'ready',
                data: [
                    {
                        notes: [
                            { checked: true, text: 'Note 1' },
                            { checked: false, text: 'Note 2' },
                        ],
                    },
                ],
            },
        });

        renderWithStore(<DayTab dayIndex={0} />);

        expect(screen.getAllByText(/NoteItem/i)).toHaveLength(1);
    });

    test('filters and renders only unchecked notes when filter is "notReady"', () => {
        store = mockStore({
            notes: {
                filter: 'notReady',
                data: [
                    {
                        notes: [
                            { checked: true, text: 'Note 1' },
                            { checked: false, text: 'Note 2' },
                        ],
                    },
                ],
            },
        });

        renderWithStore(<DayTab dayIndex={0} />);

        expect(screen.getAllByText(/NoteItem/i)).toHaveLength(1);
    });
});
