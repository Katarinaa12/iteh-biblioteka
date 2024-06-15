export interface Book {
    id: number,
    name: string,
    isbn: string,
    description: string,
    writter: string,
    pages: number,
    publishedYear: number,
    preview: string,
    genre: Genre,
    content: string,
    subscriptionTypes: SubscriptionType[]
}
export interface Genre {
    id: number,
    name: string,
}
export interface Books {
    page: number,
    total: number,
    data: Book[]
}

export interface SubscriptionType {
    id: number,
    name: string,
    price: number,
    duration: number,
}

export interface User {
    id: number,
    name: string,
    email: string,
    admin: boolean
}

export interface Subscription {
    id: number,
    name: string,
    price: number,
    duration: number,
    startTime: string,
    endTime: number,
    status: SubscriptionStatus,
    user: User,
    book: Book
}
export type SubscriptionStatus = 'pending' | 'accepted' | 'rejected'

export interface CreateBook {
    name: string,
    isbn: string,
    description: string,
    pages: number,
    publishedYear: number,
    preview: string,
    genre_id: number
}
export type UpdateBook = Partial<CreateBook>

export interface SubscriptionCreate {
    subscriptionTypeId: number

}

export interface RegisterUser {
    email: string,
    name: string,
    password: string,
}