"use client";

import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import Link from "next/link";

const RedesButton = [
  {
    id: 0,
    icon: FaWhatsapp,
    href: "https://wa.me/17988029188",
    style: "hover:bg-whatsapp",
  },
  {
    id: 1,
    icon: FaInstagram,
    href: "https://www.instagram.com/edivando_calcados?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    style: "hover:bg-instagram",
  },
  {
    id: 2,
    icon: MdOutlineLocalPhone,
    href: "",
    style: "hover:bg-slate-900",
  },
];

const RedesButtons: React.FC<{
  custom?: "border-white" | "border-black";
}> = ({ custom }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText("017988101482");
    return toast("Sucesso!", {
      description: "Telefone copiado para a área de transferência",
      action: {
        label: "fechar",
        onClick: () => console.log("fechar"),
      },
    });
  };

  return (
    <div className="w-fit flex gap-1">
      {RedesButton.map((item) =>
        item.id === 2 ? (
          <div
            key={`${item.id}`}
            onClick={handleCopyLink}
            className={twMerge(
              "cursor-pointer p-1 border transition-colors duration-300 hover:border-white rounded-full border-black group",
              item.style,
              custom
            )}
          >
            <item.icon className="size-4 transition-colors duration-300 group-hover:text-white " />
          </div>
        ) : (
          <Link
            className={twMerge(
              "p-1 border rounded-full transition-colors duration-300 hover:border-white border-black group",
              item.style,
              custom
            )}
            target="_blank"
            href={item.href}
            key={`${item.id}`}
          >
            <item.icon className="size-4 transition-colors duration-300 group-hover:text-white" />
          </Link>
        )
      )}
    </div>
  );
};

export default RedesButtons;
