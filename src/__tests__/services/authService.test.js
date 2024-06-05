// authService.test.js

import { register, login, resetPassword, logout } from '@services/authService';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/database');

const firebaseConfig = {
    apiKey: 'mock-api-key',
    authDomain: 'mock-auth-domain',
    projectId: 'mock-project-id',
    storageBucket: 'mock-storage-bucket',
    messagingSenderId: 'mock-messaging-sender-id',
    appId: 'mock-app-id',
    databaseURL: 'mock-database-url',
};

initializeApp.mockImplementation(() => ({
    name: 'mock-app',
}));

getAuth.mockImplementation(() => ({
    currentUser: {
        uid: '123',
        email: 'test@example.com',
        displayName: 'User',
        role: 'user',
    },
    signOut: jest.fn(),
}));

describe('Firebase Auth', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user', async () => {
        const mockUser = {
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
        };

        createUserWithEmailAndPassword.mockResolvedValueOnce({
            user: mockUser,
        });
        updateProfile.mockResolvedValueOnce();
        get.mockResolvedValueOnce({
            exists: () => false,
        });
        set.mockResolvedValueOnce();

        const result = await register(
            'test@example.com',
            'PassWord123',
            'Test User',
        );

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            expect.anything(),
            'test@example.com',
            'PassWord123',
        );
        expect(updateProfile).toHaveBeenCalledWith(mockUser, {
            displayName: 'Test User',
        });
        expect(set).toHaveBeenCalledTimes(2);
        expect(result).toEqual({
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
            role: 'admin',
        });
    });

    it('should login a user', async () => {
        const mockUser = {
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
        };
        const mockUserData = {
            role: 'user',
        };

        signInWithEmailAndPassword.mockResolvedValueOnce({
            user: mockUser,
        });
        get.mockResolvedValueOnce({
            val: () => mockUserData,
        });

        const result = await login('test@example.com', 'password123');

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            expect.anything(),
            'test@example.com',
            'password123',
        );
        expect(get).toHaveBeenCalled();
        expect(result).toEqual({
            uid: '123',
            email: 'test@example.com',
            displayName: 'Test User',
            role: 'user',
        });
    });

    it('should send a password reset email', async () => {
        sendPasswordResetEmail.mockResolvedValueOnce();

        await resetPassword('test@example.com');

        expect(sendPasswordResetEmail).toHaveBeenCalledWith(
            expect.anything(),
            'test@example.com',
        );
    });

    it('should logout a user', async () => {
        signOut.mockResolvedValueOnce();

        await logout();

        expect(signOut).toHaveBeenCalledWith(expect.anything());
    });
});
