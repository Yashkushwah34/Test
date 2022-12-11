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

import { connect } from "react-redux";
import { updateUserApplication } from "../redux/action/userAction";
import { BsFillSaveFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";

const TableApplication = ({ applicationData, updateApplication, vendorId }) => {
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
      await updateApplication({ id: key, userId: vendorId, ...row });
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  useEffect(() => {
    setData(applicationData);
  }, [applicationData]);

  const columns = [
    {
      title: "APPLICATION NAME",
      dataIndex: "name",
      key: "name",
      width: 300,
      align: "center",
      render: (_, record) => (
        <span className="text-primary">{record.name}</span>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      editable: true,
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      width: 400,
      align: "center",
      sorter: (a, b) => a.category.localeCompare(b.category),
      editable: true,
    },
    {
      title: "LICENSES BOUGHT",
      dataIndex: "licenseBought",
      key: "licenseBought",
      width: 250,
      align: "center",
      render: (_, record) => (record.licenseBought ? "YES" : "NO"),
      sorter: (a, b) => b.licenseBought - a.licenseBought,
      editable: true,
    },
    {
      title: "APP COVERED IN CONTRACT",
      dataIndex: "appCovered",
      key: "appCovered",
      width: 250,
      align: "center",
      render: (_, record) => (record.appCovered ? "YES" : "NO"),
      sorter: (a, b) => b.appCovered - a.appCovered,
      editable: true,
    },
    {
      title: "BILLING FREQUENCY",
      dataIndex: "billingFrequency",
      key: "billingFrequency",
      width: 250,
      align: "center",
      sorter: (a, b) => {
        const l1 = a?.billingFrequency || 0;
        const l2 = b?.billingFrequency || 0;
        return l1 - l2;
      },
      editable: true,
    },
    {
      title: "PAYMENT TERMS",
      dataIndex: "paymentTerms",
      key: "paymentTerms",
      width: 250,
      align: "center",
      render: (_, record) => (record.paymentTerms ? "YES" : "NO"),
      sorter: (a, b) => b.paymentTerms - a.paymentTerms,
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
              className="col-2 hoverState"
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
          ) : dataIndex === "billingFrequency" ? (
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
          ) : dataIndex === "licenseBought" ||
            dataIndex === "appCovered" ||
            dataIndex === "paymentTerms" ? (
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
                    label: "YES",
                  },
                  {
                    value: false,
                    label: "NO",
                  },
                ]}
              />
            </Form.Item>
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
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey={"id"}
          dataSource={data}
        />
      </Form>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateApplication: (data) => dispatch(updateUserApplication(data)),
  };
};

export default connect(null, mapDispatchToProps)(TableApplication);
