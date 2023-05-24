import React from "react";
import styled from "styled-components";
import { Button } from "antd";

import { Formik } from "formik";
import FormikField from "./FormikField";
import * as Yup from "yup";
import { useApp } from "../hooks/useApp";

const Login: React.FC = () => {
  const initialValues = { userName: "", password: "" };

  const { signIn } = useApp();

  const handleSubmitForm = (value: any) => {
    signIn(value);
  };

  const handleValidation = () => {
    return Yup.object().shape({
      userName: Yup.string().required("required"),
      password: Yup.string().required("required"),
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={handleValidation}
    >
      {({ handleSubmit, isSubmitting, isValid }) => (
        <Form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center", fontSize: "20px" }}>
            NUTECH INTEGRASI
          </div>
          <FormikField name="userName" type="text" placeholder="username" />
          <FormikField name="password" type="password" placeholder="password" />
          <Button
            htmlType="submit"
            type="primary"
            title="Login"
            children={"Login"}
            onSubmit={() => handleSubmit()}
          />
          <div style={{ fontSize: "10px", textAlign: "center" }}>
            username: <strong>admin</strong> password: <strong>Password123!</strong>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 100px;
`;

export default Login;
