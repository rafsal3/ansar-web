export interface Memory {
    id: number;
    title: string;
    description?: string;
    author: string;
    batch: string;
    date: string;
    images: string[];
    isApproved?: boolean;
    status?: string;
}

export type TabType = 'all' | 'my';
