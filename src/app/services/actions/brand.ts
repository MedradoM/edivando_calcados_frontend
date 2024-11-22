import { api } from "../api";

export const brandURL = "api/brand/";

const brandServices = {
  post: async (img: File, name: string) => {
    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("name", name);
      const { data } = await api.post(brandURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      console.error("Error posting:", error);
      throw error;
    }
  },
  patch: async (id: number, img: File, name: string) => {
    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("type", name);
      const { data } = await api.patch(`${brandURL}${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      console.error("Error patching", error);
      throw error;
    }
  },
};

export default brandServices;
