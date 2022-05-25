import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container, flexbox } from "@mui/system";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { User, UserResponse } from "../common/types";
import { useFormik } from "formik";
import { postData, useFetch } from "../features/user/userAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  header {
    display: flex;
    gap: 1rem;
    border-bottom: 2px solid black;
    margin-bottom: 4rem;
  }

  .user-input {
    .MuiFormControl-root {
      border-radius: 4px;
      width: 100%;
      /* background-color: green;
    color: blue;
    label {
      color: blue;
    } */

      .MuiOutlinedInput-input {
        /* color: yellow; */
      }
    }

    &__error {
      margin: 0.5rem 0;
      color: red;
    }
  }

  footer {
    .footer-actions {
      margin-top: 4rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;

      @media only screen and (min-width: 660px) {
        flex-direction: row;
      }

      button {
        padding: 0.5rem 4rem;
      }
    }

    border-top: 1px solid black;
  }
`;

const initaleUserState: User = {
  name: "",
  email: "",
  password: "",
  phonenumber: "",
  street: "",
  address: "",
};

const validate = (values: User): {} => {
  const errors: User = {} as User;

  if (!values.name) {
    errors.name = "Name Is Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "password is Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  return errors;
};

interface UserFormProps {
  handleSubmit: (user: User | UserResponse) => void;
  onClose: (value: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ handleSubmit, onClose }) => {
  const [user, setUser] = useState<User | UserResponse>(initaleUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const isInputError = (name: string): boolean => {
  //   return formik.touched[name] && formik.errors[name]
  // }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name: string = e.target.name;
    let value: string = e.target.value;

    let newUser: User = { ...user, [name]: value };

    setUser(newUser);
  };

  // const [users, isLoading, error] = usePost < User, UserResponse >('customers', newuser);

  const formik = useFormik({
    initialValues: { ...initaleUserState },
    validate,
    onSubmit: (values: User, { resetForm }): void => {
      const newuser: User = { ...values };
      handleSubmit(values);
    },
  });

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <StyledContainer>
      <Paper style={{ padding: "1.5rem" }}>
        <header>
          <AiOutlineUser style={{ fontSize: "3.5rem" }} />
          <Typography variant="h2" component="h2">
            New User
          </Typography>
        </header>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            rowGap={"4rem"}
            spacing={2}
            style={{ marginBottom: "4rem" }}
          >
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="name"
                  label="user name"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="name"
                  error={
                    formik.errors.name && formik.touched.name ? true : false
                  }
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <h5 className="user-input__error">
                  {formik.touched.name && formik.errors.name}
                </h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="email"
                  label="email"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="email"
                  error={
                    formik.errors.email && formik.touched.email ? true : false
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <h5 className="user-input__error">
                  {formik.touched.email && formik.errors.email}
                </h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="password"
                  label="password"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="password"
                  value={formik.values.password}
                  error={
                    formik.errors.password && formik.touched.password
                      ? true
                      : false
                  }
                  onChange={formik.handleChange}
                />
                <h5 className="user-input__error">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null}
                </h5>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="address"
                  label="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="phonenumber"
                  label="phone number"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="phonenumber"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <div className="user-input">
                <TextField
                  id="street"
                  label="street"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                />
              </div>
            </Grid>
          </Grid>

          <footer>
            <div className="footer-actions">
              <Button variant="contained" color="primary" type="submit">
                submit
              </Button>
              <Link to="/users">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onClose("value")}
                >
                  close
                </Button>
              </Link>
            </div>
          </footer>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default UserForm;
