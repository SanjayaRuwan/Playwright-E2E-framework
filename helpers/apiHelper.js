import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL;
const TOKEN = process.env.API_TOKEN;

export async function createProduct(productData) {
  return await axios.post(`${BASE_URL}/products`, productData, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

export async function getProductByName(name) {
  const res = await axios.get(`${BASE_URL}/products?name=${name}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return res.data[0];
}
