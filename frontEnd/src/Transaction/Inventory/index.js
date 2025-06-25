import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DropdownInput, TextInput } from "../../Inputs/index";

import {
    useAddInventoryMutation, useDeleteInventoryMutation, useGetInventoryByIdQuery,
    useGetInventoryQuery, useUpdateInventoryMutation
} from "../../redux/InventoryService";
import InventoryItems from "./InventoryItems";
import moment from 'moment';



export default function Inventory() {


    const [id, setId] = useState("");
    const [docId, setDocId] = useState("");
    const [date, setDate] = useState("");
    const [inventoryItems, setInventoryItems] = useState([]);

    const {
        data: allData,
        isLoading,
        isFetching,
    } = useGetInventoryQuery();
    const {
        data: singleData,
        isFetching: isSingleFetching,
        isLoading: isSingleLoading,
    } = useGetInventoryByIdQuery(id, { skip: !id });

    const [addData] = useAddInventoryMutation();
    const [updateData] = useUpdateInventoryMutation();
    const [removeData] = useDeleteInventoryMutation();




    let data = {
        docId, date, inventoryItems: inventoryItems?.filter(item => (item?.itemId && item?.uomId && item?.qty && item?.thresholdQty))
        , id
    }

    const syncFormWithDb = useCallback(
        (data) => {

            setDocId(data?.docId || "");
            setDate(data?.date || "");
            setInventoryItems(data?.inventoryItems || []);
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
                toast.success(text + "Successfully")
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



    useEffect(() => {
        if (id) return
        setInventoryItems(prev => {
            if (prev?.length >= 5) return prev
            let newArray = Array.from({ length: 5 - prev?.length }, i => {
                return {
                    itemId: "",
                    uomId: "",
                    qty: "",
                    thresholdQty: "",

                }
            })
            return [...prev, ...newArray]
        }
        )
    }, [setInventoryItems, id, inventoryItems])

    useEffect(() => {
        if (allData?.inventoryData?.length == 0) {
            setDocId("INV" + (parseInt(allData?.length + 1)));
            setDate(new Date());
        }
        else {
            let lastDocId = allData?.inventoryData?.[allData?.inventoryData?.length - 1]?.docId;
            if (lastDocId) {
                let lastDocNumber = parseInt(lastDocId.replace("INV", ""));
                setDocId("INV" + " " + (lastDocNumber + 1));
            }

            setDate(moment(new Date()).format("YYYY-MM-DD"));
        }
    }, [allData])

    return (
        <div className="md:items-start md:justify-items-center grid h-full bg-theme">{console.log(docId, "docId")}
            <h1 className="text-2xl text-blue-500 w-full bg-gray-200 text-center">
                Inventory
            </h1>
            <div className="flex flex-col frame w-full h-full">
                <div className="flex justify-between w-full">
                    <div className="grid grid-cols-2 gap-x-5 w-1/2">
                        <TextInput
                            name="DocId"
                            type="text"
                            value={docId}
                            readOnly={true}

                        />
                        <TextInput
                            name="Code"
                            type="date"
                            value={moment(date).format("YYYY-MM-DD")}
                            readOnly={true}

                        />


                        <div className="col-span-2">
                            <InventoryItems inventoryItems={inventoryItems} setInventoryItems={setInventoryItems} />
                        </div>
                        <div className="flex mt-5 w-full col-span-2">
                            <div className='' >
                                <button className='W-24 bg-green-400 border border-gray-500 p-2 rounded-xl ml-10' onClick={(e) => handleSubmit(e)}>CREATE</button>
                            </div>
                            <div className='' >
                                <button className='W-24 bg-red-400 border border-gray-500 p-2 rounded-xl ml-10' onClick={(e) => handledelete(id)}>DELETE</button>
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 mr-24 ">
                        <h1 className="mt-5 text-xl flex justify-center items-start">
                            Inventory
                        </h1>
                        <div className="flex justify-start items-start border-t-2 border-gray-300 p-2 ">{console.log(allData, "allData")}
                            <table className="w-full">
                                <thead className="flex gap-x-12">


                                    <th className="text-lg font-semibold w-32">DocId</th>
                                    <th className="text-sm text-gray-500 w-32">Date</th>
                                    <th className="text-sm text-gray-500 text-end ml-4">Edit</th>


                                </thead>
                                <tbody>

                                    {

                                        allData?.inventoryData?.map((item, index) => (
                                            <tr key={index} className="flex gap-x-12 p-2">

                                                <td className="text-lg font-semibold w-32 text-center">{item.docId}</td>
                                                <td className="text-sm text-gray-500 w-32 text-center">{moment(item.date).format("DD / MM / YYYY")}</td>
                                                <td onClick={() => setId(item?.id)} className="hover:cursor-pointer  text-center text-sm text-gray-500 bg-yellow-300 p-1 rounded-lg w-12">Edit</td>
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


