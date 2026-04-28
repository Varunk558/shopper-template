import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export function ShopperDetails() {

    const [product, setProduct] = useState({id: 0, title: '', description: '', price: '', image: '', rating: {rate: '', count: ''}});
            const params = useParams();
            useEffect(() => {
                axios({
                    method: 'get',
                    url: `https://fakestoreapi.com/products/${params.id}`
                })
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
            }, [params.id]);

    return (

        <div className="container-fluid">
            <h2>{product.title}</h2>
            <div className="row">
                <div className="col-3">
                    <img src={product.image} alt={product.title} style={{ maxWidth: '300px', height: 'auto' }} />
                </div>
                <div className="col-9">
                    <dl>
                        <dt>Description</dt>
                        <dd>{product.description}</dd>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                        <dt>Rating</dt>
                        <dd>{product.rating.rate} ({product.rating.count} reviews)</dd>
                    </dl>
                    <div>
                        <Link to="#" className="btn btn-primary m-1">Add to Cart</Link>
                        <Link to={`/category/${product.category}`} className="btn btn-secondary m-1">Back to {product.category}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}