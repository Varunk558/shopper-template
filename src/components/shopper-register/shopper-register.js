import { useFormik, Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function ShopperRegister() {


    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userError, setUserError] = useState("");

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3500/users'
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    function VerifyUserId(event) {
        for (var user of users) {
            if (user.UserId == event.target.value) {
                setUserError("UserId already exists");
                return;
            }
        }
        setUserError("UserId is available");
    }

    return (

        <div className="container-fluid">
            <h1>Register User</h1>
            <Formik
                initialValues={{
                    UserId: '',
                    UserName: '',
                    Email: '',
                    Password: '',
                    Age: 0,
                    Phone: ''
                }}
                validationSchema={Yup.object({
                    UserId: Yup.string().required("Required").matches(/^[a-zA-Z0-9]+$/, "UserId must be alphanumeric"),
                    UserName: Yup.string().required("Required").min(2, "Must be at least 2 characters").max(50, "Must be 50 characters or less"),
                    Email: Yup.string().email("Invalid email address").required("Required"),
                    Password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
                    Age: Yup.number().min(0, "Invalid age").required("Required").max(100, "Invalid age"),
                    Phone: Yup.string().required("Required")
                })}
                onSubmit={
                    (values) => {
                        axios({
                            method: 'post',
                            url: 'http://localhost:3500/registeruser',
                            data: values
                        })
                            .then(response => {
                                console.log("User registered:", response.data);
                                navigate('/login');
                            })
                            .catch(error => {
                                console.error("Error registering user:", error);
                            });
                    }
                }
            >
                <Form>
                    <div>
                        <dt>UserId</dt>
                        <dd><Field name="UserId" type="text" onKeyUp={VerifyUserId} /></dd>
                        <ErrorMessage name="UserId" component="div" className="text-danger" />
                        <dd className={userError.includes("UserId already exists") ? "text-danger" : "text-success"}>{userError}</dd>
                    </div>
                    <div className="mb-3">
                        <dt>UserName</dt>
                        <dd><Field name="UserName" type="text" /></dd>
                        <ErrorMessage name="UserName" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <dt>Email</dt>
                        <dd><Field name="Email" type="email" /></dd>
                        <ErrorMessage name="Email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <dt>Password</dt>
                        <dd><Field name="Password" type="password"  /></dd>
                        <ErrorMessage name="Password" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <dt>Age</dt>
                        <dd><Field name="Age" type="number"  /></dd>
                        <ErrorMessage name="Age" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <dt>Phone</dt>
                        <dd><Field name="Phone" type="text"  /></dd>
                        <ErrorMessage name="Phone" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    <div className="mt-3">
                        <Link to="/login" className="btn btn-link">Already have an account? Login</Link>
                    </div>
                </Form>
            </Formik>
            
        </div>
    )
}