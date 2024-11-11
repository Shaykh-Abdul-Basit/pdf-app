import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get 'id' from query parameters

    try {
        let url;
        if (id) {
            // Fetch a specific order by id
            url = `https://the-yorkshire-bedding.myshopify.com/admin/api/2024-07/orders/${id}.json`;
        } else {
            // Fetch all open orders if no id is specified
            url = "https://the-yorkshire-bedding.myshopify.com/admin/api/2024-07/orders.json?status=open&limit=250";
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Shopify-Access-Token": "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",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const data = await response.json();
        // console.log(data);

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "ERROR" }, { status: 500 });
    }
}
