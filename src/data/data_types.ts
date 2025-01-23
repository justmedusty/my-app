export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string
    stock: number;
    rating: Rating;
    image_url: string;
    sku: string;
}

export interface Rating {
    rate : number;
    count : number
}

export interface Cart {
    id: string;
    userId: number;
    items: Item[];
    date: string;
    status: string;
}

export interface Item {
    productId: number;
    quantity: number;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string
}
