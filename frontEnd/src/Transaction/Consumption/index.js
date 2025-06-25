import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DropdownInput, TextInput } from "../../Inputs/index";

import {
    useAddConsumptionMutation, useDeleteConsumptionMutation, useGetConsumptionByIdQuery,
    useGetConsumptionQuery, useUpdateConsumptionMutation
} from "../../redux/ConsumptionService";
import ConsumptionItems from "./ConsumptionItems";
import moment from 'moment';



export default function Consumption() {


    const [id, setId] = useState("");
    const [docId, setDocId] = useState("");
    const [docDate, setDocDate] = useState("");
    const [consumptionItems, setConsumptionItems] = useState([]);

    const {
        data: allData,
        isLoading,
        isFetching,
    } = useGetConsumptionQuery();
    const {
        data: singleData,
        isFetching: isSingleFetching,
        isLoading: isSingleLoading,
    } = useGetConsumptionByIdQuery(id, { skip: !id });

    const [addData] = useAddConsumptionMutation();
    const [updateData] = useUpdateConsumptionMutation();
    const [removeData] = useDeleteConsumptionMutation();




    let data = {
        docId, docDate, consumptionItems: consumptionItems?.filter(item => (item?.itemId && item?.consumedQty && item?.date))
        , id
    }

    const syncFormWithDb = useCallback(
        (data) => {

            setDocId(data?.docId || "");
            setDocDate(data?.docDate || "");
            setConsumptionItems(data?.consumptionItems || []);
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
        setConsumptionItems(prev => {
            if (prev?.length >= 5) return prev
            let newArray = Array.from({ length: 5 - prev?.length }, i => {
                return {
                    itemId: "",
                    date: new Date(),
                    consumedQty: "",


                }
            })
            return [...prev, ...newArray]
        }
        )
    }, [setConsumptionItems, id, consumptionItems])

    useEffect(() => {
        if (allData?.length == 0) {
            setDocId("CON" + (parseInt(allData?.length + 1)));
            setDocDate(new Date());
        }
        else {
            let lastDocId = allData?.[allData?.length - 1]?.docId;
            if (lastDocId) {
                let lastDocNumber = parseInt(lastDocId.replace("CON", ""));
                console.log(lastDocNumber, "lastDocNumber")
                setDocId("CON" + " " + (lastDocNumber + 1));
            }
            setDocDate(moment(new Date()).format("YYYY-MM-DD"));
        }
    }, [allData])

    return (
        <div className="md:items-start md:justify-items-center grid h-full bg-theme">
            <h1 className="text-2xl text-blue-500 w-full bg-gray-200 text-center">
                Consumption
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
                            value={moment(docDate).format("YYYY-MM-DD")}
                            readOnly={true}

                        />


                        <div className="col-span-2">
                            <ConsumptionItems consumptionItems={consumptionItems} setConsumptionItems={setConsumptionItems} id={id} />
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
                            Consumption
                        </h1>
                        <div className="flex justify-start items-start border-t-2 border-gray-300 p-2 ">
                            <table className="w-full">
                                <thead className="flex gap-x-12">
                                    <th className="text-lg font-semibold w-32">DocId</th>
                                    <th className="text-sm text-gray-500 w-32">Date</th>
                                    <th className="text-sm text-gray-500 w-32  text-left ml-4">View</th>

                                </thead>
                                <tbody>

                                    {

                                        allData?.map((item, index) => (
                                            <tr key={index} className="flex gap-x-12 p-2">

                                                <td className="text-lg font-semibold w-32 text-center">{item.docId}</td>
                                                <td className="text-sm text-gray-500 w-32 text-center">{moment(item.docDate).format("DD / MM / YYYY")}</td>
                                                <td onClick={() => setId(item?.id)} className="text-center hover:cursor-pointer text-sm text-gray-500 bg-blue-300 p-1 rounded-lg w-16">View</td>
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


