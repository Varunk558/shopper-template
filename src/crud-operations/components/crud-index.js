import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CrudIndex() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3500/products',
        })
            .then(response => {
                setProducts(response.data);
            });
    }, []);

    return (
        <div className="container-fluid">
            <h2>Products Grid</h2>
            <div className="d-flex justify-content mb-3">
                <Link to="/NewProduct" className="btn btn-primary">Add Product</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.ProductId}>
                            <td>{product.Name}</td>
                            <td>
                                <Link to= "/details" className="btn btn-info">
                                    <span className="bi bi-eye"></span>
                                </Link>
                            </td>
                            <td>
                                <Link to= "/updateproduct" className="btn btn-warning">
                                    <span className="bi bi-pencil"></span>
                                </Link>
                            </td>
                            <td>
                                <Link to= "/deleteproduct" className="btn btn-danger">
                                    <span className="bi bi-trash"></span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}