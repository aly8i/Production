import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import styles from "../../../../styles/User.module.css";
import dynamic from 'next/dynamic';
import { createTheme,ThemeProvider } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const EditUser = dynamic(
  () => import("../../../../components/EditUser"),
  {ssr: false}
)

const User = ({ user,token }) => {
  return (
  <div className={styles.container}>
    <ThemeProvider theme={darkTheme}>
      <EditUser user={user} token={token} type="admin"/>
    </ThemeProvider>
  </div>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken || "";
  var res1={};
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    },
  );
  try{
    const res11 = await server.get(`api/users/${context.params.id}`);
    res1=res11;
}catch(err){
  if(err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}
  return {
    props: {
      user: res1.data,
      token: accessToken
    },
  };
};


export default User;
