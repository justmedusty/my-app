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
    id: number;
    user_id: number;
    items: Item[];
    data: string;
    status: string;
}

export interface Item {
    product_id: 3;
    quantity: 2;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    address: string;
    city: string;
    state: string;
    zipcode: number;
    country: string;
    phone: string // just to show formatting easier
}
