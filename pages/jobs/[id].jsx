import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const SingleJob = dynamic(
  () => import("../../components/SingleJob"),
  {ssr: false}
)

const User = ({ job }) => {
  return (
    <SingleJob job={job}/>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res ={};

  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      accessToken =  context.req.cookies.accessToken || Cookies.get("accessToken");
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
    const res11 = await server.get(`api/jobs/${context.params.id}`);
    res=res11
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
        job: res.data,
    },
  } 
};


export default User;
