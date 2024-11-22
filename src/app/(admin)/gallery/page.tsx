"use client";

import useDataAPI from "@/app/hooks/useDataAPI";
import { FaPlus } from "react-icons/fa6";
import imagesServices, { imageURL } from "@/app/services/actions/image";
import MainEditorPage from "@/components/mainEditorPage";
import Title from "@/components/title";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { api } from "@/app/services/api";
import { toast } from "sonner";

const Gallery = () => {
  const { data, refreshData } = useDataAPI<TPagination<TImage>>(imageURL);
  const { register, handleSubmit, setValue } = useForm<TImage>();
  const filteredData = data?.results?.filter(
    (item) => item.type === "product_img"
  );

  const handleSubmitImage = async (image: TImage) => {
    if (!image.img) {
      return;
    } else {
      try {
        await imagesServices.post(image.img[0]);
        setValue("img", null);
        toast.success("Imagem enviada com sucesso!");
        refreshData();
      } catch (error) {
        console.error(error);
        toast.error("Erro ao enviar a Imagem, tente novamente.");
      }
    }
  };

  return (
    <MainEditorPage>
      <Title>Galeria</Title>
      <div className="w-full h-0 border border-amber-600"></div>
      <form
        onChange={handleSubmit(handleSubmitImage)}
        className="flex flex-wrap gap-3 pt-3 overflow-y-scroll"
      >
        {filteredData?.map((item) => (
          <div className="size-28 cursor-pointer" key={item.id}>
            <Image
              className="flex size-full rounded-lg"
              src={String(item.img)}
              alt={item?.name || "Foto de um produto"}
              width={2000}
              height={2000}
            />
          </div>
        ))}
        <div className="size-28 relative flex justify-center items-center bg-slate-200 rounded">
          <input
            {...register("img")}
            type="file"
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
          <FaPlus className="size-16 text-gray-50" />
        </div>
      </form>
    </MainEditorPage>
  );
};

export default Gallery;
