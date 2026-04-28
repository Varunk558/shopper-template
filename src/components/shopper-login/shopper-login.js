import { useFormik, Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function ShopperLogin() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();

    return (
        <div className="container-fluid">
            <h1>Login User</h1>
            <Formik
                initialValues={{
                    UserId: '',
                    Password: ''
                }}

                onSubmit={
                    (values) => {
                        axios({
                            method: 'get',
                            url: 'http://localhost:3500/users',
                        })
                            .then(response => {
                                for (let user of response.data) {
                                    if (user.UserId === values.UserId && user.Password === values.Password) {
                                        setCookie('userId', user.UserId,);
                                        navigate('/home');
                                        break;
                                    }else {
                                        navigate('/invalid');
                                    }
                                }
                            })
                            .catch(error => {
                                console.error("Error logging in user:", error);
                            });
                    }
                }
            >
                {
                    <Form>
                        <dl>
                            <dt>UserId</dt>
                            <dd><Field name="UserId" type="text" /></dd>
                            <ErrorMessage name="UserId" component="div" className="text-danger" />
                            <dt>Password</dt>
                            <dd><Field name="Password" type="password" /></dd>
                            <ErrorMessage name="Password" component="div" className="text-danger" />
                        </dl>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <div>
                            <Link to="/register" className="btn btn-link">Don't have an account? Register</Link>
                        </div>
                    </Form>
                }
            </Formik>
        </div>
    )
}