"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import card2 from "#jpg/card2.jpg";
import card3 from "#jpg/card3.jpg";
import ECcarousel from "#images/ECcarousel.png";
import { Button } from "../ui/button";
import MainField from "../mainField";
import Title from "../title";

const ComercialCards = [
  {
    id: 0,
    img: ECcarousel,
    url: "",
    style: "col-span-2 row-span-2 ",
    title: "Calçados Masculinos",
  },
  {
    id: 1,
    img: card2,
    url: "",
    style: "col-span-2 ",
    title: "Todos os Produtos",
  },
  {
    id: 2,
    img: card3,
    url: "",
    style: "",
    title: "Sandália Feminina",
  },
  {
    id: 3,
    img: ECcarousel,
    url: "",
    style: "",
    title: "Acessórios",
  },
];

const ComercialField = () => {
  return (
    <MainField>
      <Title> Nevegue por nossos produtos </Title>
      <div className="grid grid-cols-4 gap-5 w-full h-[550px] grid-rows-2">
        {ComercialCards.map((item) => (
          <div
            className={twMerge("relative", item.style)}
            key={`key - ${item.id}`}
          >
            <Image
              alt="Image"
              className="size-full object-cover"
              src={item.img}
            />
            <Link
              className="absolute size-full inset-0 bg-black opacity-0 hover:opacity-100 bg-opacity-0 hover:bg-opacity-45 transition-all duration-500"
              href={item.url}
            >
              <div className="flex flex-col items-center justify-end pb-8 size-full gap-2">
                <p className="text-xl text-white font-bold">{item.title}</p>
                <Button
                  className="bg-amber-500 hover:bg-white hover:text-amber-500"
                  variant={"default"}
                >
                  Confira
                </Button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </MainField>
  );
};

export default ComercialField;
