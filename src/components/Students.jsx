import react, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Tittle from "./Tittle";
import axios from "axios";
import { Link } from "react-router-dom";

function preventDefault(event) {
  event.preventDefault();
}

export default function Students() {
  const [data, setData] = useState();
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    },
  };
  const url = "https://emcare-expressjs-api.herokuapp.com/users";
  //const params = new URLSearchParams();
  //params.append("userid", "VGL5Dx0gufWXtXlPD2tGfnlayxJ3");

  const getUsers = () => {
    axios
      .post(url, config)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  });

  return (
    <>
      <Tittle>Estudiantes</Tittle>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" component={Link} to={`/estudiante/${user.uid}`}>
                    <ManageAccountsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
