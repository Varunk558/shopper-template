import { Link } from "react-router-dom";


export function ShopperInvalid() {

    return (
        <div className="text-danger text-center">
            <h1>Invalid Login</h1>
            <p>Your login attempt was unsuccessful. Please try again.</p>
            <div>
                <Link to="/login" className="btn btn-primary">Try Again</Link>
            </div>
        </div>
    )
}