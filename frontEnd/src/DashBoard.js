import React from 'react'
import { useGetInventoryQuery } from './redux/InventoryService';
import CardDesign from './CardDesign';

const DashBoard = () => {

    const { data: inventoryData } = useGetInventoryQuery();

    const boards = [
        {
            name: "In Stock"
        },
        {
            name: "Low Stock"
        },

        {
            name: "Out Of Stock"
        }

    ]


    return (
        <div className='w-full '>
            <div className='text-2xl text-center font-bold w-full text-gray-600 uppercase'> Inventory Tracking Board</div>

            <div className="flex justify-around text-center w-full mt-2">

                {boards.map(((i, index) =>
                    <>
                        <h1 className='text-xl text-blue-500 font-semibold w-44 p-2 bg-gray-200 underline pb-1'>{i.name}</h1>
                    </>
                ))}

            </div>



            <div className="flex justify-center text-center w-full mt-6">
                <div className="w-2/6 flex flex-col items-center gap-y-2 ">
                    {inventoryData?.stockData?.filter(j => j.isHighStock)?.map(((i, index) =>
                    (
                        <CardDesign key={index} itemId={i?.itemId} qty={i?.qty} uomId={i?.uomId} color={"bg-green-300"} reOrderDate={i?.reOrderDate} borderColor={"border-r-green-700"} />
                    )
                    ))}
                </div>


                <div className="w-2/6 flex flex-col items-center gap-y-2">
                    {inventoryData?.stockData?.filter(j => j.isLowStock)?.map(((i, index) =>
                    (
                        <CardDesign key={index} itemId={i?.itemId} qty={i?.qty} uomId={i?.uomId} color={"bg-yellow-200"} borderColor={"border-r-yellow-700"} reOrderDate={i?.reOrderDate} />
                    )

                    ))}
                </div>
                <div className="w-2/6 flex flex-col items-center gap-y-2">{console.log(inventoryData, "inventoryData")}
                    {inventoryData?.stockData?.filter(j => j.isOutOfStock)?.map(((i, index) =>
                    (
                        <CardDesign key={index} itemId={i?.itemId} qty={i?.qty} uomId={i?.uomId} color={"bg-red-200"} reOrderDate={i?.reOrderDate} borderColor={"border-r-red-700"} />
                    )

                    ))}
                </div>

            </div>



        </div>
    )
}

export default DashBoard