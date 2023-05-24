import React, { useEffect, useState } from "react";
import { useApp, Product } from "../hooks/useApp";
import { Table, Input, Button, Modal } from "antd";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import FormModal from "./FormModal";
import { BASE_ROUTE } from "../constants";

const ProductList: React.FC = () => {
  const {
    product,
    productList,
    updateProduct,
    fetchProductList,
    fetchProduct,
    addProduct,
    deleteProduct,
  } = useApp();
  const [params, setParams] = useState<any>({ name: "" });
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | number>("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const debounced = useDebouncedCallback((value) => {
    setParams({
      ...params,
      name: value,
    });
  }, 700);

  const handleRefetchList = () => {
    fetchProductList(params);
  };

  useEffect(() => {
    handleRefetchList();
  }, [params]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  const handleShowAdd = () => {
    setShowAddModal(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {record.image ? (
              <img
                alt={record.name}
                style={{ height: "50px", width: "50px", objectFit: "cover" }}
                src={`${BASE_ROUTE}/images/product/${record.image}`}
              />
            ) : (
              <div
                style={{ height: "50px", width: "50px", background: "#eee" }}
              ></div>
            )}
            <span style={{ marginLeft: "8px" }}>{record.name}</span>
          </div>
        );
      },
    },
    { title: "Buy Price", dataIndex: "buyPrice", key: "buyPrice" },
    { title: "Sell Price", dataIndex: "sellPrice", key: "sellPrice" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: Product) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            size="small"
            type="primary"
            title="Edit"
            children="Edit"
            onClick={() => handleConfirmEdit(record.id)}
          />
          <Button
            size="small"
            danger
            title="Delete"
            children="Delete"
            onClick={() => handleConfirmDelete(record)}
          />
        </div>
      ),
    },
  ];

  const handleSave = (value: any) => {
    setIsLoadingSubmit(true);
    addProduct(
      value,
      () => {
        setIsLoadingSubmit(false);
        setShowAddModal(false);
        handleRefetchList();
      },
      () => setIsLoadingSubmit(false)
    );
  };

  const handleConfirmEdit = (id: string) => {
    fetchProduct(id);
    setShowEditModal(true);
    setSelectedId(id);
  };

  const handleConfirmDelete = (product: Product) => {
    setShowConfirmDeleteModal(true);
    setSelectedId(product.id);
    setSelectedProduct(product);
  };

  const handleDelete = () => {
    deleteProduct(
      selectedId,
      () => {
        setShowConfirmDeleteModal(false);
        handleRefetchList();
      },
      () => {}
    );
  };

  const handleEdit = (value: any) => {
    setIsLoadingSubmit(true);

    updateProduct(
      selectedId,
      value,
      () => {
        setIsLoadingSubmit(false);
        setShowEditModal(false);
        handleRefetchList();
      },
      () => setIsLoadingSubmit(false)
    );
  };

  const onClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowConfirmDeleteModal(false);
  };

  return (
    <Container>
      <Header>
        <Input
          type="search"
          style={{ maxWidth: 300 }}
          placeholder="Search something..."
          onChange={handleSearch}
        />
        <Button
          type="primary"
          title={"Create"}
          children={"Create"}
          onClick={handleShowAdd}
        />
      </Header>
      <Table
        dataSource={productList}
        rowKey={"id"}
        pagination={{ defaultPageSize: 5 }}
        columns={columns}
      />
      {showAddModal && (
        <FormModal
          title={"Add Product"}
          visible={showAddModal}
          onCancel={onClose}
          onSave={handleSave}
          isLoading={isLoadingSubmit}
        />
      )}

      {showEditModal && (
        <FormModal
          title={"Edit Product"}
          visible={showEditModal}
          onCancel={onClose}
          onSave={handleEdit}
          isLoading={isLoadingSubmit}
          initialProduct={product}
        />
      )}

      {showConfirmDeleteModal && (
        <Modal
          open={showConfirmDeleteModal}
          title={"Confirm Delete"}
          onCancel={onClose}
          onOk={handleDelete}
          okButtonProps={{ danger: true }}
          okText={"Delete"}
          children={`Are you sure want to delete "${selectedProduct?.name}"?`}
        />
      )}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
