export interface IUser extends IUserData {
    password: string;
    role_name?: string;
    token?: string;
}

export interface IUserList {
    current_page: number;
    data: Array<IUserData>;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface IUserData {
    id?: number;
    name: string;
    email: string;
    role: string;
}

