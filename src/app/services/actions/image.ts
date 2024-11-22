import { api } from "../api";

export const imageURL = "api/image/";

const imagesServices = {
  post: async (img: File, type?: string): Promise<{}> => {
    try {
      const formData = new FormData();
      formData.append("img", img);
      if (type) {
        formData.append("type", type);
      }

      const { data } = await api.post(imageURL, formData, {
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
  delete: async (id: number) => {
    try {
      const { data } = await api.delete(`${imageURL}${id}`);
      return data;
    } catch (error) {
      console.error("error deleting", error);
    }
  },
  patch: async (id: number, img: File, type?: string) => {
    try {
      const formData = new FormData();
      formData.append("img", img);
      if (type) {
        formData.append("type", type);
      }

      const { data } = await api.patch(`${imageURL}${id}/`, formData, {
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
export default imagesServices;
