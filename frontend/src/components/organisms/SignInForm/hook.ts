import { useState } from "react";

export const useSignInForm = () => {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailIdChange = (newEmail: string) => {
    setEmailId(newEmail);
  };

  const handlePasswordInputChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const isSignInButtonEnabled =
    emailId && password;

  return {
    emailId,
    password,
    handleEmailIdChange,
    handlePasswordInputChange,
    isSignInButtonEnabled,
    error,
    setError
  };
};
