export type CreateUserCommand = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type AuthenticateUserCommand = {
    email: string;
    password: string;
}