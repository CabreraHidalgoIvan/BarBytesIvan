export interface Category {
    id: number;
    nombre: string;
}


export interface Dishes {
    id: number;
    title: string;
    price: number;
    category: string[];
    description: string;
    image: string;
}