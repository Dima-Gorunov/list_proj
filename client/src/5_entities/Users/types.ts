// Тип для пользователя
export interface IUser {
    id: string | number | null;
    email: string | null;
    username: string | null;
    role: string | null;
    activated: boolean;
    isAdmin: boolean;
    avatar: string | null;
    firstName: string | null;
    lastName: string | null;
    gender: string | null;
}

export interface IUsersResponce {
    users: IUser[];
}
export interface IChangeUserResponce {
    user: IUser;
}
