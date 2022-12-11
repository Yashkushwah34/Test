import { Divider } from "antd";
import React from "react";
import TableUser from "./TableUser";

const Main = () => {
  return (
    <>
      <div className="px-4">
        <div className="pt-3">
          <h1>Test Using AntD Table</h1>
        </div>
        <Divider />
        <div>
          <TableUser />
        </div>
      </div>
    </>
  );
};

export default Main;
