import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import { brandURL } from "@/app/services/actions/brand";
import Title from "../title";
import { twMerge } from "tailwind-merge";
import useDisplayAllData from "@/app/hooks/useDisplayAllData";
import Link from "next/link";

const BrandsCarousel = () => {
  const { data } = useDisplayAllData<TPagination<TBrands>>(brandURL);

  return (
    <div className="flex flex-col justify-center w-full px-24 gap-8">
      <div className="w-full justify-center flex">
        <Title>Marcas que trabalhamos</Title>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className=" z-0 duration-150"
      >
        <CarouselContent>
          {data?.results?.map((item) => (
            <CarouselItem
              key={`key - ${item.id}`}
              className={twMerge("md:basis-1/3 lg:basis-1/6 w-full")}
            >
              <Link
                href={`/produtos/?brand=${item.name}`}
                className="flex flex-col items-center"
              >
                <Image
                  width={5000}
                  height={5000}
                  alt={`Slide ${item.name}`}
                  className="object-cover w-full h-[120px] rounded-lg"
                  src={String(item.img)}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
    </div>
  );
};

export default BrandsCarousel;
