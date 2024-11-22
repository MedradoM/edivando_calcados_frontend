"use client";

import { api } from "@/app/services/api";
import { useCallback, useEffect, useState } from "react";

export default function useDisplayAllData<T>(
  URL: string,
  options?: { params?: Record<string, string | string[] | number> }
) {
  const [data, setData] = useState<T>();
  const [refresh, setRefresh] = useState(0);
  const [params, setParams] = useState<
    Record<string, string | string[] | number>
  >(options?.params || {});

  const refreshData = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const getDataAPI = async () => {
      try {
        const { data } = await api.get(`${URL}?page_size=1000`, { params });
        setData(data);
      } catch (err) {
        console.error("Error Fetching data!", err);
      }
    };
    if (URL) {
      getDataAPI();
    }
  }, [URL, refresh]);

  return { data, refreshData, params, setParams };
}
