export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    numer_in_stock: number;
    rating_information: string;
    image_url: string;
    SKU: number;
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
