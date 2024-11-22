"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import useDataAPI from "@/app/hooks/useDataAPI";
import { imageURL } from "@/app/services/actions/image";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselField() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const { data } = useDataAPI<TPagination<TImage>>(imageURL);
  const dataFiltered = data?.results?.filter(
    (item) => item.type === "carousel"
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, setCount]);

  const handleBulletClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="relative size-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full z-0 duration-150"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {dataFiltered?.map((item, index) => (
            <CarouselItem key={index} className="h-[540px] w-full">
              <div>
                <Image
                  alt={`Slide ${index + 1}`}
                  width={2000}
                  height={2000}
                  className="size-full object-fill"
                  src={String(item.img)}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="py-2 text-center h-0 absolute inset-0 top-[90%]">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`inline-block w-3 h-3 rounded-full mx-1 cursor-pointer transition-all duration-400 ${
                current === index ? "bg-orange-300 w-6" : "bg-slate-50"
              }`}
              onClick={() => handleBulletClick(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
