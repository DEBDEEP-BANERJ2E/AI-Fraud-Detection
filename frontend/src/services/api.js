import axios from "axios";

const API_URL = "http://localhost:5002/api";

export const getTransactions = async () => {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
};
