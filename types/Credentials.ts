
export interface Credentials {
    email: string,
    password: string,
}

export interface RegisterCredentials extends Credentials {
    password_confirmation: string
    name: string,
}