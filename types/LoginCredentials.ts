export interface ForgotPassword {
  email: string,
}

export interface LoginCredentials extends ForgotPassword {
  password: string,
}

export interface RegisterCredentials extends LoginCredentials {
  password_confirmation: string
  name: string,
}
