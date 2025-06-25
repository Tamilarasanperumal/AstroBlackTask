import moment from "moment";
import { useGetItemQuery } from "../../redux/itemService";
import { useGetUomQuery } from "../../redux/UomMasterService";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetInventoryQuery } from "../../redux/InventoryService";
import { toast } from "react-toastify";
import { findFromList } from "../../Inputs";

const ConsumptionItems = ({ consumptionItems, setConsumptionItems, id }) => {

  const { data: uomList } = useGetUomQuery();
  const { data: itemList } = useGetItemQuery();
  const { data: inventoryData } = useGetInventoryQuery();

  const addRow = () => {
    const newRow = { uomId: "", itemId: "", consumedQty: "", date: "" }
    setConsumptionItems([...consumptionItems, newRow]);
  };
  const handleDeleteRow = id => {
    setConsumptionItems(val => val.filter((row, index) => index !== parseInt(id)));
  };



  function handleInputChange(value, index, field) {
    if (id) return toast.error("You Can't Edit ");
    const newBlend = structuredClone(consumptionItems);
    if (field === "consumedQty") {
      if (!newBlend[index]["uomId"] || !newBlend[index]["itemId"]) {
        toast.error("Please select Item and UOM before entering Consumption Quantity");
        return;
      }
      let stockQty = inventoryData?.stockData?.find(item =>
        (parseInt(item.itemId) === parseInt(newBlend[index]["itemId"])) && (parseInt(item.uomId) === parseInt(newBlend[index]["uomId"])))?.qty || 0

      if (parseFloat(value) > parseFloat(stockQty)) {
        toast.error("Consumption Quantity cannot be greater than Stock Quantity");
        return;
      }
    }
    if (field == "itemId") {
      console.log(value, "itemmmm")
      let uomId = findFromList(value, itemList, "uomId")
      newBlend[index]["uomId"] = uomId;
    }
    newBlend[index][field] = value;
    setConsumptionItems(newBlend);
  };


  return (

    <div className={` relative w-full overflow-y-auto py-1 h-full`}>
      <table className=" border border-gray-500 text-xs table-auto w-full">
        <thead className='bg-blue-200 top-0 border-b border-gray-500'>
          <tr className=''>
            <th className="table-data  w-7 text-center p-0.5">S.no</th>
            <th className="table-data  w-44">Product Name<span className="text-red-500 p-5">*</span></th>
            <th className="table-data w-16">Uom<span className="text-red-500 p-5">*</span></th>
            <th className="table-data w-16">Date</th>
            <th className="table-data  w-16">Consumption</th>

            {
              !id &&
              <th className='w-20  bg-green-600 text-white'>
                <div onClick={addRow}
                  className='hover:cursor-pointer py-2 flex items-center justify-center bg-green-600 text-white'>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </th>
            }

          </tr>
        </thead>

        <tbody className='overflow-y-auto h-full w-full'>{console.log(consumptionItems, "consumptionItems")}
          {(consumptionItems || []).map((item, index) =>

            <tr key={index} className={`w-full table-row`}>
              <td className="table-data w-5 text-left px-1 py-1 border border-gray-400">
                {index + 1}
              </td>

              <td className='table-data'>
                <select
                  disabled={id ? true : false}
                  className='text-left w-full rounded py-1 table-data-input border border-gray-400'
                  value={item.itemId}
                  onChange={(e) => handleInputChange(e.target.value, index, "itemId")}
                >
                  <option className='text-gray-600'>
                  </option>
                  {(itemList ? itemList : []).map((i) =>
                    <option value={i.id} key={i.id}>
                      {i.itemName}
                    </option>
                  )}
                </select>
              </td>
              <td className='table-data w-16'>

                <select
                  disabled={true}
                  className='text-left w-full rounded py-1 table-data-input border border-gray-400'
                  value={item.uomId}

                  onChange={(e) => handleInputChange(e.target.value, index, "uomId")}
                >
                  <option className='text-gray-600'>
                  </option>
                  {(uomList ? uomList : []).map((uom) =>
                    <option value={uom.id} key={uom.id}>
                      {uom.uomName}
                    </option>
                  )}
                </select>
              </td>
              <td className='table-data'>
                <input

                  readOnly={id ? true : false}
                  type="date"
                  className="text-right rounded py-1 px-1 w-full  table-data-input border border-gray-400"
                  value={item.date ? moment(item.date).format("YYYY-MM-DD") : ''}

                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "date")
                  }

                />
              </td>
              <td className='table-data'>
                <input
                  readOnly={id ? true : false}
                  type="number"
                  className="text-right rounded py-1 px-1 w-full  table-data-input border border-gray-400"
                  value={item.consumedQty == 0 ? '' : item.consumedQty}

                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "consumedQty")
                  }

                />
              </td>
              {
                !id &&
                <td className=''>
                  <div onClick={() => handleDeleteRow(index)} className='flex justify-center px-2 py-1.5 items-center cursor-pointer bg-red-300'>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </td>
              }



            </tr>

          )}

        </tbody>

      </table>
    </div>


  );
}


export default ConsumptionItems