import { use, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik, Field } from "formik";

export function CrudEdit() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

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
            <h2>Edit Product</h2>
            <Formik
                enableReinitialize
                initialValues={{
                 ProductId: product.ProductId,
                 Name: product.Name,
                 Price: product.Price,
                 Stock: product.Stock }}
                  onSubmit={(values) => {
                    axios({
                        method: 'put',
                        url: `http://127.0.0.1:3500/updateproduct`,
                        data: values
                    })
                        .then(response => {
                            console.log("Product updated successfully:", response.data);
                            alert("Product updated successfully!");
                            navigate("/products");
                        })
                        .catch(error => {
                            console.error("Error updating product:", error);
                        });
                }}>
                    {() => (
                    <Form>
                    <dl>
                        <dt>Name</dt>
                        <dd><Field name="Name" type="text" /></dd>
                        <dt>Price</dt>
                        <dd><Field name="Price" type="number" /></dd>
                        <dt>Stock</dt>
                        <dd><Field name="Stock" type="checkbox" /></dd>
                    </dl>
                    <button type="submit" className="btn btn-primary">Update Product</button>
                    <Link to="/products" className="btn btn-secondary ms-2">View Products</Link>
                </Form>
            )}
            </Formik>
        </div>
    )
}