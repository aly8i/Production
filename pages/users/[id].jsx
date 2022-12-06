import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const SingleUser = dynamic(
  () => import("../../components/SingleUser"),
  {ssr: false}
)

const Page = ({ user }) => {
  return (
      <SingleUser user={user}/>
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
      user: res1.data
    },
  };
};


export default Page;
