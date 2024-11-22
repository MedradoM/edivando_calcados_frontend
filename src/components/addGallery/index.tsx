import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCallback, useEffect, useState } from "react";
import useDataAPI from "@/app/hooks/useDataAPI";
import imagesServices, { imageURL } from "@/app/services/actions/image";
import { FaPlus } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import useDisplayAllData from "@/app/hooks/useDisplayAllData";

const AddGallery: React.FC<{
  selectedImages?: (images: TImage[]) => void;
  currentGallery?: TGallery;
}> = ({ selectedImages, currentGallery }) => {
  const { data: ImageData, refreshData } =
    useDisplayAllData<TPagination<TImage>>(imageURL);
  const { watch, register } = useForm<TImage>({});
  const filteredImage = ImageData?.results?.filter(
    (item) => item.type === "product_img"
  );
  const [image, setImage] = useState<File | null>(null);
  const [render, setRender] = useState<File | null>(null);
  const [imageList, setImageList] = useState<TImage[]>([]);
  const file = watch("img");

  const handleCaptureImage = useCallback(async () => {
    if (!file) return;
    const selectedFile = file[0];
    setImage(selectedFile);

    if (selectedFile) {
      try {
        await imagesServices.post(selectedFile);
        toast.success("Imagem enviada com sucesso!");
        refreshData();
      } catch (error) {
        toast.error("Falha ao enviar a imagem!");
      }
    }
  }, [file, refreshData]);

  useEffect(() => {
    if (currentGallery) {
      setImageList(currentGallery.img);
    }
  }, [currentGallery]);

  useEffect(() => {
    handleCaptureImage();
  }, [render, handleCaptureImage]);

  const handleSelectImage = (item: TImage) => {
    let newImageList;
    if (!imageList.includes(item)) {
      newImageList = [...imageList, item];
    } else {
      newImageList = imageList.filter((data) => data.id !== item.id);
    }
    setImageList(newImageList);
    selectedImages && selectedImages(newImageList);
  };

  return (
    <Dialog>
      <DialogTrigger className="size-full">
        {imageList.length > 0 ? (
          <div className="bg-slate-200 flex size-80 flex-wrap overflow-y-hidden rounded-lg content-start relative drop-shadow">
            {imageList.map((item) => (
              <div key={`key - ${item.id}`} className="p-1 m-0 ">
                <Image
                  width={2000}
                  height={2000}
                  src={String(item.img)}
                  alt={item.type}
                  className="size-[98px] object-cover rounded"
                />
              </div>
            ))}
            <div className="absolute size-full inset-0 bg-black opacity-0 hover:opacity-80  flex flex-col justify-center items-center gap-2">
              <GrGallery className="size-32 text-white" />
              <p className="bg-white p-1 w-fit text-slate-600">
                Adicionar imagens do produto
              </p>
            </div>
          </div>
        ) : (
          <div
            className="size-80
           flex flex-col items-center justify-center bg-slate-200 rounded-lg gap-2"
          >
            <GrGallery className="size-32 text-white" />
            <p className="bg-white p-1 w-fit text-slate-600">
              Adicionar imagens do produto
            </p>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="h-3/4 max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Galeria</DialogTitle>
          <DialogDescription>
            <p>Clique nas imagens que deseja adicionar na galeria</p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 overflow-y-scroll h-full bg-slate-100 p-2 rounded-xl">
          {filteredImage?.map((item) => (
            <div key={`key - ${item.id}`}>
              <button onClick={() => handleSelectImage(item)}>
                <Image
                  alt="carregando..."
                  width={2000}
                  height={2000}
                  className={twMerge(
                    "size-32 rounded-lg border-2 border-transparent",
                    imageList?.find((image) => image.id === item.id) &&
                      "border-amber-600"
                  )}
                  src={String(item.img)}
                />
              </button>
            </div>
          ))}
          <form
            action=""
            className="size-32 flex rounded-lg justify-center relative items-center bg-slate-300"
          >
            <input
              {...register("img")}
              type="file"
              className="size-full file:opacity-0 text-transparent z-10 cursor-pointer"
            />
            <FaPlus className="size-16 text-white absolute z-0" />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGallery;
