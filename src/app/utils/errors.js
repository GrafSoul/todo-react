export const getErrorAuthMessage = (error) => {
  let errorCode = error;

  if (typeof error === "string") {
    const match = error.match(/\(([^)]+)\)/);
    if (match) {
      errorCode = match[1];
    }
  }

  switch (errorCode) {
    case "auth/app-deleted":
      return "The Firebase app has been deleted.";
    case "auth/app-not-authorized":
      return "The app is not authorized to use Firebase Authentication.";
    case "auth/argument-error":
      return "An invalid argument was provided.";
    case "auth/invalid-api-key":
      return "The API key is invalid.";
    case "auth/invalid-user-token":
      return "The user's credential is no longer valid. The user must sign in again.";
    case "auth/network-request-failed":
      return "A network error occurred. Please check your internet connection and try again.";
    case "auth/requires-recent-login":
      return "This operation is sensitive and requires recent authentication. Log in again before retrying this request.";
    case "auth/too-many-requests":
      return "We have blocked all requests from this device due to unusual activity. Try again later.";
    case "auth/unauthorized-domain":
      return "The app's domain is not authorized for use with Firebase Authentication.";
    case "auth/user-disabled":
      return "The user account has been disabled by an administrator.";
    case "auth/user-token-expired":
      return "The user's credential is no longer valid. The user must sign in again.";
    case "auth/web-storage-unsupported":
      return "This browser is not supported or 3rd party cookies and data may be disabled.";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};
