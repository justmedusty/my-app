import React, {useEffect, useState} from 'react';
import {Cart, Product, User} from "../data/data_types";
import {BASE_URL, CARTS, PRODUCTS, USERS} from "../enums/enums";
import NavigateHome from "../components/NavigateHome";


const Carts: React.FC = () => {
    /*
    A bit of duplication but in this context that is fine
     */
    const [carts, setCarts] = useState<Cart[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
    const [expandedProductRowId, setExpandedProductRowId] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[]>([]);
    const [userLookup, setUserLookup] = useState<Record<number, User>>({});
    const [productLookup, setProductLookup] = useState<Record<number, Product>>({});

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(BASE_URL + CARTS);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Cart[] = await response.json();
                setCarts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred while fetching carts');
            }
        };
        const fetchProducts = async () => {
            try {
                const response = await fetch(BASE_URL + PRODUCTS);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);

                const productMap = data.reduce((array: Record<number, Product>, product) => {
                    array[parseInt(product.id)] = product;
                    return array;
                }, {});
                setProductLookup(productMap)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred while fetching products');
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await fetch(BASE_URL + USERS);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: User[] = await response.json();
                // Create user map for indexing based on id
                const userMap = data.reduce((array: Record<number, User>, user) => {
                    //ensure you call partInt or similar since these will be strings according to the api response
                    array[parseInt(user.id)] = user;
                    return array;
                }, {});
                setUserLookup(userMap);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred while fetching users');
            } finally {
                // only set this once both are done, this makes more sense
                setLoading(false);
            }
        };


        fetchCarts();
        fetchProducts();
        fetchUsers();

    },);


    const toggleRow = (id: string) => {
        if (expandedRowId === id) {
            setExpandedProductRowId(null)
            setExpandedRowId(null);
        } else {
            setExpandedRowId(id);
        }
    }
    const toggleProductRow = (id: string) => {
        if (expandedProductRowId === id) {
            setExpandedProductRowId(null);
        } else {
            setExpandedProductRowId(id);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (<div>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
            <tr>
                <th>User First name</th>
                <th>User Last Name</th>
                <th>Number Of Items In Cart</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {carts.map((cart: Cart) => (<React.Fragment key={cart.id}>
                <tr onClick={() => toggleRow(cart.id)} style={{cursor: 'pointer'}}>
                    <td>{userLookup[cart.userId]?.firstname || 'Not Found'}</td>
                    <td>{userLookup[cart.userId]?.lastname || 'Not found'}</td>
                    <td>{cart.items.length || 'Not found'}</td>
                    <td>{cart.date || 'Not found'}</td>
                    <td>{cart.status || 'Not found'}</td>
                </tr>
                {expandedRowId === cart.id.toString() && (
                    <tr>
                    <td colSpan={10}>
                        <div style={{padding: '10px', backgroundColor: '#7f7f7f'}}>
                            <p><strong>User full
                                name:</strong> {userLookup[cart.userId]?.firstname || 'None found'} {userLookup[cart.userId]?.lastname}
                            </p>
                            <p><strong>User Email:</strong> {userLookup[cart.userId]?.email || 'None found'}
                            </p>
                            <p><strong>User Phone:</strong> {userLookup[cart.userId]?.email || 'None found'}
                            </p>
                            <p><strong>User City State
                            </strong> {userLookup[cart.userId]?.city || 'None Found'} {userLookup[cart.userId]?.state} {userLookup[cart.userId]?.zipcode}
                            </p>

                            <h3>Products in Cart:</h3>
                            {cart.items.map((item) => (<ul className={"product_cart"} key={item.productId}>
                                <li className={"product_cart"}>Name: {productLookup[item.productId]?.name || 'Product Not Found'}</li>
                                <li className={"product_cart"}>Description: {productLookup[item.productId]?.description || 'Product Not Found'}</li>
                                <li className={"product_cart"}>Quantity : {item.quantity || 'Product Not Found'}</li>
                            </ul>))}

                        </div>
                    </td>
                </tr>)}
            </React.Fragment>))}
            </tbody>
        </table>
        <br/><br/><br/>
        <NavigateHome/>
    </div>);
};

export default Carts;