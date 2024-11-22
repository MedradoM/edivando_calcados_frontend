"use client";

import React from "react";
import RedesButtons from "../redesButtons";
import AdressInfoButton from "../adressInfoButton";
import MLogo from "#images/M_.png";
import Image from "next/image";
import Link from "next/link";
import useDataAPI from "@/app/hooks/useDataAPI";
import { categoryURL } from "@/app/services/actions/landingPoints";

const FooterField: React.FC<{ map: boolean }> = ({ map }) => {
  const { data } = useDataAPI<TPagination<TCategory>>(categoryURL);

  return (
    <footer className="size-full flex flex-col items-center bg-neutral-800 text-white gap-10 pb-6">
      {map === true && (
        <div className="size-full flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d391.1842960389481!2d-49.01932525367211!3d-21.128779121902788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bc1f1493bbd903%3A0x20a013ef02289fc8!2sEdivando%20Calcados%20%26%20Acessorios!5e0!3m2!1spt-BR!2sbr!4v1718754235333!5m2!1spt-BR!2sbr"
            width="100%"
            height="350"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex w-3/4 justify-between items-center ">
        <div className="">
          <span>Edivando Calcados</span>
          <p className="text-xs">
            Provendo conforto e elegância para os seus pés, desde 2018
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="">Categorias</p>
          <div className="grid grid-cols-2 text-sm gap-1">
            {data?.results?.map((item) => (
              <Link
                key={item.id}
                href={""}
                className="pr-2 transition-colors hover:text-amber-200 duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              className="pr-2 transition-colors hover:text-amber-200 duration-300"
              href={"#"}
            >
              Home
            </Link>
            <Link
              className="pr-2 transition-colors hover:text-amber-200 duration-300"
              href={"/about/"}
            >
              Sobre nós
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="">Contato</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <AdressInfoButton />
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Fale conosco</p>
              <RedesButtons custom="border-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 border border-white" />
      <div className="w-3/4 flex justify-center items-center gap-3 flex-col">
        <div className="text-xs">
          Edivando Calçados 2024 - ©Todos os direitos reservados
        </div>
        <div className="flex gap-1 items-center text-xs">
          <p>Powered by</p>
          <Link target="_blank" href={"https://matheusmassena.com/"}>
            <Image
              src={MLogo}
              alt="Logo Math developer"
              className="w-10 hover:animate-pulse"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterField;
