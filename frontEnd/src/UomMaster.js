import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DropdownInput, TextInput } from "./Inputs";

import { useAddUomMutation, useDeleteUomMutation, useGetUomByIdQuery, useGetUomQuery, useUpdateUomMutation }
    from "./redux/UomMasterService";




const UomMaster = () => {


    const [id, setId] = useState("");
    const [uomName, setUomName] = useState("");
    const [code, setCode] = useState("");
    const [array, setArray] = useState([]);
    const {
        data: allData,
        isLoading,
        isFetching,
    } = useGetUomQuery();
    const {
        data: singleData,
        isFetching: isSingleFetching,
        isLoading: isSingleLoading,
    } = useGetUomByIdQuery(id, { skip: !id });

    const [addData] = useAddUomMutation();
    const [updateData] = useUpdateUomMutation();
    const [removeData] = useDeleteUomMutation();




    let data = {
        uomName,
        code, id
    }


    function onNew() {
        setId("");
        setUomName("");
        setCode("");
    }

    const syncFormWithDb = useCallback(
        (data) => {
            setUomName(data?.uomName || "");
            setCode(data?.code || "");

        },
        [id]
    );



    useEffect(() => {
        syncFormWithDb(singleData);
    }, [isSingleFetching, isSingleLoading, id, syncFormWithDb, singleData]);

    const handleSubmitCustom = async (callback, data, text) => {
        try {
            let returnData = await callback(data).unwrap();
            if (returnData?.statusCode == 0) {
                toast.error(returnData?.message)
            } else {
                syncFormWithDb(undefined);
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
            toast.success("Deleted Successfully");
            syncFormWithDb(undefined);
        }
        catch (error) {
            console.log("error")
        }
    }



    return (
        <div className="md:items-start md:justify-items-center grid h-full bg-theme">
            <h1 className="text-2xl text-blue-500 w-full bg-gray-200 text-center">
                Uom Master
            </h1>
            <div className="flex flex-col frame w-full h-full">
                <div className="flex justify-between w-full">
                    <div className="grid grid-cols-2 gap-x-5 w-1/2">
                        <TextInput
                            name="Uom Name"
                            type="text"
                            value={uomName}
                            setValue={setUomName}

                        />
                        <TextInput
                            name="Code"
                            type="text"
                            value={code}
                            setValue={setCode}

                        />


                        <div className="flex">
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
                            Uom List
                        </h1>
                        <div className="flex justify-start items-start border-t-2 border-gray-300 p-2">
                            <table className="w-full">
                                <thead className="flex gap-x-20">


                                    <th className="text-lg font-semibold w-44"> Name</th>
                                    <th className="text-sm text-gray-500 w-28">Code</th>
                                    <th className="text-sm text-gray-500 w-12">Edit</th>


                                </thead>
                                <tbody>

                                    {

                                        allData?.map((item, index) => (
                                            <tr key={index} className="flex gap-x-20 p-2">

                                                <td className="text-lg font-semibold w-44">{item.uomName}</td>
                                                <td className="text-sm text-gray-500 w-28">{item.code}</td>
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


export default UomMaster