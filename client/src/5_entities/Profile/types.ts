// Тип для пользователя
export interface IProfile {
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
    updatedAt: string | null;
    createdAt: string | null;
}

// Типы для запросов
export interface RegistrationRequest {
    email: string;
    password: string;
    secretAdminString?: string;
}

export interface RegistrationResponse {
    user: IProfile;
    accessToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UsersInfoRequest {
    usersId: string[]; // или number[], в зависимости от вашего backend
}

// Типы для ответов
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserData;
}

export interface UserData {
    id: string | number;
    email: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    // добавьте другие поля если есть
}

export interface CheckAuthResponse {
    accessToken: string;
    user: UserData;
}

export interface LogoutResponse {
    message: string;
}

export interface SetAvatarResponse {
    avatarUrl: string;
    message?: string;
}
