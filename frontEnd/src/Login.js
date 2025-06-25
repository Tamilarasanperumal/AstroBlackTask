import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAddUserMutation, useDeleteUserMutation, useGetUserByIdQuery, useGetUserQuery, useUpdateUserMutation } from './redux/user';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import food from './assets/Legumes-resized.jpg';

const Login = () => {


    const [userName, setUserName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [array, setArray] = useState([]);
    // const [role, setRole] = useState("ADMIN")
    const [route, setRoute] = useState('');
    const navigate = useNavigate();


    const { data: allData, isLoading, isFetching } = useGetUserQuery();
    const {
        data: singleData,
        isFetching: isSingleFetching,
        isLoading: isSingleLoading,
    } = useGetUserByIdQuery(id, { skip: !id });


    const {
        data: singleUserData
    } = useGetUserByIdQuery(id, { skip: !id });

    const [addData] = useAddUserMutation();
    const [updateData] = useUpdateUserMutation();
    const [removeData] = useDeleteUserMutation();

    let data = {
        userName,
        password,
        id,
        //  role
    }


    const handleNavigate = (route) => {
        if (route === 'ADMIN') {
            navigate("/admin");
        } 
        // if (route === 'USER') {
        //     navigate("/user");
        // }
    };

    const handleSubmitCustom = async (callback, data, text) => {
        try {
            let returnData = await callback(data).unwrap();
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

    const handleLogin = async () => {
        try {
            let returnData = await addData({
                userName,
                password,
               login: true
            }).unwrap();

            if (returnData?.statusCode == 1) {
                toast.success(returnData?.message)
                handleNavigate("ADMIN")
            }
            else {
                toast.error(returnData?.message);
            }
        }
        catch (error) {
            console.log("handle");
        }
    }

    useEffect(() => {
        setArray(allData || []);
    }, [allData, setArray]);



    async function handledelete(id) {
        try {
            await removeData(id).unwrap();
            toast.success("Deleted Successfully");
            setArray(prev => {
                let newobj = structuredClone(prev)
                newobj = newobj?.filter(v => parseInt(v?.id) != parseInt(id))
                return newobj
            })
        }
        catch (error) {
            console.log("error")
        }
    }

    // const roles = [
    //     { show: 'Admin', value: 'ADMIN' },
    //     { show: 'User', value: 'USER' },
    // ]

    return (
        <>
           
            <div className="flex items-center justify-center h-screen bg-gray-100">
  <div className="flex w-4/5 h-5/6 shadow-lg rounded-xl overflow-hidden">
    <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold mb-6">LOGIN PAGE</h1>

      <div className="flex flex-col gap-6 items-center text-center">


  {/* <div className="flex gap-3 items-center">
    <label className="w-32 text-left">Role</label>
    <select
      required
      name="role"
      className="w-64 bg-gray-50 border rounded-lg h-10 px-2"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      {roles.map((option, index) => (
        <option key={index} value={option.value}>
          {option.show}
        </option>
      ))}
    </select>
  </div>  
 */}


  <div className="flex gap-3 items-center">
    <label className="w-32 text-left">User</label>
    <input
      type="text"
      className="w-64 bg-gray-50 border rounded-lg h-10 px-2"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
    />
  </div>

  <div className="flex gap-3 items-center">
    <label className="w-40 text-left">Password</label>
    <input
      type={showPassword ? "text" : "password"}
      className="w-64 bg-gray-50 border rounded-lg h-10 px-2"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      onClick={() => setShowPassword((prev) => !prev)}
      className="text-gray-500"
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </button>
  </div>

  <div className="flex gap-4 justify-center mt-4">
    <button
      className="bg-green-400 border border-gray-500 px-4 py-2 rounded-lg hover:bg-green-500"
      onClick={(e) => handleSubmit(e)}
    >
      CREATE
    </button>
    <button
      className="bg-green-400 border border-gray-500 px-4 py-2 rounded-lg hover:bg-green-500"
      onClick={handleLogin}
    >
      LOGIN
    </button>
  </div>
</div>

    </div>

            <img 
                src={food} 
                    alt="Food" 
                    className="hidden md:block md:w-1/2 object-cover"
                    />
    
  </div>
</div>

        </>
    )
}

export default Login