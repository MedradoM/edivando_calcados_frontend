"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PiHighHeelBold } from "react-icons/pi";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { FaPlus } from "react-icons/fa6";
import brandServices, { brandURL } from "@/app/services/actions/brand";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import useDisplayAllData from "@/app/hooks/useDisplayAllData";

const AddBrand: React.FC<{
  selectedBrand?: (brand: TBrands) => void;
  currentBrand?: TBrands;
}> = ({ selectedBrand, currentBrand }) => {
  const { register, handleSubmit, watch } = useForm<TBrands>();
  const { data, refreshData } =
    useDisplayAllData<TPagination<TBrands>>(brandURL);
  const [image, setImage] = useState<File | null>(null);
  const [brand, setBrand] = useState<TBrands>();
  const file = watch("img");

  const handleCaptureImage = useCallback(async () => {
    if (!file) return;
    const selectedFile = file[0];
    setImage(selectedFile);
  }, [file]);

  const createNewBrand = async (add: TBrands) => {
    try {
      if (image) {
        await brandServices.post(image, add.name);
        toast.success("Imagem enviada com sucesso!");
        refreshData();
      }
    } catch (error) {
      toast.error("Falha ao enviar a imagem!");
    }
  };

  useEffect(() => {
    handleCaptureImage();
  }, [handleCaptureImage]);

  useEffect(() => {
    if (currentBrand) {
      setBrand(currentBrand);
    }
  }, [currentBrand]);

  useEffect(() => {
    if (brand && selectedBrand) {
      selectedBrand(brand);
    }
  }, [brand]);

  return (
    <main>
      <Dialog>
        <DialogTrigger>
          {brand ? (
            <div className="size-40 drop-shadow">
              <Image
                width={2000}
                height={2000}
                className="size-full rounded-lg"
                src={String(brand.img)}
                alt={brand.name}
              />
            </div>
          ) : (
            <div className="size-40 bg-slate-200 relative rounded-lg flex flex-col justify-center items-center">
              <PiHighHeelBold className="text-white size-16" />
              <p className="text-slate-600 text-sm p-1 bg-white w-fit">
                Adicionar uma Marca
              </p>
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="h-10/12 max-w-screen-md">
          <DialogHeader>
            <DialogTitle>Insira uma marca</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-scroll flex gap-2 flex-wrap">
            {data?.results?.map((item) => (
              <div
                key={`key - ${item.id}`}
                className={twMerge(
                  "border-2 border-transparent rounded-lg",
                  brand?.id === item.id && "border-amber-600"
                )}
                onClick={() => setBrand(item)}
              >
                <Image
                  className="size-20 rounded-md hover:opacity-75 cursor-pointer"
                  width={2000}
                  height={2000}
                  alt={item.name}
                  src={String(item.img)}
                />
              </div>
            ))}
            <Dialog>
              <DialogTrigger>
                <div className="size-20 flex rounded-lg justify-center relative items-center bg-slate-300 cursor-pointer">
                  <FaPlus className="size-10 text-white absolute z-0" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar mais uma marca</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(createNewBrand)}
                  className="flex flex-col items-center w-full justify-between"
                >
                  <div className="flex flex-col justify-start w-full gap-2">
                    <input
                      {...register("name")}
                      type="text"
                      className="rounded-lg border p-2 "
                      placeholder="Digite o nome da marca!"
                    />
                    {image ? (
                      <div className="size-32">
                        <Image
                          src={URL.createObjectURL(image)}
                          width={2000}
                          height={2000}
                          quality={100}
                          alt="imagem da marca"
                          className="size-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="size-32 flex rounded-lg justify-center relative items-center bg-slate-300">
                        <input
                          {...register("img")}
                          type="file"
                          className="size-full file:opacity-0 text-transparent z-10 cursor-pointer"
                        />
                        <FaPlus className="size-16 text-white absolute z-0" />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button>Enviar!</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AddBrand;
