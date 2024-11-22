import { api } from "../api";

export const groupURL = "api/group/";

export const groupService = {
  post: async (groupData: TGroup) => {
    const { data } = await api.post(groupURL, groupData);
    return data;
  },
};
