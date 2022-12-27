export interface SignInRequestData {
  email: string;
  password: string;
}
export interface authToken {
  token: string;
}

export interface ActiveUser {
  confirm_password: string;
  password: string;
}
