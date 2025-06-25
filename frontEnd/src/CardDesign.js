import React from 'react';
import { findFromList } from './Inputs';
import { useGetUomQuery } from './redux/UomMasterService';
import { useGetItemQuery } from './redux/itemService';

const CardDesign = ({ itemId, uomId, qty, color, reOrderDate, borderColor }) => {



    const { data: uomList } = useGetUomQuery();
    const { data: itemList } = useGetItemQuery();


    return (

        <div className={`w-[300px] h-[110px]  shadow-lg rounded-xl p-4 border border-gray-200 bg-white  border-r-8 ${borderColor} ${color} `}>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{findFromList(itemId, itemList, "itemName")}</h2>

            <p className="text-gray-600">Stock: {qty} {findFromList(uomId, uomList, "code")}</p>
            <p className="text-gray-600">Restock Prediction : {reOrderDate == "NaN-NaN-NaN" ? "Not Consumed" : reOrderDate}</p>

        </div>
    );
};

export default CardDesign;
