import Image from "next/image";
import imagecarousel from "#jpg/botaDestaque.jpg";
import React from "react";
import Link from "next/link";

const ProductCard: React.FC<{ currentData: TProducts }> = ({ currentData }) => {
  const valueWithMask = currentData.value / 100;
  const valueDivided = valueWithMask / 3;
  const formattedValueWithMask = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueWithMask);
  const formattedValueDivided = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueDivided);
  return (
    <Link href={`/produtos/${currentData?.id}/`} className="flex flex-col ">
      <div className="size-full flex justify-center bg-white">
        <Image
          width={2000}
          height={2000}
          quality={100}
          alt="Foto de produto"
          src={
            currentData.galery?.img[0]?.img
              ? String(currentData.galery?.img[0]?.img)
              : imagecarousel
          }
          className="size-60"
        />
      </div>
      <div className="bg-white w-full">
        <div className="w-full border h-0"></div>
        <div className="p-5">
          <p className="text-xl">{formattedValueWithMask}</p>
          <p className="text-xs font-light">
            3x {formattedValueDivided} sem juros
          </p>
          <p className="text-xs text-neutral-400">{currentData.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
