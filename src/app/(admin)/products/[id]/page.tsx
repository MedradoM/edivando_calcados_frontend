"use client";

import useDataAPI from "@/app/hooks/useDataAPI";
import galleryServices from "@/app/services/actions/gallery";
import productsServices, { productsURL } from "@/app/services/actions/products";
import AddBrand from "@/components/addBrand";
import AddGallery from "@/components/addGallery";
import MainEditorPage from "@/components/mainEditorPage";
import SelectGroup from "@/components/selectGroup";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProductEditor({ params }: { params: { id: string } }) {
  const { data } = useDataAPI<TPagination<TProducts>>(productsURL);
  const currentData = data?.results?.find(
    (item) => item.id === Number(params.id)
  );
  const route = useRouter();
  const { watch, register, handleSubmit, getValues, setValue } =
    useForm<TProducts>({});
  const [gallery, setGallery] = useState<TImage[]>([]);
  const [price, setPrice] = useState("");
  const status = watch("status");
  const number = watch("value");

  const handleFormatValue = (e: string) => {
    const input = e.replace(/\D/g, "");
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(input) / 100);
    setPrice(formatted);
    setValue("value", Number(input));
  };

  useEffect(() => {
    if (currentData) {
      setValue("title", currentData.title);
      setValue("value", currentData.value);
      setValue("quantity", currentData.quantity);
      setValue("description", currentData.description);
      handleFormatValue(String(currentData.value));
      setValue("group", currentData.group);
      setGallery(currentData.galery.img);
      setValue("brand", currentData.brand);
      setValue("status", currentData.status);
    } else return;
  }, [currentData]);

  const handlePatchProduct = async () => {
    const productData = getValues();
    const currentBrand = getValues("brand");
    const currentGroup = getValues("group");
    const firstImage = currentBrand.img && currentBrand;

    try {
      const galleryIds = gallery.map((item) => item.id);
      const postGalleryResponse = await galleryServices.patch(
        Number(currentData?.galery.id),
        {
          img: galleryIds,
        }
      );
      if (postGalleryResponse) {
        const postProductResponse = await productsServices.patch(
          Number(currentData?.id),
          {
            title: productData.title,
            description: productData.description,
            quantity: productData.quantity,
            value: productData.value,
            status: productData.status,
            galery_id: postGalleryResponse.id,
            group_id: Number(productData.group.id),
            brand_id: Number(productData.brand.id),
          }
        );

        if (postProductResponse) {
          toast.success("Produto enviado com sucesso!");
          route.push("/products");
        } else {
          throw new Error("Post product failed");
        }
      } else {
        throw new Error("Post gallery failed");
      }
    } catch (error) {
      toast.error("Erro ao enviar o produto!", {
        description: "Por favor, revise todos os campos e tente novamente!",
      });
    }
  };
  return (
    <MainEditorPage>
      <form>
        <input
          {...register("title")}
          type="text"
          className="size-full p-3 border rounded-lg"
          placeholder="Nome do Produto"
          required
        />
        <div className="flex py-4 gap-4">
          <div>
            <AddGallery
              currentGallery={currentData?.galery}
              selectedImages={(images) => setGallery(images)}
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <div className="w-full flex gap-3">
              <div className="flex flex-col gap-3 w-full">
                <input
                  placeholder="Valor do Produto"
                  type="text"
                  value={price}
                  onChange={(e) => handleFormatValue(e.currentTarget.value)}
                  className="w-full h-fit p-3 border rounded-lg"
                  required
                />
                <input
                  {...register("quantity")}
                  type="number"
                  placeholder="Quantidade em estoque"
                  className="w-full h-fit p-3 border rounded-lg"
                  required
                />
                <div className="flex w-full gap-3">
                  <SelectGroup
                    selectedGroup={(group) => setValue("group", group)}
                  />
                  <div className="flex flex-col items-center">
                    <p className="text-xs">Deixar como destaque?</p>
                    <div className="flex items-center gap-2">
                      <label htmlFor="switchStatus">Não</label>
                      <Switch
                        id="switchStatus"
                        checked={status === "SH"}
                        onCheckedChange={() =>
                          setValue("status", status === "SD" ? "SH" : "SD")
                        }
                      />
                      <label htmlFor="switchStatus">Sim</label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <AddBrand
                  currentBrand={currentData?.brand}
                  selectedBrand={(brand) => setValue("brand", brand)}
                />
              </div>
            </div>
            <textarea
              {...register("description")}
              placeholder="Descrição do produto"
              className="size-full border p-3 rounded-lg resize-none"
              required
            />
          </div>
        </div>
        <div className="flex gap-3 w-full justify-end">
          <Button variant={"destructive"} type="button">
            Cancelar
          </Button>
          <Button
            onClick={handlePatchProduct}
            className="bg-green-600 hover:bg-opacity-90 hover:bg-green-600"
            type="button"
          >
            Enviar!
          </Button>
        </div>
      </form>
    </MainEditorPage>
  );
}
