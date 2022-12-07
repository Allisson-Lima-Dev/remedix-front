export interface SignInRequestData {
  email: string;
  password: string;
}
export interface authToken {
  refresh: string;
  access: string;
  claims: any;
}

export interface ActiveUser {
  confirm_password: string;
  password: string;
}
