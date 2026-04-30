import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export function CrudDetails() {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:3500/details/${params.id}`
        })
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [params.id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <h2>Product Details</h2>
            <dl>
                <dt>Product ID:</dt>
                <dd>{product.ProductId}</dd>
                <dt>Name:</dt>
                <dd>{product.Name}</dd>
                <dt>Price:</dt>
                <dd>{product.Price}</dd>
                <dt>Stock:</dt>
                <dd>{product.Stock ? "In Stock" : "Out of Stock"}</dd>
            </dl>
            <Link to="/products" className="btn btn-secondary">Back to Products</Link>
        </div>
    )
}