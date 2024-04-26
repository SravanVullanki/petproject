import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/admin.css';
import config from '../config'
export default function MyOrders() {
    const [customerData, setCustomerData] = useState("");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [productMap, setProductMap] = useState({});

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
            setCustomerData(parsedCustomerData);
        }
    }, []); 

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                const response = await axios.get(`${config.url}/myorders/${customerData.email}`);
                setOrders(response.data);
                
                // Extracting unique product IDs
                const productIds = new Set(response.data.map(order => order.productId));
                // Fetching product details for each unique product ID
                const productDetails = await Promise.all(Array.from(productIds).map(async productId => {
                    const productResponse = await axios.get(`${config.url}/productbyid/${productId}`);
                    return { [productId]: productResponse.data.name };
                }));
                // Merging product details into a map
                const productMap = productDetails.reduce((acc, product) => {
                    return { ...acc, ...product };
                }, {});
                setProductMap(productMap);
            } catch (error) {
                setError(error.response.data);
            }
        };

        if (customerData) {
          fetchMyOrders();
        }
    }, [customerData]); 

    return (
        <div className="table-container">
            <h3>My Orders</h3>
            {error && <h4 align="center" style={{ color: "red" }}>{error}</h4>}
            <table className="order-table mx-auto" align='center'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Status</th>
                        <th>Order Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.orderId}</td>
                                <td>{productMap[order.productId]}</td>
                                <td>{order.status}</td>
                                <td>{order.orderTime}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No Orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
