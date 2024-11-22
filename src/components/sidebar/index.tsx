"use client";

import Link from "next/link";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { GoXCircle } from "react-icons/go";
import { PiImagesSquareLight } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import auth from "@/app/services/actions/Auth";
const sectionsAside = [
  {
    id: 0,
    name: "Seções",
    logo: AiOutlineEdit,
    url: "/editor",
  },
  {
    id: 1,
    name: "Produtos",
    logo: AiOutlineAppstoreAdd,
    url: "/products",
  },
  {
    id: 2,
    name: "Galeria",
    logo: PiImagesSquareLight,
    url: "/gallery",
  },
];

const Sidebar = () => {
  const path = usePathname();
  const Router = useRouter();
  const handleLogOut = async () => {
    await auth.logout();
    Router.push("/login");
  };

  return (
    <aside className="h-screen fixed p-5 justify-between flex z-10 flex-col bg-neutral-600 text-white">
      <div className="flex flex-col w-full gap-5 pt-7">
        <div>Logo edivando calcados</div>
        <div className="flex flex-col w-full">
          {sectionsAside.map((item) => (
            <Link
              href={item.url}
              className={twMerge(
                "flex w-full items-center hover:bg-neutral-400 p-2  gap-1",
                item.url.includes(path) && "bg-neutral-700 "
              )}
              key={`key - ${item.id}`}
            >
              <item.logo className="size-4" />
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div
          onClick={handleLogOut}
          className="flex w-full cursor-pointer hover:text-red-600 hover:bg-neutral-400 items-center p-2 gap-1"
        >
          <GoXCircle className="size-4" />
          <p>Sair do sistema</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
