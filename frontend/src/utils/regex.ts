export const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

// It must contain at least one lowercase letter.
// It must contain at least one uppercase letter.
// It must contain at least one special character from the set !@#$%^&*.
// It must be at least 8 characters in length.
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
export const NAME_REGEX = /^[A-Za-z\s][A-Za-z0-9\s]*$/;
