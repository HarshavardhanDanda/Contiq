import { SignInForm } from "../../components/organisms/SignInForm";
import { SignUpTemplate } from "../../components/templates/SignUpTemplate";

export const SignInPage = () => {
  return (
    <SignUpTemplate>
      <SignInForm />
    </SignUpTemplate>
  );
};
