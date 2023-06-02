import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages";
import UpdateBook from "./pages/books/edit";
import { Layout } from "antd";
import { Root } from "./routes/root";
import { Error404 } from "./components/404";
import { Inventory } from "./pages/inventory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/books/edit/:bookId", element: <UpdateBook /> },
      { path: "/books/view/:bookId", element: <UpdateBook /> },
      // { path: "/my-library", element: <UpdateBook /> },
      { path: "/my-inventory", element: <Inventory /> },
    ],
  },
]);

function App() {
  return (
    <Layout style={{ minHeight: "100vh", minWidth: '99.01vw' }}>
      <RouterProvider router={router}>

      </RouterProvider>
    </Layout>
  );
}

export default App;
