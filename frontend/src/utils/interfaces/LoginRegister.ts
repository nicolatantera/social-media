export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File | null;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
