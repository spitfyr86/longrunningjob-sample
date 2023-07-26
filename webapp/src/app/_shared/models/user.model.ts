export interface RegisterUser {
    name: string;
    email: string;
}

export interface User {
    name: string;
    email: string;
    emailConfirmed: boolean;
    id: string;
    phoneNumber: string;
    phoneNumberConfirmed: true;

    checked: boolean;
}

export interface UpdateUser {
    name: string;
    email: string;
    emailConfirmed: boolean;
    id: string;
    phoneNumber: string;
    phoneNumberConfirmed: true;
}

export interface ConfirmEmail {
    userId: string;
    email: string;
    confirmPassword: string;
    code: string;
    password: string;
}

export interface Users {
    count: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    page: number;
    totalPages: number;
    items: User[];
}
