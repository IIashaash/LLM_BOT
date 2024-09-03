import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000";  // Correct URL for your FastAPI server

export const generateText = async (text) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/generate`, {
            params: { text }
        });
        console.log(response.data, "response data in api file");
        return response.data;
    } catch (error) {
        console.error('Error generating text:', error);
        throw error;
    }
};
