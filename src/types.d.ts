export interface User {
    _id: string,
    name: string,
    email: string,
    password: string
}

export interface InitialState {
    user: User | null,
    auth : boolean
}

export interface ImagesTypes{
    _id: string | number,
    image: string,
    __v: string,
    email:string
}