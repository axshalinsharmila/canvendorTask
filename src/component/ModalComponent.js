import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

const ModalComponent = ({ isModalOpen, setIsModalOpen, product }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [values, setValues] = useState({
    brand: product.brand,
    category: product.category,
    price: product.price,
  });
  console.log("allProducts", product);

  const handleCancel = () => {
    setIsModalOpen(false);
    setValues("");
  };
  const handleSubmit = () => {
    const filedValue = { ...values, gender: selectedGender };
    console.log(filedValue);
    axios.post("https://dummyjson.com/products/add", filedValue).then((res) => {
      console.log("REPONSE", res);
    });
  };
  useEffect(() => {
    setValues(product)
  }, [product]);

  return (
    <>
      <Modal
        title="Modal 1"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <form>
          <div className="rounded-md py-5">
            <div className="pb-3">
              <label className=" w-full text-gray-800 font-semibold uppercase text-sm">
                Brand Name
              </label>
            </div>
            <input
              className="w-full px-3 py-2 border-2 outline-none rounded"
              type="text"
              placeholder="Brand Name"
              value={values.brand}
              onChange={(e) => setValues({ ...values, brand: e.target.value })}
            />
          </div>
          <div className="rounded-md py-5">
            <div className="pb-3">
              <label className=" w-full text-gray-800 font-semibold uppercase text-sm">
                Category
              </label>
            </div>
            <input
              className="w-full px-3 py-2 border-2 outline-none rounded"
              type="text"
              placeholder="Category"
              value={values.category}
              onChange={(e) =>
                setValues({ ...values, category: e.target.value })
              }
            />
          </div>
          <div className="rounded-md py-5">
            <div className="pb-3">
              <label className=" w-full text-gray-800 font-semibold uppercase text-sm">
                Price
              </label>
            </div>
            <input
              className="w-full px-3 py-2 border-2 outline-none rounded"
              type="number"
              placeholder="Prices"
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
            />
          </div>
          <div className="rounded-md py-5">
            <div className="pb-3">
              <label className=" w-full text-gray-800 font-semibold uppercase text-sm">
                Gender
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={(e) => setSelectedGender(e.target.value)}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-indigo-600 h-5 w-5"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={(e) => setSelectedGender(e.target.value)}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </form>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className=" bg-gray-300 rounded w-[100px] py-3 mx-3 hover:bg-blue-500 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="hover:bg-blue-500 hover:text-white bg-gray-300 rounded w-[100px] py-3"
          >
            Next
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
