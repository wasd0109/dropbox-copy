import { RegisterFormData, RegisterFormError } from "./RegisterType";
import emailRegex from "../../validators/isEmail";

const findRegisterFormErrors = (form: RegisterFormData) => {
  const { email, password, agreeTerm } = form;
  const newErrors = {} as RegisterFormError;
  if (!email || email === "") newErrors.email = "Required";
  else if (!emailRegex.test(email))
    newErrors.email = "Please enter valid email";
  if (!password || password === "") newErrors.password = "Required";
  else if (password.length < 6)
    newErrors.password = "Password must be longer than 6 characters";
  if (!agreeTerm) newErrors.agreeTerm = "Please agree to Term of Services";
  return newErrors;
};

export default findRegisterFormErrors;
