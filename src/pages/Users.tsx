import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { AiFillEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserResponse } from "../common/types";
import Loading from "../components/Loading";
import SimpleDialogDemo from "../components/SimpleDailog";
import { deleteData, useFetch } from "../features/user/userAPI";

function createUser(
  id: number,
  name: string,
  email: string,
  password: string,
  created_at: string,
  updated_at: string
): UserResponse {
  const responseUser: UserResponse = {
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
  };

  return responseUser;
}

const Users = () => {
  const [users, setUsers, isLoading, errors] =
    useFetch<UserResponse[]>("customers");

  console.log("users", users);

  if (isLoading) {
    return <Loading />;
  }

  if (users?.length === 0) {
    return <h2>Empty data here</h2>;
  }

  const removeUser = (id: number) => {
    deleteData("customers", id)
      .then((res) => {
        console.log(res);
        let newUsersList: UserResponse[] | null = [];
        newUsersList = users?.filter((item) => item.id !== id) || null;
        setUsers(newUsersList);
        toast("user deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("user deleted successfully");
      });
  };

  return (
    <div>
      <SimpleDialogDemo users={users} setUsers={setUsers} />

      <TableContainer
        component={Paper}
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">created at</TableCell>
              <TableCell align="center">updated at</TableCell>
              <TableCell align="center">details</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  {row.created_at &&
                    new Date(row.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {row.updated_at &&
                    new Date(row.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Link to={`${row.id}`}>
                    <IconButton size="small" style={{ color: "black" }}>
                      <AiFillEye />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    style={{ color: "red" }}
                    onClick={() => removeUser(row.id)}
                  >
                    <FaTrashAlt />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
