import axios from "axios";

const API_URL = "https://haikyu-be.vercel.app/customers";

export const getCustomerByTwitter = async (twitter) => {
  try {
    const response = await axios.get(
      `${API_URL}/${encodeURIComponent(twitter)}`
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching customer data:", error);
    throw error;
  }
};
