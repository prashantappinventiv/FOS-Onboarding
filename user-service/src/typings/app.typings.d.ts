export as namespace IApp;

export interface DataKeys {
    [key: string]: any;
}

export interface IRequest {
    [key: string]: any;
}

export interface search {
    type: number;
    search?: string;
    limit: number;
    page: number;
    localUserId?: string;
    zipcode?: any;
    yearMin?: any;
    yearMax?: any;
    ageMin?: any;
    ageMax?: any;
    ratingMin?: any;
    ratingMax?: any;
    sport?: any;
    level?: any;
    mentionUser?: boolean;
}

export interface taggedSearch {
    type: number;
    search?: string;
    limit: number;
    page: number;
    localUserId?: string;
    zipcode?: any;
    yearMin?: any;
    yearMax?: any;
    ageMin?: any;
    ageMax?: any;
    ratingMin?: any;
    ratingMax?: any;
    sport?: any;
    level?: any;
}

export interface IResponse<T> {
    data?: T;
    type?: string;
}

export interface Entity<T> {
    success?: boolean;
    data?: T;
    type?: string;
}

export interface Dispatcher {
    httpCode: number;
    statusCode: number;
    message: string;
    data?: DataKeys;
}

export interface PaginationResult {
    next: boolean;
    result: any[];
    page: number;
    total?: number;
    totalRating?: number;
}

export interface searchPaginationResult {
    next: boolean;
    result: any[];
    page: number;
    total: number;
}
