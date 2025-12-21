export interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    description?: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export type badgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'Active' | 'Inactive' | 'Deleted';