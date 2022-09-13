export function validateLoginForm(err, toast) {
  switch (err.code) {
    case "auth/invalid-email":
      toast.error("Invalid email ");
      break;
    case "auth/internal-error":
      toast.warning("Please enter correct information");
      break;
    case "auth/user-not-found":
      toast.error("User does not exist");
      break;
    case "auth/wrong-password":
      toast.error("Incorrect password");
      break;
    default:
      toast.error("Something went wrong, please try again later");
      break;
  }
}

export function validateRegistrationForm(err, errorFeedback, toast) {
  errorFeedback.current.style.display = "block";
  setTimeout(() => {
    errorFeedback.current.style.display = "none";
  }, 3000);

  switch (err.code) {
    case "auth/invalid-email":
      toast.error("Invalid email");
      errorFeedback.current.innerHTML = "Invalid email";
      break;
    case "auth/email-already-in-use":
      toast.error("Email already in use");
      errorFeedback.current.innerHTML = "Email already in use";
      break;
    case "auth/internal-error":
      toast.error("Please enter correct information");
      errorFeedback.current.innerHTML = "Please enter correct information";
      break;
    case "auth/weak-password":
      toast.error("Password must be at least 6 characters");
      errorFeedback.current.innerHTML =
        "Password must be at least 6 characters";
      break;
    default:
      toast.error("Something went wrong, please try again later");
      break;
  }
}

export function validateUsernameInput(errorFeedback, toast) {
  errorFeedback.current.innerHTML = "Please fill in all the fields";
  errorFeedback.current.style.display = "block";
  setTimeout(() => {
    errorFeedback.current.style.display = "none";
  }, 5000);
  toast.warn("Please fill in all the fields");
  return;
}

export function validateUsernameLength(errorFeedback, toast) {
  errorFeedback.current.innerHTML =
    "Username must be between 3 and 20 characters";
  errorFeedback.current.style.display = "block";
  setTimeout(() => {
    errorFeedback.current.style.display = "none";
  }, 5000);
  toast.warn("Username must be between 3 and 20 characters");
  return;
}
