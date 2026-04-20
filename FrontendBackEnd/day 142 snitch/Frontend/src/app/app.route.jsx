import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Protected from "../features/auth/components/Protected";
import CreateProducts from "../features/products/pages/CreateProducts";
import Home from "../features/products/pages/Home";
import Dashboard from "../features/products/pages/Dashboard";
import ProductDetails from "../features/products/pages/ProductDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home />
    </Protected>,
  },
  {
    path: "/product/:id",
    element: <Protected>
      <ProductDetails />
    </Protected>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/seller",
    element: <Dashboard />
  },
  {
    path: "/create-products",
    element: <CreateProducts />,
  },
]);
