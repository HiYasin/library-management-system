export interface IBook {
    title: string;
    author: string;
    genre: "FICTION"| "NON_FICTION"| "SCIENCE"| "HISTORY"| "BIOGRAPHY"| "FANTASY";
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}

export interface IBookQueryParams {
    filter?: IBook['genre'];
    sortBy?: keyof IBook;
    sort?: 'asc' | 'desc';
    limit?: number | string;
}

export interface BookInstanceMethods{
    borrowBooks(borrowQuantity: number): void;
}