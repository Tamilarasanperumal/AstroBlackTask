// import React from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//     return (
//         <header className="bg-gray-400 text-white shadow-md">
//             <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//                 <h1 className="text-xl font-bold">Restaurant Inventory Tracker </h1>
//                 <nav className="space-x-6">
//                     <Link to="/admin/dashboard" className="hover:underline">Home</Link>
//                     <Link to="/admin/item-master" className="hover:underline">Item Master</Link>
//                     <Link to="/admin/uom-master" className="hover:underline">Uom Master</Link>
//                     <Link to="/admin/inventory" className="hover:underline">Inventory</Link>
//                     <Link to="/admin/consumption" className="hover:underline">Consumption</Link>
//                 </nav>
//             </div>
//         </header>
//     );
// };

// export default Header;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {

    const [isHome, setIsHome] = useState(false);
    const navigate = useNavigate()

    return (


        <header className="bg-gray-400 text-white shadow-md">


            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">


                <h1 className="text-xl font-bold">Restaurant Inventory Tracker</h1>


                <nav className="space-x-6 ">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => isActive ? "bg-blue-500 p-1.5 rounded-lg" : ""}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/admin/item-master"
                        className={({ isActive }) => isActive ? "bg-blue-500 p-1.5 rounded-lg" : ""}     >
                        Item Master
                    </NavLink>
                    <NavLink
                        to="/admin/uom-master"
                        className={({ isActive }) => isActive ? "bg-blue-500 p-1.5 rounded-lg" : ""}      >
                        Uom Master
                    </NavLink>
                    <NavLink
                        to="/admin/inventory"
                        className={({ isActive }) => isActive ? "bg-blue-500 p-1.5 rounded-lg" : ""}     >
                        Inventory
                    </NavLink>
                    <NavLink
                        to="/admin/consumption"
                        className={({ isActive }) => isActive ? "bg-blue-500 p-1.5 rounded-lg" : ""}      >
                        Consumption
                    </NavLink>

                    <button onClick={() => {
                        navigate("/")
                    }}>
                        SignOut
                    </button>
                </nav>

            </div>
        </header>

    );
};

export default Header;

