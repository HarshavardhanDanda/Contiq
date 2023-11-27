import CreateNewPassword from "../../components/organisms/CreateNewPassword";
import ResetPassword from "../../components/organisms/ResetPassword";
import ResetPasswordSuccess from "../../components/organisms/ResetPasswordSuccess";
import { SignUpTemplate } from "../../components/templates/SignUpTemplate";
import { useForgotPassword } from "./hook";

const ForgotPasswordPage = () => {
  const {
    createNewPassword,
    resetPasswordState,
    handleChangePassword,
    handleResetPassword,
  } = useForgotPassword();
  return (
    <SignUpTemplate>
      {resetPasswordState && (
        <ResetPassword handleResetClick={handleResetPassword} />
      )}
      {createNewPassword && (
        <CreateNewPassword handlePasswordChange={handleChangePassword} />
      )}
      {!resetPasswordState && !createNewPassword && <ResetPasswordSuccess />}
    </SignUpTemplate>
  );
};
export default ForgotPasswordPage;
