import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function CrudIndex() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3500/products',
        })
            .then(response => {
                setProducts(response.data);
            });
    }, []);

    function HandleDelete(event) {
        event.preventDefault();
        var flag = window.confirm("Are you sure you want to delete this product?");
        if (flag) {
            axios({
                method: 'delete',
                url: `http://localhost:3500/deleteproduct/${event.target.value}`
            })
                .then(response => {
                    navigate('/products');
                });
        
    }
    }

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
                                <Link to= {`/cruddetails/${product.ProductId}`} className="btn btn-info">
                                    <span className="bi bi-eye"></span>
                                </Link>
                            </td>
                            <td>
                                <Link to= {`/updateproduct/${product.ProductId}`} className="btn btn-warning">
                                    <span className="bi bi-pencil"></span>
                                </Link>
                            </td>
                            <td>
                                <button value={product.ProductId} onClick={HandleDelete} className="btn btn-danger">
                                    <span className="bi bi-trash"></span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}