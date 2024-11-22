"use client";

import { CiLocationOn, CiMail } from "react-icons/ci";
import { toast } from "sonner";

const adressinfo = [
  {
    id: 0,
    text: "Rua Cataguazes, N° 270 - Jardim Imperial",
    icon: CiLocationOn,
  },
  {
    id: 1,
    text: "edivandocalcados@gmail.com",
    icon: CiMail,
  },
];

const AdressInfoButton = () => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return toast("Copiado com sucesso", {
        description: "Texto copiado para área de transfêrencia!",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {adressinfo.map((item) => (
        <div
          onClick={() => copyToClipboard(item.text)}
          key={`key - ${item.id}`}
          className="flex text-xs items-center gap-2 cursor-pointer"
        >
          <div className="p-1 border rounded-full ">
            <item.icon className="size-4" />
          </div>
          <p>{item.text}</p>
        </div>
      ))}
    </>
  );
};

export default AdressInfoButton;
