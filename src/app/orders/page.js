"use client";
import { useEffect, useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
// import nodemailer from "nodemailer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [previewUrl, setPreviewUrl] = useState(null); // State to store the preview URL

  const fetchUnfulfilledOrders = async () => {
    const url = "http://localhost:3000/api/fetch";
    const response = await fetch(url, {});

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const data = await response.json();
    return data.orders;
  };

  const getOrders = async () => {
    try {
      const fetchedOrders = await fetchUnfulfilledOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  const printinvoice = async (order) => {
    console.log(order);
  };

  const sendemail = async (orderdata) => {
    const url = "http://localhost:3000/api/mail";
    const response = await fetch(url, {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify({ orderdata }), // Convert the data to JSON format
    });

    if (!response.ok) {
      throw new Error(`Error fetching response email: ${response.statusText}`);
    }

    const datas = await response.json();

    console.log("RESPONSE EMAIL", datas);
  };

  return (
    <>
      <div class="sm:ml-64 p-4 pt-20">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Unfulfilled Orders
        </h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Order
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                  Financial Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Fulfillment Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Items
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" class="text-center py-6">
                    <div role="status">
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
                      <span class="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  let originalDate = new Date(order.created_at);
                  const formattedDate = originalDate.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  });
                  return (
                    <tr class="bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-table-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <a href={`/orders/${order.id}`} className="customlink">
                          {order.name}
                        </a>
                      </th>
                      <td class="px-6 py-4">{formattedDate}</td>
                      <td class="px-6 py-4">
                        {order?.customer?.first_name}{" "}
                        {order?.customer?.last_name}
                      </td>
                      <td class="px-6 py-4">£{order.total_price} </td>
                      <td class="px-6 py-4">{order.financial_status}</td>
                      <td class="px-6 py-4">
                        {order.fulfillment_status == null && "unfulfilled"}
                      </td>
                      <td class="px-6 py-4">
                        {order.line_items ? order.line_items.length : 0} items
                      </td>
                      <td class="px-6 py-4">
                        <div class="inline-flex space-x-2">
                          <button
                            type="button"
                            class="px-2 py-2 text-xs font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.6em"
                              height="1.6em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M2 21l21-9L2 3v7l15 2l-15 2v7Zm3-8.75v-4.5L13.86 12L5 12.25Z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            class="px-2 py-2 text-xs font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.6em"
                              height="1.6em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 8H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1v3h12v-3h1a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3zm-4 13H9v-4h6zm4-7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-2-9V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1h2V4h10v1z"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orders;
