import axios from 'axios';
import { useEffect, useState } from 'react';

export function ShopperJewelery() {

    const [jewelery, setJewelery] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://fakestoreapi.com/products/category/jewelery'
        })
        .then(response => {
            setJewelery(response.data);
        })
        .catch(error => {
            console.error('Error fetching jewelery:', error);
        });
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                {jewelery.map(item => (
                    <div className="col-md-4" key={item.id}>
                        <div className="card">
                            <img src={item.image} height="100px" width="100px" className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">${item.price}</p>
                                <a href={`/jewelery/${item.id}`} className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
