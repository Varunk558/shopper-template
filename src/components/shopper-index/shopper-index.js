import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShopperHome } from "../shopper-home/shopper-home";
import { ShopperJewelery } from "../shopper-jewlery/shopper-jewelery";
import { ShopperCategory } from "../shopper-category/shopper-category";


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
                        <div className="me-3"><Link to="/mens-fashion" className="btn">Men's Fashion</Link></div>
                        <div className="me-3"><Link to="/womens-fashion" className="btn">Women's Fashion</Link></div>
                        <div className="me-3"><Link to="/jewelery" className="btn">Jewelery</Link></div>
                        <div className="me-3"><Link to="/electronics" className="btn">Electronics</Link></div>
                    </nav>
                    <div>
                        <span className="bi bi-search me-3"></span>
                        <span className="bi bi-person me-3"></span>
                        <span className="bi bi-heart me-3"></span>
                        <span className="bi bi-cart4 me-3"></span>
                    </div>
                </header>
                <div className="mt-2 bg-dark text-white p-2 text-center">
                    ⚡HAPPY HOLIDAY DEALS ON EVERYTHING! UP TO 50% OFF + FREE SHIPPING. SHOP NOW⚡
                </div>
                <div className="d-flex gap-4 flex-wrap justify-content-center mt-4">
                    <Routes>
                        <Route path="/" element ={<ShopperHome/>}/>
                        <Route path="/home" element ={<ShopperHome/>}/>
                        <Route path="/jewelery" element = {<ShopperJewelery/>}/>
                        <Route path="/category" element = {<ShopperCategory/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}