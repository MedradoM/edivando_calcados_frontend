"use client";

import Title from "@/components/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useCallback, useEffect, useState } from "react";
import useDataAPI from "../../hooks/useDataAPI";
import { useForm } from "react-hook-form";
import imagesServices, { imageURL } from "../../services/actions/image";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CiImageOn } from "react-icons/ci";
import MainEditorPage from "@/components/mainEditorPage";
import useDisplayAllData from "@/app/hooks/useDisplayAllData";

export default function Editor() {
  const { register, watch } = useForm<TImage>({});
  const [image, setImage] = useState<File | null>(null);
  const { data, refreshData } =
    useDisplayAllData<TPagination<TImage>>(imageURL);
  const dataFiltered = data?.results?.filter(
    (item) => item.type === "carousel"
  );
  console.log(dataFiltered);
  const file = watch("img");

  const handleCaptureImage = useCallback(() => {
    if (!file) return;
    setImage(file[0]);
    const fileType = "carousel";
    try {
      if (image) {
        imagesServices.post(image, fileType);
        toast.success("Dados salvos com sucesso!");
        refreshData();
      }
    } catch (error) {
      return toast.error(`Falha au enviar a imagem!`);
    }
    // window.location.reload();
  }, [file, image, refreshData]);

  const handleDeleteImg = async (item: TImage) => {
    try {
      await imagesServices.delete(item.id);
      refreshData();
      toast.success("Imagem deletada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível excluir a imagem!");
    }
  };

  useEffect(() => {
    handleCaptureImage();
  }, [file, handleCaptureImage]);

  return (
    <>
      <MainEditorPage>
        <Title>Editor do Site</Title>
        <div className="pt-3 w-full">
          <div className="w-full flex gap-2 items-center">
            <p className="w-52">Imagens do carrossel</p>
            <div className="min-w-fit w-full border h-0 border-amber-600" />
          </div>
          <form>
            <Carousel className="w-full pt-4">
              <CarouselContent>
                {dataFiltered &&
                  dataFiltered.map((item, index) => (
                    <CarouselItem key={index} className="relative ">
                      <Image
                        alt="Imagem do carrossel"
                        width={2000}
                        height={2000}
                        className="w-full h-[500px] object-cover"
                        src={String(item.img)}
                      />
                      <div className="size-full absolute inset-0 justify-center items-end pb-8 flex group transition-all duration-500">
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              type="button"
                              variant={"destructive"}
                              className="group-hover:opacity-100 opacity-0 transition-all duration-500"
                            >
                              Deletar foto
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Tem certeza disso?</DialogTitle>
                              <DialogDescription>
                                Após confirmada a ação não será possivel
                                desfazer, depois de deletada a imagem será
                                excluída para sempre!
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose>
                                <Button
                                  onClick={() => handleDeleteImg(item)}
                                  variant={"destructive"}
                                >
                                  Deletar
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CarouselItem>
                  ))}
                <CarouselItem>
                  <div className="relative w-full h-[500px]">
                    <input
                      {...register("img")}
                      type="file"
                      className="size-full cursor-pointer z-0 relative file:opacity-0 text-transparent"
                    />
                    <div className="size-full absolute -z-10 flex text-slate-700 flex-col justify-center items-center inset-0 bg-slate-700 bg-opacity-35">
                      <CiImageOn className="size-40 " />
                      <p className="bg-slate-800 bg-opacity-40  p-1 ">
                        Inserir nova imagem
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </form>
        </div>
      </MainEditorPage>
    </>
  );
}
