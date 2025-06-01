import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5108/api/Product';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductSales = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product sales:', error);
    return [];
  }
};
