import { Outlet } from "react-router-dom";

const Layout = () => {
    return <main className="my-16">
        <div className="body-container mb-16 text-center bg-orange-600 rounded-lg py-1 w-fit hover:bg-orange-900 cursor-pointer">
            <h2 className="text-4xl text-white">React-Query test</h2>
        </div>
        <Outlet />
    </main>;
};

export default Layout;
