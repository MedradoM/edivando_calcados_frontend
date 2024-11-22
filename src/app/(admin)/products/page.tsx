"use client";

import MainEditorPage from "@/components/mainEditorPage";
import Title from "@/components/title";
import { IoIosSearch } from "react-icons/io";
import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import useDataAPI from "@/app/hooks/useDataAPI";
import { productsURL } from "@/app/services/actions/products";
import { api } from "@/app/services/api";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DataPagination from "@/components/sistema/pagination";

export default function Products() {
  const [dataPageUrl, setDataPageUrl] = useState("api/products/");
  const { data, refreshData, setParams } = useDataAPI<TPagination<TProducts>>(
    `${dataPageUrl}`
  );
  const [loading, setLoading] = useState(false);

  const addQuantity = async (item: TProducts) => {
    const newQuantity = item.quantity + 1;
    try {
      await api.patch(`api/products/${item.id}/`, { quantity: newQuantity });
      refreshData();
    } catch (error) {
      console.error(error);
    }
  };

  const minusQuantity = async (item: TProducts) => {
    if (item.quantity === 0) {
      toast.warning("Produto sem estoque!", {
        description: "Impossível reduzir mais do estoque.",
      });
    } else {
      let newQuantity = item.quantity - 1;
      try {
        await api.patch(`api/products/${item.id}/`, { quantity: newQuantity });
        refreshData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <MainEditorPage>
      <div className="flex justify-between">
        <Title>Produtos</Title>
        <Link
          href={"/products/create/"}
          className="bg-amber-600 hover:bg-amber-500 transition-all duration-300 text-white p-2 rounded-lg"
        >
          Criar Produto
        </Link>
      </div>
      <div className="size-full flex flex-col">
        <div className="pt-6 flex flex-col gap-2">
          <div className="w-full relative flex flex-col justify-center items-center">
            <input
              type="text"
              className="w-full border pl-10 py-1 rounded-lg outline-none"
              onChange={(e) => {
                setParams({ title__icontains: e.currentTarget.value || "" });
                refreshData();
              }}
              placeholder="Pesquise pelo nome dos produtos"
            />
            <IoIosSearch className="absolute inset-0 top-[6px] left-[6px] size-6 text-neutral-400" />
          </div>
          <div className="w-full flex gap-2 items-center">
            <p className="w-1/5 text-amber-600">Todos os produtos</p>
            <div className="min-w-fit w-full border h-0 border-amber-600" />
          </div>
        </div>
        <div className="flex flex-wrap size-full gap-x-4 py-3 gap-y-5 items-center ">
          {data?.results?.map((item) => (
            <>
              <div className="flex flex-col items-center">
                <Link
                  href={`/products/${item.id}`}
                  key={`key - ${item.id}`}
                  className="w-full"
                >
                  <ProductCard currentData={item} />
                </Link>
                <div className="w-full justify-center bg-white flex gap-3 px-2 ">
                  <button onClick={() => minusQuantity(item)}>
                    <FaMinus className="size-7" />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addQuantity(item)}>
                    <FaPlus className="size-7" />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
        <DataPagination
          data={data}
          url="api/products/"
          pageData={(page: string) => setDataPageUrl(page)}
        />
      </div>
      {loading && (
        <div className="absolute top-0 right-0 bg-black size-full z-50"></div>
      )}
    </MainEditorPage>
  );
}
