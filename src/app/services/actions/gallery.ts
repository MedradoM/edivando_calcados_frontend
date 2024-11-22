import { api } from "../api";

export const galleryURL = "api/galery/";

const galleryServices = {
  post: async (images: TGalleryPost) => {
    const { data } = await api.post(galleryURL, images);
    return data;
  },
  patch: async (id: number, images: TGalleryPost) => {
    const { data } = await api.patch(`${galleryURL}${id}/`, images);
    return data;
  },
};

export default galleryServices;
