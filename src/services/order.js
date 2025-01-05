import axios from "axios";

const API_URL = "https://haikyu-be.vercel.app/order";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
