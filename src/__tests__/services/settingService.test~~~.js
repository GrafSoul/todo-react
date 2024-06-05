import {
    updateUserName,
    updateUserEmail,
    updateUserPassword,
} from '../../services/settingService';
import { MockFirebaseSdk } from 'firebase-mock';

const mockAuth = new MockFirebaseSdk.Auth();
const mockDatabase = new MockFirebaseSdk.Database();

jest.mock('../../services/firebase', () => ({
    auth: mockAuth,
    database: mockDatabase,
}));

describe('Setting Service', () => {
    beforeEach(() => {
        mockAuth.autoFlush();
        mockDatabase.autoFlush();
        jest.clearAllMocks();
    });

    describe('updateUserName', () => {
        it('should update the user name', async () => {
            mockAuth.changeAuthState({
                uid: '123',
                email: 'test@example.com',
                displayName: 'User',
            });

            const newName = 'New User Name';
            const result = await updateUserName(newName);

            expect(mockAuth.currentUser.displayName).toBe(newName);
            const userData = await mockDatabase
                .child(`users/123`)
                .once('value');
            expect(userData.val().displayName).toBe(newName);
            expect(result).toEqual({
                uid: '123',
                email: 'test@example.com',
                displayName: newName,
                role: undefined,
            });
        });

        it('should throw an error if no user is signed in', async () => {
            mockAuth.changeAuthState(null);

            await expect(updateUserName('New User Name')).rejects.toThrow(
                'No user is signed in.',
            );
        });
    });

    describe('updateUserEmail', () => {
        it('should update the user email', async () => {
            mockAuth.changeAuthState({
                uid: '123',
                email: 'test@example.com',
                displayName: 'User',
            });

            const newEmail = 'new@example.com';
            const password = 'password123';
            const result = await updateUserEmail(newEmail, password);

            expect(mockAuth.currentUser.email).toBe(newEmail);
            const userData = await mockDatabase
                .child(`users/123`)
                .once('value');
            expect(userData.val().email).toBe(newEmail);
            expect(result).toEqual({
                uid: '123',
                email: newEmail,
                displayName: 'User',
                role: undefined,
            });
        });

        it('should throw an error if no user is signed in', async () => {
            mockAuth.changeAuthState(null);

            await expect(
                updateUserEmail('new@example.com', 'password123'),
            ).rejects.toThrow('No user is signed in.');
        });

        it('should throw an error if reauthentication fails', async () => {
            const error = new Error('Reauthentication failed');
            mockAuth.failNext('reauthenticateWithCredential', error);

            await expect(
                updateUserEmail('new@example.com', 'password123'),
            ).rejects.toThrow(error);
        });

        it('should throw an error if updating email fails', async () => {
            const error = new Error('Update email failed');
            mockAuth.failNext('updateEmail', error);

            await expect(
                updateUserEmail('new@example.com', 'password123'),
            ).rejects.toThrow(error);
        });
    });

    describe('updateUserPassword', () => {
        it('should update the user password', async () => {
            mockAuth.changeAuthState({
                uid: '123',
                email: 'test@example.com',
                displayName: 'User',
            });

            const currentPassword = 'currentPassword';
            const newPassword = 'newPassword';
            const result = await updateUserPassword(
                currentPassword,
                newPassword,
            );

            expect(result).toBe(true);
        });

        it('should throw an error if no user is signed in', async () => {
            mockAuth.changeAuthState(null);

            await expect(
                updateUserPassword('currentPassword', 'newPassword'),
            ).rejects.toThrow('No user is signed in.');
        });
    });
});
