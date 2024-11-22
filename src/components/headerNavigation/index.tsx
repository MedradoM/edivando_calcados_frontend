"use client";

import useDataAPI from "@/app/hooks/useDataAPI";
import { categoryURL } from "@/app/services/actions/landingPoints";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "../ui/button";

const HeaderNavigation = () => {
  const { data } = useDataAPI<TPagination<TCategory>>(categoryURL);

  return (
    <>
      {data?.results?.map((item) => (
        <div key={`key - ${item.id}`}>
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="ghost">{item.name}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2"></div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </>
  );
};

export default HeaderNavigation;
