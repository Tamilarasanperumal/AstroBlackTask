import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { DropdownInput, TextInput } from "./Inputs";
import { useAddItemMutation, useDeleteItemMutation, useGetItemByIdQuery, useGetItemQuery, useUpdateItemMutation } from "./redux/itemService";
import { useGetUomQuery } from "./redux/UomMasterService";






const ItemMaster = () => {


    const [id, setId] = useState("");
    const [itemName, setItemName] = useState("");
    const [uomId, setUomId] = useState("");
    const [code, setCode] = useState("");
    const [thresholdQty, setThresholdQty] = useState("");
    const {
        data: allData,
        isLoading,
        isFetching,
    } = useGetItemQuery();



    const {
        data: singleData,
        isFetching: isSingleFetching,
        isLoading: isSingleLoading,
    } = useGetItemByIdQuery(id, { skip: !id });

    const [addData] = useAddItemMutation();
    const [updateData] = useUpdateItemMutation();
    const [removeData] = useDeleteItemMutation();
    const { data: uomList } = useGetUomQuery();



    let data = {
        itemName,
        code, uomId, id, thresholdQty
    }


    const syncFormWithDb = useCallback(
        (data) => {

            setThresholdQty(data?.thresholdQty || "");
            setItemName(data?.itemName || "");
            setCode(data?.code || "");
            setUomId(data?.uomId || "");
        },
        [id]
    );



    useEffect(() => {
        syncFormWithDb(singleData);
    }, [isSingleFetching, isSingleLoading, id, syncFormWithDb, singleData]);


    const handleSubmitCustom = async (callback, data, text) => {
        try {
            let returnData = await callback(data).unwrap();
            syncFormWithDb(undefined);
            if (returnData?.statusCode == 0) {
                toast.error(returnData?.message)
            } else {

                toast.success(text + "Successfully");

            }

        } catch (error) {
            console.log(error, "error")
            toast.error(error?.data);
        }
    };


    const handleSubmit = (e) => {
        if (id) {
            handleSubmitCustom(updateData, data, "Updated");
        } else {
            handleSubmitCustom(addData, data, "Added");
        }

    };


    async function handledelete(id) {
        try {
            await removeData(id).unwrap();
            syncFormWithDb(undefined);
            toast.success("Deleted Successfully");
        }
        catch (error) {
            console.log("error")
        }
    }



    return (
        <div

            className="md:items-start md:justify-items-center grid h-full bg-theme"
        >
            <h1 className="text-2xl text-blue-500 w-full bg-gray-200 text-center">
                Item Master
            </h1>

            <div className="flex flex-col frame w-full h-full">

                <div className="flex justify-between w-full">
                    <div className="grid grid-cols-2 gap-x-5 w-1/2">
                        <TextInput
                            name="Item Name"
                            type="text"
                            value={itemName}
                            setValue={setItemName}

                        />
                        <TextInput
                            name="Code"
                            type="text"
                            value={code}
                            setValue={setCode}

                        />
                        <DropdownInput
                            name="Uom"

                            options={uomList}
                            value={uomId}
                            setValue={(value) => {
                                setUomId(value);
                            }}

                            required={true}

                        />
                        <TextInput
                            name="Threshold Qty"
                            type="number"
                            value={thresholdQty}
                            setValue={setThresholdQty}

                        />
                        <div className="flex">
                            <div className='mt-5' >
                                <button className='W-24 bg-green-400 border border-gray-500 p-2 rounded-xl ml-10' onClick={(e) => handleSubmit(e)}>CREATE</button>
                            </div>
                            <div className='mt-5' >
                                <button className='W-24 bg-red-400 border border-gray-500 p-2 rounded-xl ml-10' onClick={(e) => handledelete(id)}>DELETE</button>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 mr-24 ">
                        <h1 className="mt-5 text-xl flex justify-center items-start">
                            Item List
                        </h1>
                        <div className="flex justify-start items-start border-t-2 border-gray-300 p-2 ">
                            <table className="w-full">
                                <thead className="flex gap-x-12">


                                    <th className="text-lg font-semibold w-44"> Name</th>
                                    <th className="text-sm text-gray-500 w-28">Threshold</th>
                                    <th className="text-sm text-gray-500">Edit</th>


                                </thead>
                                <tbody>

                                    {

                                        allData?.map((item, index) => (
                                            <tr key={index} className="flex gap-x-12 p-2">

                                                <td className="text-lg font-semibold w-44">{item.itemName}</td>
                                                <td className="text-sm text-center text-gray-500 w-28">{item.thresholdQty}</td>
                                                <td onClick={() => setId(item?.id)} className="text-center hover:cursor-pointer text-sm text-gray-500 bg-yellow-300 p-1 rounded-lg w-12">{"Edit"}</td>



                                            </tr>
                                        ))}
                                </tbody>
                            </table>


                        </div>



                    </div>
                </div>

            </div>
        </div>
    );
}


export default ItemMaster