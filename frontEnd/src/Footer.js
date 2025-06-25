import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-400 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Inventory System. All rights reserved.</p>
                <div className="mt-2 md:mt-0 space-x-4">
                    <a href="" className="hover:underline text-sm">Privacy</a>
                    <a href="" className="hover:underline text-sm">Terms</a>
                    <a href="" className="hover:underline text-sm">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
