import React from "react";

type TTitleonFields = React.PropsWithChildren<{}>;

const Title = ({ children }: TTitleonFields) => {
  return <p className=" text-lg font-bold"> {children} </p>;
};

export default Title;
