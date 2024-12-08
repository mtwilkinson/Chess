import './App.css';
import {Outlet, RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import Homepage from "./routes/Homepage.tsx";
import Example from "./routes/Example.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
    const router = createBrowserRouter([

        {
            path: "/",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Root />,
            children: [
                {
                    path: "/",
                    errorElement: <h2>Something went wrong!</h2>,
                    element: <Homepage />,
                },
                {
                    path: "/example",
                    errorElement: <h2>Something went wrong!</h2>,
                    element: <Example />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;

    function Root() {
        return (
            <div className="w-screen h-screen flex flex-col bg-blue-50 items-center">
                <Navbar />
                <Outlet />
            </div>
        );
    }
}

export default App;
