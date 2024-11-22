import React from "react";

type TMainField = React.PropsWithChildren<{}>;

const MainField = ({ children }: TMainField) => {
  return (
    <div className="flex w-full justify-center flex-col items-center gap-8 px-24">
      {children}
    </div>
  );
};

export default MainField;
