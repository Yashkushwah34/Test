import React from "react";

const Application = ({ data }) => {
  return (
    <>
      <p
        className={`${
          data?.length > 0 ? "text-primary" : "text-secondary"
        } mb-0`}
      >
        <span className="px-1">{data?.length || 0}</span>
        Apps
      </p>
    </>
  );
};

export default Application;
