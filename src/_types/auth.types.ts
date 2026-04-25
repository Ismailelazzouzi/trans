export interface User {
    id: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loginUser(user: User): void;
    logout(): void;
    isLoading: boolean;
}

