import React, { useState } from "react";
import { Input, Upload, message } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import { BASE_ROUTE } from "../constants";
import { Field, FieldProps } from "formik";
import styled from "styled-components";

interface Props {
  name: string;
  type?: string;
  placeholder?: string;
  imgUrl?: string;
  handleChange?: (value: any) => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const FormikField: React.FC<Props> = ({
  name,
  type = "text",
  placeholder = "Enter here",
  imgUrl,
  handleChange,
}) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const onChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // Get this url from response in real world.
    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setImageUrl(url);
        handleChange && handleChange(url);
      });
    }
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1000 < 100;
    if (!isLt2M) {
      message.error("Image must smaller than 100kb!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if (type === "image") {
    return (
      <Field name={name}>
        {({ field, form: { touched, errors }, meta }: FieldProps) => (
          <>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={onChange}
              customRequest={() => {}}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : imgUrl ? (
                <img
                  src={`${BASE_ROUTE}/images/product/${imgUrl}`}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            {meta.touched && meta.error && (
              <ErrorMessage className="error">{meta.error}</ErrorMessage>
            )}
          </>
        )}
      </Field>
    );
  }
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }: FieldProps) => (
        <>
          <Input {...field} type={type} placeholder={placeholder} />
          {meta.touched && meta.error && (
            <ErrorMessage className="error">{meta.error}</ErrorMessage>
          )}
        </>
      )}
    </Field>
  );
};

const ErrorMessage = styled.div`
  color: red;
  font-size: 11px;
`;

export default FormikField;
