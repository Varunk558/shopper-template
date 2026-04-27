import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export function ShopperCategory() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies['userId'] === undefined) {
            navigate('/login');
        } else {
            console.log("User is logged in:", cookies.userId);
        }
        axios({
            method: 'get',
            url: `https://fakestoreapi.com/products/category/${params.categoryName}`
        })
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    }, [params.categoryName])

    return (
        <div className="container-fluid">
            <div className="d-flex gap-4 flex-wrap justify-content-between mt-4">
                {products.map(product => (
                    <div key={product.id} className="card" style={{ width: '18rem' }}>
                        <img src={product.image} className="card-img-top" alt={product.title} />
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">${product.price}</p>
                            <Link to={`/details/${product.id}`} className="btn btn-primary m-1">View Details</Link>
                            <Link to="#" className="btn btn-primary">Add to Cart</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>    
    )
}
