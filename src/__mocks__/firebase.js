// src/services/__mocks__/firebase.js
module.exports = {
    initializeApp: jest.fn(() => ({
        auth: jest.fn(),
        database: jest.fn(),
    })),
    getAuth: jest.fn(() => ({
        currentUser: {
            uid: '123',
            email: 'test@example.com',
            displayName: 'User',
            role: 'user',
        },
        signOut: jest.fn(),
    })),
    getDatabase: jest.fn(),
    ref: jest.fn(),
    update: jest.fn(),
    set: jest.fn(),
    push: jest.fn(),
    remove: jest.fn(),
    EmailAuthProvider: {
        credential: jest.fn(),
    },
    reauthenticateWithCredential: jest.fn(),
    updateEmail: jest.fn(),
    updatePassword: jest.fn(),
    updateProfile: jest.fn(),
};
