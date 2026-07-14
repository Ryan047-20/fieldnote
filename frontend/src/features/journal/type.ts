export type EntryState = "draft" | "complete";

export type DailyLog = {
    id: number;
    documentId: string;
    logDate: string;
    title: string;
    workCompleted: string;
    learning: string | null;
    challenges: string | null;
    solutions: string | null;
    nextSteps:string | null;
    hoursWorked: number | null;
    entryState:EntryState;
    createdAt:string;
    updatedAt:string;
    publishedAt?:string | null;
};

export type StrapiListResponse<T> = {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};