"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import imagecarousel from "#jpg/botaDestaque.jpg";
import MainField from "../mainField";
import Title from "../title";
import ProductCard from "../productCard";
import { productsURL } from "@/app/services/actions/products";
import useDisplayAllData from "@/app/hooks/useDisplayAllData";

const HighlightsField = () => {
  const { data } = useDisplayAllData<TPagination<TProducts>>(productsURL);

  const filteredData = data?.results?.filter((item) => item.status === "SH");

  return (
    <>
      <MainField>
        <Title> Destaques </Title>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 w-full">
            {filteredData?.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 size-full"
              >
                <ProductCard currentData={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </MainField>
    </>
  );
};

export default HighlightsField;
