import React, { useEffect, useState } from "react";

import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from "antd";
import TableApplication from "./TableApplication";

import { connect } from "react-redux";

import { BsFillSaveFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";

import { gettingUserData, updateUserData } from "../redux/action/userAction";
import UserProfile from "./TableComponents/UserProfile";
import Application from "./TableComponents/Application";
import RenderAmount from "./TableComponents/RenderAmount";

const TableUser = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      await props.updateData({ id: key, ...row });
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await props.getUserData();
    };
    getData();
  }, [props]);

  useEffect(() => {
    setData(props.userData);
  }, [props.userData]);

  const columns = [
    {
      title: "VENDOR NAME",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (_, record) => (
        <UserProfile image={record.profileImage} name={record.name} />
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      editable: true,
    },
    {
      title: "# OF APPLICATIONS",
      dataIndex: "application",
      key: "application",
      width: 250,
      align: "center",
      render: (_, record) => <Application data={record.application} />,
      sorter: (a, b) => {
        const l1 = a?.application?.length || 0;
        const l2 = b?.application?.length || 0;
        return l1 - l2;
      },
      editable: true,
    },
    {
      title: "TOTAL SPEND (YTD)",
      dataIndex: "totalSpend(YTD)",
      key: "totalSpend(YTD)",
      width: 200,
      align: "center",
      render: (_, record) => <RenderAmount data={record["totalSpend(YTD)"]} />,
      sorter: (a, b) => {
        const l1 = a["totalSpend(YTD)"];
        const l2 = b["totalSpend(YTD)"];
        return l1 - l2;
      },
      editable: true,
    },
    {
      title: "ACTIVE CONTRACT",
      dataIndex: "activeContract",
      key: "activeContract",
      width: 200,
      align: "center",
      render: (_, record) => (record.activeContract ? "ACTIVE" : "INACTIVE"),
      sorter: (a, b) => b.activeContract - a.activeContract,
      editable: true,
    },
    {
      title: "SOURCE",
      dataIndex: "source",
      key: "source",
      width: 300,
      align: "center",
      render: (_, record) => record.source,
      sorter: (a, b) => a.source.localeCompare(b.source),
      editable: true,
    },
    {
      title: "TOTAL SPEND (LAST 12 MONTHS)",
      dataIndex: "totalSpend(12Months)",
      key: "totalSpend(12Months)",
      width: 300,
      align: "center",
      render: (_, record) => (
        <RenderAmount data={record["totalSpend(12Months)"]} />
      ),
      sorter: (a, b) => {
        const l1 = a["totalSpend(12Months)"];
        const l2 = b["totalSpend(12Months)"];
        return l1 - l2;
      },
      editable: true,
    },
    {
      title: "CONTRACT VALUE",
      dataIndex: "contractValue",
      key: "contractValue",
      width: 250,
      align: "center",
      render: (_, record) => <RenderAmount data={record["contractValue"]} />,
      sorter: (a, b) => {
        const l1 = a["contractValue"];
        const l2 = b["contractValue"];
        return l1 - l2;
      },
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="col-12">
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
              className="col-3 hoverState"
            >
              <BsFillSaveFill size={20} />
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={cancel}
              className="col-6 hoverState"
            >
              <FcCancel size={20} />
            </Popconfirm>
          </div>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          dataIndex === "application" ? (
            children
          ) : dataIndex === "totalSpend(YTD)" ||
            dataIndex === "totalSpend(12Months)" ||
            dataIndex === "contractValue" ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          ) : dataIndex === "activeContract" ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <Select
                defaultValue={record.activeContract}
                options={[
                  {
                    value: true,
                    label: "ACTIVE",
                  },
                  {
                    value: false,
                    label: "INACTIVE",
                  },
                ]}
              />
            </Form.Item>
          ) : dataIndex === "name" ? (
            children
          ) : (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          )
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          columns={mergedColumns}
          rowKey={"id"}
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          size="middle"
          expandable={{
            expandedRowRender: (record) => (
              <TableApplication
                applicationData={record.application}
                vendorId={record.id}
              />
            ),
          }}
          dataSource={data}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(gettingUserData()),
    updateData: (data) => dispatch(updateUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
