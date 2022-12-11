import React, { useState, useEffect } from "react";

import { Select } from "antd";

const BooleanSelect = ({ data, optionType }) => {
  const [option, setOption] = useState([]);

  useEffect(() => {
    if (optionType === "yesNo") {
      setOption([
        {
          value: true,
          label: "YES",
        },
        {
          value: false,
          label: "NO",
        },
      ]);
    } else {
      setOption([
        {
          value: true,
          label: "ACTIVE",
        },
        {
          value: false,
          label: "INACTIVE",
        },
      ]);
    }
  }, [optionType]);

  return (
    <>
      <Select defaultValue={data} options={option} />
    </>
  );
};

export default BooleanSelect;
