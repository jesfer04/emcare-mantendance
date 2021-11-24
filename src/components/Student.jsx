import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tittle from "./Tittle";

export default function Student() {
  let paramsStudent = useParams();
  const [data, setData] = useState();

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    },
  };
  const url = "https://emcare-expressjs-api.herokuapp.com/get-sentiment";
  const params = new URLSearchParams();
  params.append("userid", paramsStudent.estudianteId);

  const getSentiments = () => {
    axios
      .post(url, params, config)
      .then(function (response) {
        setData(response.data[1]);
        console.log(
          //response.data[1][0].sentiment.document_tone.tones[0].tone_name
          response.data[1]
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSentiments();
  }, []);

  return (
    <>
      <Tittle>Sentimientos</Tittle>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Sentimientos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((sentiments) => (
              <TableRow>
                <TableCell>{ new Date(sentiments.date._seconds * 1000).toLocaleDateString()}</TableCell>
                <TableCell>
                  {sentiments.sentiment.document_tone.tones.map((tone) => {
                    return `${tone.tone_name}, `;
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody> 
      </Table>
    </>
  );
}
