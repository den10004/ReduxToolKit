import React from "react";
import { useSelector } from "react-redux";

const LastName = () => {
  const secondName = useSelector((state) => state.user.lastName);

  return <div className="font-bold">{secondName}</div>;
};

export default LastName;
