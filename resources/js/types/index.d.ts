import { MIMEParams } from "util";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    profile_photo_path: File;
}

export interface Favorite {
    id: number;
    user_id: number;
    pokemon_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export type UsersPageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    users: User[];
    favorites: Favorite[];
};

export type FavoritePageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    favorites: Favorite[];
};

export type UserCardProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    user: User;
    favorites: Favorite[];
};
