import { useState } from "react";
import { changePasswordByEmail } from "../../services/UserService";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [createNewPassword, setCreateNewPassword] = useState<boolean>(false);
  const [resetPasswordState, setResetPasswordState] = useState<boolean>(true);
  const handleChangePassword = async (password: string) => {
    try {
      const changeSuccess = await changePasswordByEmail(email, password);
      if (changeSuccess) {
        setCreateNewPassword(!setCreateNewPassword);
      } else {
        console.error("Password change unsuccessful!!");
      }
    } catch (error) {
      console.error("An error occurred while changing the password:", error);
    }
  };

  const handleResetPassword = (email: string) => {
    setEmail(email);
    setResetPasswordState(!resetPasswordState);
    setCreateNewPassword(!createNewPassword);
  };
  return {
    email,
    createNewPassword,
    resetPasswordState,
    handleChangePassword,
    handleResetPassword,
  };
};
