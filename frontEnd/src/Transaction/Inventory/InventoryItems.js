import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGetItemQuery } from "../../redux/itemService";
import { useGetUomQuery } from "../../redux/UomMasterService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findFromList } from "../../Inputs";

const InventoryItems = ({ inventoryItems, setInventoryItems }) => {

  const { data: uomList } = useGetUomQuery();
  const { data: itemList } = useGetItemQuery();


  const addRow = () => {
    const newRow = { uomId: "", itemId: "", qty: "", thresholdQty: "" }

    setInventoryItems([...inventoryItems, newRow]);
  };
  const handleDeleteRow = id => {
    setInventoryItems(val => val.filter((row, index) => index !== parseInt(id)));
  };



  function findThresholdQty(itemId, uomId) {
    const item = itemList.find(item => (parseInt(item.id) === parseInt(itemId) && parseInt(item.uomId) === parseInt(uomId)))
    return item ? item.thresholdQty : 0;
  }


  function handleInputChange(value, index, field) {
    const newBlend = structuredClone(inventoryItems);
    newBlend[index][field] = value;
    if (field === "itemId" || field === "uomId") {
      newBlend[index]["thresholdQty"] = findThresholdQty(newBlend[index]["itemId"], newBlend[index]["uomId"]);
      if (field == "itemId") {
        let uomId = findFromList(value, itemList, "uomId")
        newBlend[index]["uomId"] = uomId;
      }
    }
    setInventoryItems(newBlend);
  };

  return (

    <div className={` relative w-full overflow-y-auto py-1 h-full`}>
      <table className=" border border-gray-500 text-xs table-auto w-full">
        <thead className='bg-blue-200 top-0 border-b border-gray-500'>
          <tr className=''>
            <th className="table-data  w-7 text-center p-0.5">S.no</th>
            <th className="table-data text-center w-28">Product Name<span className="text-red-500 p-2">*</span></th>
            <th className="table-data w-16">Uom<span className="text-red-500 p-5">*</span></th>
            <th className="table-data  w-12">Qty/Ltr<span className="text-red-500 p-5">*</span></th>
            <th className="table-data  w-12">ThresholdQty<span className="text-red-500 p-2">*</span></th>
            <th className='w-12  bg-green-600 text-white'>
              <div onClick={addRow}
                className='hover:cursor-pointer py-2 flex items-center justify-center bg-green-600 text-white'>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </th>

          </tr>
        </thead>

        <tbody className='overflow-y-auto h-full w-full'>{console.log(inventoryItems, "inventoryItems")}
          {(inventoryItems || []).map((item, index) =>

            <tr key={index} className={`w-full table-row`}>
              <td className="table-data w-5 text-left px-1 py-1 border border-gray-400">
                {index + 1}
              </td>

              <td className='table-data w-16'>

                <select

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
                  type="number"
                  className="text-right rounded py-1 px-1 w-full  table-data-input border border-gray-400"
                  value={item.qty == 0 ? '' : item.qty}

                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "qty")
                  }

                />
              </td>

              <td className='table-data'>
                <input
                  type="number"
                  className="text-right rounded py-1 px-1 w-full  table-data-input border border-gray-400"
                  value={item?.thresholdQty == 0 ? '' : item.thresholdQty}
                  readOnly={true}
                  onChange={(e) =>
                    handleInputChange(e.target.value, index, "thresholdQty")
                  }

                />
              </td>
              <td className=''>
                <div onClick={() => handleDeleteRow(index)} className='flex justify-center px-2 py-1.5 items-center cursor-pointer bg-red-300'>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </td>
            </tr>

          )}

        </tbody>
      </table>
    </div>
  );
}


export default InventoryItems