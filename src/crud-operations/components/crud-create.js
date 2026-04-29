import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function CrudCreate() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [productIdError, setProductIdError] = useState("");

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:3500/products'
        })
            .then(response => {
                const ids = response.data.map(product => product.ProductId);
                setProducts(ids);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);


    function VerifyId(event) {
        for (var id of products) {
            if (id == event.target.value) {
                setProductIdError("ProductId already exists");
                return;
            }
        }
        setProductIdError("ProductId is available");
    }

    return (
        <div className="container-fluid">
            <h2>Add New Product</h2>
            <Formik
                initialValues={{ ProductId: 0, Name: '', Price: 0, Stock: false }}
                
                onSubmit={(values) => {
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:3500/addproduct',
                        data: values
                    })
                        .then(() => {
                            alert('Product added successfully!');
                            navigate('/products');
                        })
                        .catch(error => {
                            console.error('Error adding product:', error);
                            alert('Failed to add product. Please try again.');
                        });
                }}
            >
                <Form>
                    <dl>
                        <dt>Product Id</dt>
                        <dd>
                            <Field type="number" name="ProductId" onKeyUp={VerifyId} />
                            <dd className={productIdError.includes("already exists") ? "text-danger" : "text-success"}>{productIdError}</dd>
                        </dd>
                        <dt>Name</dt>
                        <dd>
                            <Field type="text" name="Name" />
                        </dd>
                        <dt>Price</dt>
                        <dd>
                            <Field type="number" name="Price" />
                        </dd>
                        <dt>Stock</dt>
                        <dd className="form-switch">
                            <Field type="checkbox" name="Stock" className="form-check-input" />Available
                        </dd>
                    </dl>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                    <Link to="/products" className="btn btn-secondary ms-2">View Products</Link>
                </Form>
            </Formik>
        </div>
    )
}