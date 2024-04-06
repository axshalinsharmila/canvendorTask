import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

const LoginPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [values, setValues] = useState({
   username:"",
   password:""
  });
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSubmit = ()=>{
console.log("RESP",values)
if(values.username === "" && values.password === ""){
    toast("Enter the username and password")
}
if(values.username !== "" && values.password !== ""){
    navigate("/all-prodicts")
}
  }
  return (
    <div className="bg-gray-400 h-screen">
      <div className="py-10">
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="flex justify-center p-5 ">
            <p className="text-2xl font-bold">Login</p>
          </div>
          <form className="p-5 ">
            <div className="rounded-md py-5">
              <input
                className="w-full py-2 border-b-2 outline-none rounded"
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={(e) => setValues({ ...values, username: e.target.value })}
              />
            </div>

            <div className="relative rounded-md py-5">
              <input
                className="w-full  py-2 border-b-2 outline-none rounded"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}

              />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
           
          </form>

          <div className="p-5 ">
              <button onClick={handleSubmit} className="bg-blue-500 rounded w-[100px] py-3 uppercase ">
                Submit
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
