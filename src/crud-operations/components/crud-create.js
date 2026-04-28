import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function CrudCreate() {
    const navigate = useNavigate();

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
                            <Field type="number" name="ProductId" />
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