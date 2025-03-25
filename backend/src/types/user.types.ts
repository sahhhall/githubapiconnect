
export interface GithubUserType {
    id?: number;
    login: string;
    name?: string;
    email?: string;
    avatar_url?: string;
    location?: string;
    blog?: string;
    bio?: string;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: Date;
}