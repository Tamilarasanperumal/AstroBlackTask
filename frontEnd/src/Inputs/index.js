

export const handleOnChange = (event, setValue) => {
    const inputValue = event.target.value;
    const inputSelectionStart = event.target.selectionStart;
    const inputSelectionEnd = event.target.selectionEnd;

    const upperCaseValue = inputValue.toUpperCase();

    const valueBeforeCursor = upperCaseValue.slice(0, inputSelectionStart);
    const valueAfterCursor = upperCaseValue.slice(inputSelectionEnd);

    setValue(valueBeforeCursor + inputValue.slice(inputSelectionStart, inputSelectionEnd) + valueAfterCursor);



};



export const TextInput = ({ name, type, value, setValue, className, readOnly }) => {
    return (

        <div className={`flex flex-col mb-2  ${className}`}>
            <label className={`md:text-start flex text-lg pb-1 ${className}`}>{name}</label>
            <input readOnly={readOnly} type={type} className={`${" focus:outline-none md:col-span-2 border-gray-500 p-1 bg-white text-sm text-black border rounded"} `} value={value} onChange={(e) => { type === "number" ? setValue(e.target.value) : handleOnChange(e, setValue) }} />
        </div>
    )
}


export const DropdownInput = ({ name, options, value, setValue, className, raedOnly }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }


    return (
        <div className={`flex flex-col mb-2  ${className}`}>
            <label className={`md:text-start flex text-lg pb-1 ${className}`}>{name}</label>
            <select
                name="name" className='p-1 border border-gray-500 md:col-span-2 col-span-1 rounded w-60 text-sm'
                value={value} onChange={(e) => { handleOnChange(e); }} >
                <option value="">Select</option>
                {options?.map((option, index) => <option key={index} value={option.id} >
                    {option.uomName || option.itemName || option.name}

                </option>)}
            </select>
        </div>
    )
}


export function findFromList(id, list, property) {
    if (!list) return ""
    let data = list?.find(i => parseInt(i.id) === parseInt(id))
    if (!data) return ""
    return data[property]
}