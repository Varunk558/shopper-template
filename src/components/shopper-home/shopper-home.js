import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ShopperHome() {

    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies['userId'] === undefined) {
            navigate('/login');
        } else {
            console.log("User is logged in:", cookies.userId);
        }
    }, [cookies.userId]);

    return (
        <div className="container-fluid d-flex justify-content-between">
            <div>
                <div className="d-flex gap-4 flex-wrap justify-content-between mt-4">
                    <div>
                        <img src="mens.png" style={{ width: '200px', height: 'auto' }}/>
                    </div>
                    <div>
                        <img src="womens.png" style={{ width: '200px', height: 'auto' }}/>
                    </div>
                    <div>
                        <img src="jewlery.png" style={{ width: '200px', height: 'auto' }}/>
                    </div>
                    <div>
                        <img src="electronics.png" style={{ width: '200px', height: 'auto' }}/>
                    </div>
                </div>
            </div>
            <div>
                <h4>Hello! {cookies.userId}</h4>
                <button onClick={() => {
                    removeCookie('userId');
                    navigate('/login');
                }} className="btn btn-link">Sign Out</button>
            </div>
        </div>
    )
}