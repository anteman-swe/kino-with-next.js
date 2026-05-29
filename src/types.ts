interface RouteParams {
    params: Promise<{ id: string }>;
}

interface Movie {
    id: number;
    title: string;
    poster: {
        url: string;
    };
    intro: string;
}

interface Review {
    id: number;
    comment: string;
    rating: number;
    author: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ReviewPost {
    comment: string;
    rating: number;
    author: string;
    movie: string;
}

interface Screening {
    id: string;
    room: string;
    start_time: string;
    createdAt: string;
    updatedAt: string;
}

interface Error {
    name: string;
    message: string;
    status: number;
}

export type { RouteParams, Movie, Review, ReviewPost, Screening, Error };