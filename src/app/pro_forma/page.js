"use client";
import React, { useState } from "react";

const ProFormaInvoice = () => {
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [tax, setTax] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + parseFloat(tax) + parseFloat(shippingFee);
  };

  return (
    <div className="sm:ml-64 p-4 pt-20">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Pro forma Invoice
      </h1>

      {/* Company Information Section */}
      <div className="border border-gray-300 rounded-md p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Enter Your Company Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Customer and Invoice Information Section */}
      <div className="border border-gray-300 rounded-md p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Enter Customer and Invoice Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Customer Address"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="date"
            placeholder="Invoice Date"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="text"
            placeholder="Invoice Number"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      {/* Billing Items Section */}
      <div className="border border-gray-300 rounded-md p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Enter the Items You Wish to Bill
        </h2>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-center"
          >
            <input
              type="text"
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={item.description}
              onChange={(e) => {
                const updatedItems = [...items];
                updatedItems[index].description = e.target.value;
                setItems(updatedItems);
              }}
            />
            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={item.quantity}
              onChange={(e) => {
                const updatedItems = [...items];
                updatedItems[index].quantity = parseInt(e.target.value);
                setItems(updatedItems);
              }}
            />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={item.price}
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].price = parseFloat(e.target.value);
                  setItems(updatedItems);
                }}
              />
             <div className="sm:w-24 text-sm flex items-center justify-center">
      ${(item.quantity * item.price).toFixed(2)}
    </div>
              {items.length > 1 && (
                
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => {
                    const updatedItems = items.filter((_, i) => i !== index);
                    setItems(updatedItems);
                  }}
                >
                  ❌
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mt-2 text-sm"
        >
          + Add item
        </button>
      </div>

      {/* Notes / Memo Section */}
      <div className="border border-gray-300 rounded-md p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Notes / Memo
        </h2>
        <textarea
          placeholder="Additional Notes"
          className="w-full h-24 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        ></textarea>
      </div>

      {/* Shipping and Tax Section */}
      <div className="border border-gray-300 rounded-md p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Shipping and Tax
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Shipping Method"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="number"
            placeholder="Shipping Fee"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={shippingFee}
            onChange={(e) => setShippingFee(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Tax"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={tax}
            onChange={(e) => setTax(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Totals Section */}
      <div className="border border-gray-300 rounded-md p-6 mb-6">
        <div className="flex justify-between text-base">
          <span>Subtotal:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Shipping Fee:</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold mt-2">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProFormaInvoice;
