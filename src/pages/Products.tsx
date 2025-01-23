import React, {useEffect, useState} from 'react';
import {BASE_URL, PRODUCTS} from "../enums/enums";
import {Product, Rating} from "../data/data_types";
import NavigateHome from "../components/NavigateHome";

const defaultRating: Rating = {
    rate: 0.0, count: 0
}
const defaultNewProduct = {
    description: "", id: '', name: '', price: 0, category: '', stock: 0, rating: defaultRating, image_url: '', sku: ''
}
const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Product>(defaultNewProduct);
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleAddProduct = () => {
        if (!newProduct.name || newProduct.price <= 0 || !newProduct.category || !newProduct.stock || !newProduct.image_url || !newProduct.rating || !newProduct.sku || !newProduct.id) {
            alert("Please fill in the form fully.")
        } else {
            alert("Product successfully added!")
            setNewProduct(defaultNewProduct)
            setShowForm(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setNewProduct(prevProduct => {
            if (name === 'ratingcount') {
                return {
                    ...prevProduct, rating: {
                        ...prevProduct.rating, // Spread the existing rating object because it will error out otherwise
                        count: Number(value),
                    },
                };
            } else if (name === 'ratingrate') {
                return {
                    ...prevProduct, rating: {
                        ...prevProduct.rating, rate: Number(value),
                    },
                };
            } else {
                return {
                    ...prevProduct, [name]: value,
                };
            }
        })

    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(BASE_URL + PRODUCTS);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                setLoading(false);
            }
        };


        fetchProducts();
    },);

    const toggleRow = (id: string) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (<div>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Number in Stock</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product: Product) => (<React.Fragment key={product.id}>
                <tr onClick={() => toggleRow(product.id)} style={{cursor: 'pointer'}}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                </tr>
                {expandedRowId === product.id && (<tr>
                    <td colSpan={4}>
                        <div style={{padding: '10px', backgroundColor: '#7f7f7f'}}>
                            <p><strong>Rating rate:</strong> {product.rating.rate}</p>
                            <p><strong>Rating count:</strong> {product.rating.count}</p>
                            <p><strong>sku:</strong> {product.sku}</p>
                            <p><strong>Image:</strong> {product.image_url}</p>
                        </div>
                    </td>
                </tr>)}
            </React.Fragment>))}
            </tbody>
        </table>
        <button onClick={handleShowForm}>Show/Hide Add Form</button>
        {showForm && (
            <><h3>Add New Product</h3>
                <form id={"add_form"}
                      onSubmit={(e) => {
                          e.preventDefault();
                          handleAddProduct();
                      }}
                >
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Number in Stock:</label>
                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Image:</label>
                        <input
                            type="text"
                            name="image_url"
                            value={newProduct.image_url}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>sku:</label>
                        <input
                            type="text"
                            name="sku"
                            value={newProduct.sku}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Rating count:</label>
                        <input
                            type="number"
                            name="ratingcount"
                            value={newProduct.rating.count}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>Rating rate:</label>
                        <input
                            type="number"
                            name="ratingrate"
                            value={newProduct.rating.rate}
                            onChange={handleInputChange}/>
                    </div>
                    <div className={"add_entry"}>
                        <label style={{width: '100px'}}>ID:</label>
                        <input
                            type="number"
                            name="id"
                            value={newProduct.id}
                            onChange={handleInputChange}/>
                    </div>
                    <button type="submit">Add Product</button>

                </form>
            </>
        )}
        <br/><br/><br/>
        <NavigateHome/>
    </div>);
}

export default Products;