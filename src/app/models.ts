// interface is a type of object with specific fields

export enum Genre {
    Anime, Manga
}

export interface SearchOption {
    id?: number,
    q: string,
    genre: Genre
}