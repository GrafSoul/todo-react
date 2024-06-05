// src/__mocks__/firebase.js
export const initializeApp = jest.fn(() => ({
    name: 'mock-app',
}));

export const getAuth = jest.fn(() => ({
    currentUser: {
        uid: '123',
        email: 'test@example.com',
        displayName: 'User',
        role: 'user',
    },
    signOut: jest.fn(),
}));

export const createUserWithEmailAndPassword = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const sendPasswordResetEmail = jest.fn();
export const signOut = jest.fn();
export const updateProfile = jest.fn().mockResolvedValue();
export const EmailAuthProvider = {
    credential: jest.fn().mockReturnValue({}),
};
export const reauthenticateWithCredential = jest.fn().mockResolvedValue();
export const updateEmail = jest.fn().mockResolvedValue();
export const updatePassword = jest.fn().mockResolvedValue();

export const getDatabase = jest.fn();
export const ref = jest.fn(() => ({
    set: jest.fn().mockResolvedValue(),
    get: jest.fn().mockResolvedValue(),
    update: jest.fn().mockResolvedValue(),
    remove: jest.fn().mockResolvedValue(),
    push: jest.fn(() => ({
        key: 'mock-key',
    })),
    child: jest.fn(),
}));
export const set = jest.fn();
export const get = jest.fn();
export const update = jest.fn();
export const remove = jest.fn();
export const push = jest.fn();
export const child = jest.fn();

export const database = {};
