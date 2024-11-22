import { api } from "../api";

export const productsURL = "api/products/";

const productsServices = {
  post: async (submitProduct: TProductsPost) => {
    try {
      const { data } = await api.post(productsURL, submitProduct);
      return data;
    } catch (error) {
      console.error("Error on posting data", error);
    }
  },
  patch: async (id: number, submitProduct: TProductsPost) => {
    try {
      const { data } = await api.patch(`${productsURL}${id}/`, submitProduct);
      return data;
    } catch (error) {
      console.error("Error on patching data", error);
    }
  },
  delete: async (id: number) => {
    try {
      const { data } = await api.delete(`${productsURL}${id}`);
      return data;
    } catch (error) {
      console.error("Error on deleting data", error);
    }
  },
};

export default productsServices;
