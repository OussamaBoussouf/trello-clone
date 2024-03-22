import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";


function RootLayout() {
    return (
        <>
           <Navbar/> 
           <div className="container mx-auto">
           <Outlet/>
           </div>
        </>
    );
}

export default RootLayout;