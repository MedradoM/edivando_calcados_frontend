"use client";

import useDataAPI from "@/app/hooks/useDataAPI";
import MainField from "../mainField";
import ProductCard from "../productCard";
import Title from "../title";
import { productsURL } from "@/app/services/actions/products";

const NewsField = () => {
  const { data } = useDataAPI<TPagination<TProducts>>(productsURL);

  return (
    <MainField>
      <Title>Novidades</Title>
      <div className="flex flex-wrap">
        {data?.results
          ?.slice(-8)
          .reverse()
          .map((item) => (
            <div key={`key - ${item.id}`} className="w-1/4 p-2">
              <ProductCard currentData={item} />
            </div>
          ))}
      </div>
    </MainField>
  );
};

export default NewsField;
