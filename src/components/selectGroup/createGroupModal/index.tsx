"use client";

import useDataAPI from "@/app/hooks/useDataAPI";
import { groupService } from "@/app/services/actions/group";
import { categoryURL } from "@/app/services/actions/landingPoints";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateGroupModal: React.FC<{
  search: string;
  getGroup?: (group: TGroup) => void;
}> = ({ search, getGroup }) => {
  const { data, refreshData } = useDataAPI<TPagination<TCategory>>(categoryURL);
  const [category, setCategory] = useState<number>();
  const { register, setValue, getValues, handleSubmit } = useForm<TGroup>({});

  const handleConsole = (e: string) => {
    setCategory(Number(e));
  };

  useEffect(() => {
    if (search) {
      setValue("name", search);
    }
  }, [search, setValue]);

  const handleCreateGroup = async (add: TGroup) => {
    if (!category) {
      toast.error("Campo Categoria está vazio!");
      return;
    }
    const postGroup = await groupService
      .post({
        category: category,
        name: add.name,
      })
      .finally(refreshData);
    toast.success(`Categoria ${add.name} criada com sucesso!`);
    return getGroup && getGroup(postGroup);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="size-full hover:bg-slate-100">
          Criar novo grupo...
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar novo Grupo</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateGroup)}>
          <div className="flex flex-col gap-2">
            <input
              {...register("name")}
              type="text"
              className="border p-2 rounded-lg"
              placeholder="Digite o nome do grupo"
              required
            />
            <Select onValueChange={handleConsole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar Categoria" />
              </SelectTrigger>
              <SelectContent>
                {data?.results?.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Criar!</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
