
export interface IGithubUserType {
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
    followers_url?: string;
    following_url?: string;
    created_at?: Date;
}


export interface IGithubFollower {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id?: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: "User" | "Organization";
    site_admin: boolean;
}
