import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopperHome } from "../shopper-home/shopper-home";
import { ShopperJewelery } from "../shopper-jewlery/shopper-jewelery";
import { ShopperCategory } from "../shopper-category/shopper-category";
import { ShopperDetails } from "../shopper-details/shopper-details";
import { ShopperRegister } from "../shopper-register/shopper-register";
import { ShopperLogin } from "../shopper-login/shopper-login";
import { ShopperInvalid } from "../shopper-invalid/shopper-invalid";
import { CrudIndex } from "../../crud-operations/components/crud-index";
import { CrudCreate } from "../../crud-operations/components/crud-create";


export function ShopperIndex() {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <header className="d-flex  p-2 justify-content-between align-items-center ">
                    <div>
                        <h2>Shopper.</h2>
                    </div>
                    <nav className="d-flex gap-4">
                        <div className="me-3"><Link to="/home" className="btn">Home</Link></div>
                        <div className="me-3"><Link to="/products" className="btn">Products</Link></div>
                        <div className="me-3"><Link to="/register" className="btn">Register</Link></div>
                        <div className="me-3"><Link to="category/men's clothing" className="btn">Men's Fashion</Link></div>
                        <div className="me-3"><Link to="category/women's clothing" className="btn">Women's Fashion</Link></div>
                        <div className="me-3"><Link to="category/jewelery" className="btn">Jewelery</Link></div>
                        <div className="me-3"><Link to="category/electronics" className="btn">Electronics</Link></div>
                    </nav>
                    <div>
                        <span className="bi bi-search me-3"></span>
                        <span className="bi bi-person me-3"></span>
                        <span className="bi bi-heart me-3"></span>
                        <span className="bi bi-cart4 me-3"></span>
                    </div>
                </header>
                <div className="mt-2 bg-dark text-white p-2 text-center">
                    ⚡HAPPY HOLIDAY DEALS ON EVERYTHING! UP TO 50% OFF⚡
                </div>
                <div className="d-flex gap-4 flex-wrap justify-content-center mt-4">
                    <Routes>
                        <Route path="/" element ={<ShopperHome/>}/>
                        <Route path="home" element ={<ShopperHome/>}/>
                        <Route path="jewelery" element = {<ShopperJewelery/>}/>
                        <Route path="category/:categoryName" element = {<ShopperCategory/>}/>
                        <Route path="details/:id" element = {<ShopperDetails/>}/>
                        <Route path="register" element = {<ShopperRegister/>}/>
                        <Route path="login" element = {<ShopperLogin/>}/>
                        <Route path="invalid" element = {<ShopperInvalid/>}/>
                        <Route path="products" element = {<CrudIndex/>}/>
                        <Route path="NewProduct" element = {<CrudCreate/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}