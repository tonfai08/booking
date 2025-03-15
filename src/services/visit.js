import axios from "axios";

const API_URL = "https://haikyu-be.vercel.app/visit";

export const checkVisit = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
