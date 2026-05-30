import { useState, useEffect } from 'react';
export function Login() {
    useEffect(() => {
        alert("Login component mounted");
        return () => {
            alert("Login component unmounted");
        };
    }, []);

    return (
        <div className="container-fluid">
            <h2>Login</h2>
            <p>Please enter your credentials to login.</p>
            <button className="btn btn-primary">Login</button>
        </div>
    );
}

export function Register() {
    useEffect(() => {
        alert("Register component mounted");
        return () => {
            alert("Register component unmounted");
        };
    }, []);

    return (
        <div className="container-fluid">
            <h2>Register</h2>
            <p>Please enter your details to register.</p>
            <button className="btn btn-primary">Register</button>
        </div>
    );
}

export function EffectsComponent() {

    const [component, setComponent] = useState('');
    return (
        <div className="container-fluid">
            <h2>Effects Component</h2>
            <p>This component is used to explain the use of useEffect hook in React.</p>
            <button onClick={() => setComponent('login')}>Login</button>
            <button onClick={() => setComponent('register')}>Register</button>
            <hr />
            {component === 'login' && <Login />}
            {component === 'register' && <Register />}
        </div>
    );
}