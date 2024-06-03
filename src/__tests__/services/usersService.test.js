// usersService.test.js
import { getUsers } from '../../services/usersService';
import { ref, get } from 'firebase/database';

// Mock Firebase functions
jest.mock('firebase/database', () => ({
    ref: jest.fn(),
    get: jest.fn(),
}));

// Mock Firebase database
jest.mock('../../services/firebase', () => ({
    database: {},
}));

describe('getUsers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns users data when snapshot exists', async () => {
        const usersData = {
            user1: { name: 'User 1' },
            user2: { name: 'User 2' },
        };
        const snapshot = { exists: () => true, val: () => usersData };
        get.mockResolvedValue(snapshot);

        const result = await getUsers();

        expect(result).toEqual(usersData);
    });

    it('returns empty object when snapshot does not exist', async () => {
        const snapshot = { exists: () => false };
        get.mockResolvedValue(snapshot);

        const result = await getUsers();

        expect(result).toEqual({});
    });

    it('throws an error when get fails', async () => {
        const error = new Error('Failed to get users');
        get.mockRejectedValue(error);

        await expect(getUsers()).rejects.toThrow(error);
    });

    it('calls ref with correct arguments', async () => {
        const snapshot = { exists: () => true, val: () => ({}) };
        get.mockResolvedValue(snapshot);

        await getUsers();

        expect(ref).toHaveBeenCalledWith({}, 'users');
    });

    it('calls get with correct arguments', async () => {
        const snapshot = { exists: () => true, val: () => ({}) };
        get.mockResolvedValue(snapshot);

        const usersRef = ref({}, 'users');
        await getUsers();

        expect(get).toHaveBeenCalledWith(usersRef);
    });
});
