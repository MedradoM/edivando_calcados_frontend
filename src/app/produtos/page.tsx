"use client";

import FooterField from "@/components/footer";
import Header from "@/components/header";
import useDataAPI from "../hooks/useDataAPI";
import { TbZoomQuestion } from "react-icons/tb";

import ProductCard from "@/components/productCard";
import { productsURL } from "../services/actions/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoFilter } from "react-icons/io5";
import { categoryURL } from "../services/actions/landingPoints";
import { brandURL } from "../services/actions/brand";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Produtos() {
  const getData = useSearchParams();
  const brandFilter = getData.get("brand");
  const groupFilter = getData.get("group");
  const { data, setParams, refreshData } =
    useDataAPI<TPagination<TProducts>>(productsURL);
  const { data: category } = useDataAPI<TPagination<TCategory>>(categoryURL);
  const { data: brands } = useDataAPI<TPagination<TBrands>>(brandURL);

  useEffect(() => {
    if (brandFilter || groupFilter) {
      const newParams: { [key: string]: string } = {};
      if (brandFilter) {
        newParams.brand__name__icontains = brandFilter || "";
      }
      if (groupFilter) {
        newParams.group__category__name__icontains = groupFilter || "";
      }
      setParams((prevParams) => ({
        ...prevParams,
        ...newParams,
      }));
      refreshData();
    }
  }, [brandFilter, groupFilter, setParams, refreshData]);

  return (
    <>
      <Header />
      <main className="pt-28 relative flex flex-col w-full justify-center items-center gap-8 pb-16 bg-neutral-100">
        <div className="flex w-4/5 justify-center">
          <div className="grid grid-cols-4 justify-center">
            {data?.results && data?.results?.length > 1 ? (
              data?.results?.map((item) => (
                <div
                  key={`key - ${item.id}`}
                  className="flex p-1 justify-center"
                >
                  <ProductCard currentData={item} />
                </div>
              ))
            ) : (
              <div className="my-36 col-span-2 col-start-2 flex flex-col items-center  w-full">
                <TbZoomQuestion className="size-32 text-slate-300" />
                <div className="flex flex-col items-center text-slate-300">
                  <p className="text-slate-400">
                    Nenhum produto foi encontrado :(
                  </p>
                  <p>Tente digitando na barra pesquisa!</p>
                </div>
              </div>
            )}
          </div>
          <div className="fixed right-3 top-32">
            <Sheet>
              <SheetTrigger className="p-2 rounded-lg bg-neutral-300 hover:bg-opacity-85">
                <IoFilter className="size-5" />
              </SheetTrigger>
              <SheetContent side={"right"}>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="w-full h-0 border border-slate-300 my-3"></div>
                <div className="flex flex-col">
                  <div>
                    <p className="text-sm">Gênero</p>
                    <div className="bg-slate-100 p-1 flex flex-col rounded-lg gap-1">
                      {category?.results?.map((item) => (
                        <div key={`key - ${item.id}`} className="flex gap-3">
                          <input
                            onChange={() => {
                              setParams((prevParams) => ({
                                ...prevParams,
                                group__category__name__icontains:
                                  item.name || "",
                              }));
                              refreshData();
                            }}
                            id={`id - ${item.id}`}
                            type="checkbox"
                          />
                          <label htmlFor={`id - ${item.id}`}>{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm">Marca</p>
                    <div className="flex flex-col bg-slate-100 p-1 rounded-lg gap-1">
                      {brands?.results?.map((item) => (
                        <div key={`key - ${item.id}`} className="flex gap-3">
                          <input
                            className="decorationnone"
                            onChange={() => {
                              setParams((prevParams) => ({
                                ...prevParams,
                                brand__name__icontains: item.name || "",
                              }));
                              refreshData();
                            }}
                            id={`brand - ${item.id}`}
                            type="checkbox"
                          />
                          <label htmlFor={`brand - ${item.id}`}>
                            {item.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </main>
      <FooterField map={false} />
    </>
  );
}
