
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Route, Routes, Outlet } from 'react-router-dom'
import DashBoard from './DashBoard'
import ItemMaster from './ItemMaster'


const AdminPage = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow pt-2 pb-20 px-4 bg-gray-200">
                    <Outlet />
                </div>
                <div className="fixed bottom-0 left-0 w-full">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default AdminPage