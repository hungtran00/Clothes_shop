import Blog from "../pages/Blog";
import Features from "../pages/Features";
import Home from "../pages/Home"
import Shop from "../pages/Shop";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login"
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
const publicRoutes = [
    {
        path: '/', component: Home
    },
    {
        path: '/blog', component: Blog
    },
    {
        path: '/shop', component: Shop

    },
    {
        path: '/shop/:id', component: ProductDetail
    },
    {
        path: '/features', component: Features
    },
    {
        path: '/login', component: Login
    },
    {
        path: '/cart', component: Cart
    },
    {
        path: '/*', component: NotFound
    }
]
export default publicRoutes