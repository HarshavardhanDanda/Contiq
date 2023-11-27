import { useState } from "react";
import { validateString } from "../../../utils/functions";
import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "../../../utils/regex";
import { NAME_ERROR, PASSWORD_ERROR, notValidEmail } from "../../../constants";

export function useSignUpForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isInputsFocused,setIsInputsFocused]=useState({
    name:false,
    email:false,
    password:false
  })

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (!validateString(newName, NAME_REGEX))
      setErrors({ ...errors, name: NAME_ERROR });
    else setErrors({ ...errors, name: "" });
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail.toLowerCase());
    if (!validateString(newEmail, EMAIL_REGEX))
      setErrors({ ...errors, email: notValidEmail });
    else setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    if (!validateString(newPassword, PASSWORD_REGEX))
      setErrors({ ...errors, password: PASSWORD_ERROR });
    else setErrors({ ...errors, password: "" });
  };

  const handleInputNameFocus=()=>{
    setIsInputsFocused({ ...isInputsFocused, name: true });
  }

  const handleInputEmailFocus=()=>{
    setIsInputsFocused({ ...isInputsFocused, email: true });
  }

  const handleInputPasswordFocus=()=>{
    setIsInputsFocused({ ...isInputsFocused, password: true });
  }

  const handleInputNameBlur=()=>{
    setIsInputsFocused({ ...isInputsFocused, name: false });
  }

  const handleInputEmailBlur=()=>{
    setIsInputsFocused({ ...isInputsFocused, email: false });
  }

  const handleInputPasswordBlur=()=>{
    setIsInputsFocused({ ...isInputsFocused, password: false });
  }



  
  const isButtonEnabled =
    name &&
    email &&
    password &&
    !errors.name &&
    !errors.email &&
    !errors.password;

  return {
    name,
    email,
    password,
    errors,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    isButtonEnabled,
    isInputsFocused,
    handleInputEmailFocus,
    handleInputNameFocus,
    handleInputPasswordFocus,
    handleInputEmailBlur,
    handleInputNameBlur,
    handleInputPasswordBlur
  };
}
