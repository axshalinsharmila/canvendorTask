import React, { useEffect, useState } from "react";
import { GoEye } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Pagination } from "antd";
import ModalComponent from "./ModalComponent";
import axios from "axios";

const AllProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getApiProducts();
  }, []);

  const getApiProducts = (pageSize, offset) => {
    if (pageSize && offset) {
      axios
        .get(
          `https://dummyjson.com/products?limit=${pageSize}&offset=${offset}`
        )
        .then((data) => {
          let responseProduct = data.data.products;
          setAllProducts(responseProduct);
        });
    } else {
      axios.get(`https://dummyjson.com/products`).then((data) => {
        let responseApi = data.data;
        let responseProduct = data.data.products;
        setApiProducts(responseApi);
        setAllProducts(responseProduct);
      });
    }
  };

  const handlePaginationChange = (page, pageSize) => {
    console.log("Page:", page, "PageSize:", pageSize);
    const offset = (page - 1) * pageSize;
    getApiProducts(pageSize, offset);
  };

  const handleRowClick = (product) => {
    console.log("PROD", product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (product) => {
    console.log("PROD", product);
    let id = product.id;
    axios
      .delete(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setAllProducts(allProducts.filter((product) => product.id !== id));
      })
      .catch((error) => {});
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const filteredProducts = allProducts.filter((product) =>
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAllProducts(filteredProducts);
    } else {
      getApiProducts();
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="overflow-x-auto px-4 py-5">
        <div className="flex justify-end p-5">
          <input
            className="py-2 px-3 border-2 mx-5 outline-none rounded"
            type="search"
            placeholder="Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded w-[100px] py-3"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500  "
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500  "
                  >
                    Brand Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500  "
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 "
                  >
                    Prices
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500  "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allProducts.length > 0 &&
                  allProducts.map((tableData, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {tableData.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {tableData.brand}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {tableData.category}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          className="text-green-500 hover:text-green-700"
                          href="#"
                        >
                          {tableData.price}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => handleRowClick(tableData)}
                          className="text-red-500 hover:text-red-700 cursor-pointer mx-2"
                        >
                          <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded-lg">
                            <GoEye className=" text-white" />
                          </div>
                        </button>
                        <button onClick={() => handleRowClick(tableData)} className="text-red-500 hover:text-red-700 cursor-pointer mx-2">
                          <div className="bg-green-500 w-12 h-12 flex items-center justify-center rounded-lg">
                            <FaRegEdit className=" text-white" />
                          </div>
                        </button>
                        <button
                          onClick={() => handleDelete(tableData)}
                          className="text-red-500 hover:text-red-700 cursor-pointer mx-2"
                        >
                          <div className="bg-red-500 w-12 h-12 flex items-center justify-center rounded-lg">
                            <RiDeleteBin6Line className=" text-white" />
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <Pagination
            defaultCurrent={1}
            total={apiProducts.limit}
            onChange={handlePaginationChange}
          />
        </div>

        {selectedProduct && (
          <ModalComponent
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default AllProductsList;
