export const googleErrorMessage = (errorType: string) => {
  if (errorType === "OAuthSignin" || errorType === "OAuthCallback") {
    return "Failed to connect with Google. Please try again.";
  } else if (errorType === "OAuthAccountNotLinked") {
    return "This email is already used with a different sign-in method. Log in with that method and you will be able to link your account to google in your account the settings.";
  } else if (errorType === "OAuthCreateAccount") {
    return "Could not create account using Google. Please try again.";
  } else {
    return "Authentication failed. Please try again later.";
  }
};
