export class PagedResult<T> {
    metadata: {
        totalCount: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    entities: T[];
}