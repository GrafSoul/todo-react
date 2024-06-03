import { auth, database } from './firebase';
import {
    updateEmail,
    updatePassword,
    updateProfile,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';
import { ref, update } from 'firebase/database';

export const updateUserName = async (newName) => {
    const user = auth.currentUser;

    if (user) {
        await updateProfile(user, { displayName: newName });
        await update(ref(database, `users/${user.uid}`), {
            displayName: newName,
        });

        return {
            uid: user.uid,
            email: user.email,
            displayName: newName,
            role: user.role,
        };
    } else {
        throw new Error('No user is signed in.');
    }
};

export const updateUserEmail = async (newEmail, password) => {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error('No user is signed in.');
        }

        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail);
        await update(ref(database, `users/${user.uid}`), { email: newEmail });

        return {
            uid: user.uid,
            email: newEmail,
            displayName: user.displayName,
            role: user.role,
        };
    } catch (error) {
        console.error('Error updating email:', error.message);
        throw new Error(error.message);
    }
};

export const updateUserPassword = async (currentPassword, newPassword) => {
    const user = auth.currentUser;

    if (user) {
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword,
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);

        return true;
    } else {
        throw new Error('No user is signed in.');
    }
};
