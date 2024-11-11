import React from 'react';

const Invoice = ({ orderDetailsss }) => {
  if (!orderDetailsss) {
    return <p>Loading...</p>;
  }

  // const {
  //   customerName,
  //   invoiceNumber,
  //   issueDate,
  //   items,
  //   shippingMethod,
  //   totals,
  //   contact,
  //   shipTo,
  //   billTo,
  // } = orderDetailsss;

  console.log("ok", orderDetailsss)

  return (
    <div
      className="invoice-container min-h-screen flex items-center justify-center"
      style={{ overflow: 'hidden' }}
    >
      <div
        className="container bg-white p-4 border"
        style={{
          width: '1000px',
          height: 'auto', // A4 size
          overflow: 'hidden',
          margin: '0 auto',
          fontSize: '13px',
          lineHeight: '1.8',
          transform: 'scale(0.8)', // Adjust this if it appears too small or large on mobile
          transformOrigin: 'center top',
        }}
      >
        {/* Content starts here */}
        <div className="header flex justify-between items-center pb-4">
          <div className="invoice-details">
            <h1 className="text-lg font-bold">Invoice for {orderDetailsss.order.shipping_address.first_name}</h1>
            <p>Invoice #: {orderDetailsss.order.name}</p>
            {/* <p>Issue Date: {issueDate}</p> */}
          </div>
          <div className="logo">
            <img
              src="https://yorkshirebedding.co.uk/cdn/shop/t/16/assets/Yorkshire_Logo-01.svg?v=25583401539210938251632559020"
              alt="Company Logo"
              className="w-28"
            />
          </div>
        </div>

        <div className="contact-details my-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-sm">Supplier</h3>
              <p>
                Yorkshire Bedding<br />
                Yorkshire Bedding Ltd<br />
                269 Wellington road, Unit 4<br />
                Birmingham<br />
                B20 2QQ<br />
                GB335044232<br />
                info@yorkshirebedding.co.uk<br />
                +44 20 3355 4724
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Ship To</h3>
              <p>
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}, {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Bill To</h3>
              <p>
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}, {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}<br />
                {orderDetailsss.order.shipping_address.first_name}
              </p>
            </div>
          </div>
        </div>

        <table className="table-auto w-full border-collapse border mt-4">
          <thead>
            <tr>
              <th className="border p-1 text-xs">Item</th>
              <th className="border p-1 text-xs">Unit Price</th>
              <th className="border p-1 text-xs">TAX %</th>
              <th className="border p-1 text-xs">TAX Amount</th>
              <th className="border p-1 text-xs">Qty.</th>
              <th className="border p-1 text-xs">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetailsss.order.line_items.map((item, index) => (
              <tr key={index}>
                <td className="border p-1 text-xs">{item.name}</td>
                <td className="border p-1 text-xs">£{orderDetailsss.order.shipping_address.first_name}</td>
                <td className="border p-1 text-xs">{orderDetailsss.order.shipping_address.first_name}%</td>
                <td className="border p-1 text-xs">£{orderDetailsss.order.shipping_address.first_name}</td>
                <td className="border p-1 text-xs">{orderDetailsss.order.shipping_address.first_name}</td>
                <td className="border p-1 text-xs">£{orderDetailsss.order.shipping_address.first_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="shipping-method my-4 text-xs">
          <p>
            <strong>Shipping Method:</strong> {orderDetailsss.order.shipping_address.first_name}
          </p>
        </div>

        <div className="totals my-4">
          <table className="w-full text-xs">
            <tbody>
              <tr>
                <td className="text-right p-2">SUBTOTAL:</td>
                <td className="text-right p-2">£{orderDetailsss.order.shipping_address.first_name}</td>
              </tr>
              <tr>
                <td className="text-right p-2">SHIPPING:</td>
                <td className="text-right p-2">£{orderDetailsss.order.shipping_address.first_name}</td>
              </tr>
              <tr>
                <td className="text-right p-2">VAT:</td>
                <td className="text-right p-2">£{orderDetailsss.order.shipping_address.first_name}</td>
              </tr>
              <tr>
                <td className="text-right p-2 font-bold">TOTAL:</td>
                <td className="text-right p-2 font-bold">£{orderDetailsss.order.shipping_address.first_name}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="footer text-center text-xs border-t mt-6 pt-4">
          <p>
            Total Paid: £{orderDetailsss.order.shipping_address.first_name} &nbsp;&nbsp;&nbsp;&nbsp; Amount Due: £
            {orderDetailsss.order.shipping_address.first_name}
          </p>
          <p>
            © 2024 Yorkshire Bedding / Registered in England No. 11571226 VAT
            Registered: GB335044232
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
