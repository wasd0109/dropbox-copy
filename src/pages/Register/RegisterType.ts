export type RegisterFormData = {
  email: string;
  password: string;
  agreeTerm: boolean;
};

export type RegisterFormError = {
  email: string;
  password: string;
  agreeTerm: boolean;
  server: string;
};
