// export interface Category {
//     id: number;
//     category: string;
//     subcategory: string;
// }

export interface Category {
    id: number;
    nombre: string;
    descripcion: string;
    img: string;
}

export interface Dish {
    name: string;
    price: number;
    rating: number;
    image: string;
  }


export interface SuggestedProduct {
    banerimage: string;
    category: Category;
}