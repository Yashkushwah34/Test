import React from "react";

const RenderAmount = ({ data }) => {
  return <>{data || 0} $</>;
};

export default RenderAmount;
