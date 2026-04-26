import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Protected from "../features/auth/components/Protected";
import CreateProducts from "../features/products/pages/CreateProducts";
import Home from "../features/products/pages/Home";
import Dashboard from "../features/products/pages/Dashboard";
import ProductDetails from "../features/products/pages/ProductDetails";
import AddProductVariant from "../features/products/pages/AddProductVariant";


export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/product/:id",
    element: <ProductDetails />
  },
  {
    path: "/seller",
    children: [
      {
        path: "/seller/dashboard",
        element: <Protected role="seller">
          <Dashboard />
        </Protected>
      },
      {
        path: "/seller/create-product",
        element: <Protected role="seller">
          <CreateProducts />
        </Protected>
      },
      {
        path: "/seller/product/:productId/add-variant",
        element: <Protected role="seller">
          <AddProductVariant />
        </Protected>
      }
    ]
  },
]);
