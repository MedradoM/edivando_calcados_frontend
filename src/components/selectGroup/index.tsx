"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import useDataAPI from "@/app/hooks/useDataAPI";
import { groupURL } from "@/app/services/actions/group";
import { Command } from "cmdk";
import CreateGroupModal from "./createGroupModal";

const SelectGroup: React.FC<{
  selectedGroup?: (group: TGroup) => void;
  currentGroup?: TGroup;
}> = ({ selectedGroup, currentGroup }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState<string>("");
  const [newData, setNewData] = useState<TGroup>();
  const { data, refreshData } = useDataAPI<TPagination<TGroup>>(groupURL);

  useEffect(() => {
    refreshData();
  }, [newData, refreshData]);

  useEffect(() => {
    if (currentGroup) {
      setValue(currentGroup.name);
    }
  }, [currentGroup]);

  const handleSubmitData = (data: TGroup) => {
    selectedGroup && selectedGroup(data);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data?.results?.find((group) => group.name === value)?.name
            : "Selecione um grupo..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command value="">
          <Command.Input
            onInput={(e) => setSearch(e.currentTarget.value)}
            className="size-full p-2"
            placeholder="Buscar grupos..."
          />
          <Command.Empty className="p-2">
            <CreateGroupModal
              search={search}
              getGroup={(group) => setNewData(group)}
            />
          </Command.Empty>
          <Command.List>
            {data?.results?.map((group) => (
              <Command.Item
                className="hover:bg-slate-100 cursor-pointer items-center flex p-2"
                key={group.name}
                value={group.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  handleSubmitData(group);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === group.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {group.name}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectGroup;
