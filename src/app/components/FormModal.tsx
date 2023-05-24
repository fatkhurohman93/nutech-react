import React, { useState } from "react";

import { Modal, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikField from "./FormikField";
import styled from "styled-components";

interface Props {
  visible?: boolean;
  isLoading?: boolean;
  title: string;
  initialProduct?: any;

  onCancel: () => void;
  onSave: (value: any) => void;
}

const FormModal: React.FC<Props> = ({
  visible,
  title,
  isLoading,
  initialProduct = {},
  onCancel,
  onSave,
}) => {
  const [urlImage, setUrlImage] = useState<string>();

  const initialValues = {
    name: "",
    quantity: null,
    buyPrice: null,
    sellPrice: null,
  };

  const handleSubmitForm = (value: any) => {
    onSave({ ...value, image: urlImage });
  };

  const handleValidation = () => {
    return Yup.object().shape({
      name: Yup.string().required("required"),
      quantity: Yup.number()
        .typeError("Quantity must be a number")
        .required("required"),
      buyPrice: Yup.number()
        .typeError("Buy price must be a number")
        .required("required"),
      sellPrice: Yup.number()
        .typeError("Sell price must be a number")
        .required("required"),
    });
  };

  const field = [
    {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
    },
    {
      key: "buyPrice",
      label: "Buy Price",
      type: "number",
    },
    {
      key: "sellPrice",
      label: "Sell Price",
      type: "number",
    },
  ];

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={onCancel}
      okText={"Save"}
      footer={[]}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...initialValues,
          ...initialProduct,
        }}
        onSubmit={handleSubmitForm}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={handleValidation}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {field.map((item, index) => (
              <Field key={index}>
                <label>{item.label}</label>
                <FormikField name={item.key} type={item.type} />
              </Field>
            ))}
            <Field>
              <label>Upload Product Image</label>
              <FormikField
                name={"image"}
                type={"image"}
                imgUrl={initialProduct.image}
                handleChange={(value) => setUrlImage(value)}
              />
            </Field>
            <Button
              htmlType="submit"
              type="primary"
              title="Save"
              loading={isLoading}
              children="Save"
              onSubmit={() => {
                onCancel();
                handleSubmit();
              }}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default FormModal;

const Field = styled.div`
  padding-block: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
