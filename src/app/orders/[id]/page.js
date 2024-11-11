// app/orders/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import Invoice from "../../orderinvoice/pdf";

const OrderDetails = ({ params }) => {
  // Access the dynamic segment 'id' directly from params
  const { id } = params;

  const [orderDetailsss, setOrderDetails] = useState(null);

  console.log(id);

  const fetchUnfulfilledOrders = async () => {
    const url = `http://localhost:3000/api/fetch?id=${id}`;
    const response = await fetch(url, {});

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("detail", data);
    setOrderDetails(data);
    return data;
  };

  useEffect(() => {
    fetchUnfulfilledOrders();
  }, []);

  return (
    <div className="sm:ml-64 p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Order Details
      </h1>

      <div class="flex justify-center items-center mb-2 space-x-1">
        <div class="relative inline-block text-left w-full max-w-xs">
          <button
            id="printDropdownButton"
            data-dropdown-toggle="printDropdown"
            class="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-4 py-1 text-center inline-flex items-center w-38"
            type="button"
          >
            <svg
              class="w-4 h-4 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 9V6a2 2 0 012-2h8a2 2 0 012 2v3M6 14h12m-6 6h6m-3-3v3m-6-3v3m0-3H6m0 0V6m0 0h12M6 6h6"
              />
            </svg>
            Print
            <svg
              class="w-2 h-2 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="printDropdown"
            class="z-10 hidden bg-white divide-y divide-gray-100 shadow w-36 absolute right-0"
          >
            <ul
              class="py-1 text-sm text-gray-700"
              aria-labelledby="printDropdownButton"
            >
              <li>
                <a href="#" class="block px-2 py-1 hover:bg-gray-100">
                  Print Invoice
                </a>
              </li>
              <li>
                <a href="#" class="block px-2 py-1 hover:bg-gray-100">
                  Print Packing Slip
                </a>
              </li>
            </ul>
          </div>
        </div>

        <button
          class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-1 text-center inline-flex items-center"
          type="button"
        >
          <svg
            class="w-4 h-4 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l9 6 9-6m-9 6v9M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
          Send
        </button>

        <div class="relative inline-block text-left w-full max-w-xs">
          <button
            id="downloadButton"
            class="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-3 py-1 text-center inline-flex items-center"
            type="button"
          >
            <svg
              class="w-4 h-4 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v9m0 0l-3-3m3 3l3-3M4 20h16"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      {orderDetailsss  ? (
        <Invoice orderDetailsss={orderDetailsss} />
      ) : (
        <div className="flex justify-center h-screen  mt-5">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
